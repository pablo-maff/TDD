import { EventsManager } from "./EventsManager.js";
import { EmptyBlock, I_SHAPES, shapeToString } from "./shapes.js";
import { LevelsFixedGoal } from "./LevelsFixedGoal.js";
export class Point {
  row;
  col;
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
}
class MovableShape {
  #shape;
  #row; // * The row of the topmost row of the shape
  #col; // * The column of the leftmost column of the shape
  constructor(shape, row, col) {
    this.#shape = shape;
    // * If col is specified just pass the values of row and col
    if (typeof col === "number") {
      this.#row = row;
      this.#col = col;
      return;
    }
    // * If col is not specified the shape is being dropped into the board so calculating the initial positions is necessary
    this.#row = shape.width() === 1 ? 0 : -1;
    const middleCol = Math.floor((row - shape.width()) / 2);
    this.#col = middleCol;
  }
  floorKick() {
    return new MovableShape(this.#shape, this.#row - 1, this.#col);
  }
  moveDown() {
    return new MovableShape(this.#shape, this.#row + 1, this.#col);
  }
  moveLeft() {
    return new MovableShape(this.#shape, this.#row, this.#col - 1);
  }
  moveRight() {
    return new MovableShape(this.#shape, this.#row, this.#col + 1);
  }
  rotateRight() {
    return new MovableShape(this.#shape.rotateRight(), this.#row < 0 ? 0 : this.#row, this.#col);
  }
  rotateLeft() {
    return new MovableShape(this.#shape.rotateLeft(), this.#row < 0 ? 0 : this.#row, this.#col);
  }
  // * Returns the block starting coordinates of the shape relative to the board
  nonEmptyBlocks() {
    const points = [];
    for (let row = this.#row; row < this.height(); row++) {
      for (let col = this.#col; col < this.width(); col++) {
        const block = this.blockAt(row, col);
        if (block !== EmptyBlock) {
          points.push(new Point(row, col));
        }
      }
    }
    return points;
  }
  // * Maps board collision coordinates to internal shape coordinates
  collisionInternalCoordinates(collision) {
    return new Point(collision.row - this.#row, collision.col - this.#col);
  }
  // * Checks if the block is within boundaries
  blockAt(row, col) {
    const blockInHeightBoundaries = row >= this.#row && row < this.height();
    const blockInWidthBoundaries = col >= this.#col && col < this.width();
    if (!blockInHeightBoundaries || !blockInWidthBoundaries) {
      return EmptyBlock;
    }
    return this.#shape.blockAt(row - this.#row, col - this.#col);
  }
  height() {
    return this.#row + this.#shape.height();
  }
  width() {
    return this.#col + this.#shape.width();
  }
  toString() {
    return this.#shape.toString();
  }
}
export class Board {
  #width;
  #height;
  #falling = null;
  #immobile;
  events;
  #level;
  isPlaying;
  constructor(width, height, immobile, level = 0) {
    this.events = new EventsManager();
    this.isPlaying = true;
    this.#width = width;
    this.#height = height;
    // * For loaded boards
    if (immobile) {
      this.#immobile = immobile;
      this.#level = new LevelsFixedGoal(level);
      this.events.subscribe(this.#level);
      return;
    }
    // * For fresh boards
    this.#immobile = new Array(height);
    for (let row = 0; row < height; row++) {
      this.#immobile[row] = new Array(width).fill(EmptyBlock);
    }
    this.#level = new LevelsFixedGoal(level);
    this.events.subscribe(this.#level);
  }
  static loadBoard(board, level) {
    const immobile = board
      .replaceAll(" ", "")
      .trim()
      .split("\n")
      .map((row) => row.split(""));
    const height = immobile.length;
    const width = immobile[0].length;
    return new Board(width, height, immobile, level);
  }
  get level() {
    return this.#level.value;
  }
  drop(piece) {
    if (this.hasFalling()) {
      throw new Error("another piece is already falling");
    }
    const newShape = new MovableShape(piece, this.#width);
    this.#setFalling(newShape);
    // * GAME OVER
    if (this.#hitsImmobile(newShape)) {
      this.isPlaying = false;
    }
  }
  tick() {
    if (!this.hasFalling()) {
      return;
    }
    const attempt = this.#falling.moveDown();
    const canTick = !this.#hitsFloor(attempt) && !this.#hitsImmobile(attempt);
    if (canTick) {
      this.#setFalling(attempt);
      return;
    }
    this.#stopFalling();
  }
  moveDown() {
    this.tick();
  }
  moveLeft() {
    this.#moveHorizontally(this.#falling.moveLeft());
  }
  moveRight() {
    this.#moveHorizontally(this.#falling.moveRight());
  }
  #moveHorizontally(attempt) {
    if (!this.hasFalling()) {
      return;
    }
    if (!this.#hitsWall(attempt) && !this.#hitsImmobile(attempt)) {
      this.#setFalling(attempt);
      return;
    }
  }
  rotateRight() {
    this.#rotate("right");
    return this;
  }
  rotateLeft() {
    this.#rotate("left");
    return this;
  }
  #rotate(direction) {
    if (!this.hasFalling()) {
      return;
    }
    const attempt = direction === "left" ? this.#falling.rotateLeft() : this.#falling.rotateRight();
    const canRotate = !this.#hitsFloor(attempt) && !this.#hitsWall(attempt) && !this.#hitsImmobile(attempt);
    if (canRotate) {
      this.#setFalling(attempt);
      return;
    }
    if (this.#hitsWall(attempt)) {
      this.#setWallKick(this.#wallKick(attempt)) || this.#setWallKick(this.#doubleWallKick(attempt));
      return;
    }
    if (this.#hitsFloor(attempt)) {
      this.#setDoubleFloorKick(attempt);
      return;
    }
    if (this.#hitsImmobile(attempt)) {
      this.#handleKick(attempt, this.#collisionCoordinates(attempt));
    }
  }
  #handleKick(attempt, collisionCoordinates) {
    // * center column collision rule applies for all tetrominoes except I
    const centerColumnCollision =
      attempt.collisionInternalCoordinates(collisionCoordinates).col === 1 && !attempt.toString().includes("I");
    if (centerColumnCollision) {
      // * If center row collides on rotation, kicking can't be performed
      return null;
    }
    return (
      this.#setWallKick(this.#wallKick(attempt)) ||
      this.#setWallKick(this.#doubleWallKick(attempt)) ||
      this.#setFloorKick(attempt) ||
      this.#setDoubleFloorKick(attempt)
    );
  }
  #setWallKick(attempt) {
    const attemptIsVerticalI = attempt.toString().includes(I_SHAPES[1].substring(0, 4));
    if (attemptIsVerticalI || this.#hitsImmobile(attempt)) {
      return null;
    }
    return this.#setFalling(attempt);
  }
  #setFloorKick(attempt) {
    const floorKickShape = this.#floorKick(attempt);
    if (this.#nextRowIsEmpty() || this.#hitsImmobile(floorKickShape)) {
      return null;
    }
    return this.#setFalling(floorKickShape);
  }
  #setDoubleFloorKick(attempt) {
    const doubleFloorKick = this.#doubleFloorKick(attempt);
    // * horizontalI can't perform it to not allow escaping from a hollow that has its same height
    const attemptIsHorizontalI = attempt.toString().includes(I_SHAPES[0].substring(0, 4));
    const forbiddenDoubleFloorKick =
      attemptIsHorizontalI || this.#nextRowIsEmpty() || this.#hitsImmobile(doubleFloorKick);
    if (forbiddenDoubleFloorKick) {
      return null;
    }
    return this.#setFalling(doubleFloorKick);
  }
  #wallKick(shape) {
    const wallKickRight = shape.moveRight();
    const canWallKickRight = !this.#hitsWall(wallKickRight) && !this.#hitsImmobile(wallKickRight);
    // * ARS has a right side bias for wall kicks, so if wall kick right is possible we return that
    if (canWallKickRight) {
      return wallKickRight;
    }
    // * if wall kick right is not possible then wall kick left is performed
    return shape.moveLeft();
  }
  #doubleWallKick(shape) {
    const wallKickRight = shape.moveRight().moveRight();
    const canWallKickRight = !this.#hitsWall(wallKickRight) && !this.#hitsImmobile(wallKickRight);
    // * ARS has a right side bias for wall kicks, so if wall kick right is possible we return that
    if (canWallKickRight) {
      return wallKickRight;
    }
    // * if wall kick right is not possible then wall kick left is performed
    return shape.moveLeft().moveLeft();
  }
  #floorKick(shape) {
    return shape.floorKick();
  }
  #doubleFloorKick(shape) {
    return shape.floorKick().floorKick();
  }
  #collisionCoordinates(falling) {
    return falling.nonEmptyBlocks().find((block) => {
      const row = block.row < 0 ? 0 : block.row;
      return this.#immobile[row][block.col] !== EmptyBlock;
    });
  }
  #hitsImmobile(attempt) {
    return !!this.#collisionCoordinates(attempt);
  }
  #hitsWall(falling) {
    return falling.nonEmptyBlocks().some((block) => {
      const hitsLeftWall = block.col < 0;
      const hitsRightWall = block.col >= this.width();
      return hitsLeftWall || hitsRightWall;
    });
  }
  #hitsFloor(falling) {
    return falling.nonEmptyBlocks().some((block) => block.row >= this.#height);
  }
  #setFalling(attempt) {
    return (this.#falling = attempt);
  }
  #stopFalling() {
    for (let row = 0; row < this.height(); row++) {
      for (let col = 0; col < this.width(); col++) {
        this.#immobile[row][col] = this.blockAt(row, col);
      }
    }
    this.#setFalling(null);
    this.#clearLine();
  }
  #findLineClearIndeces() {
    return this.#immobile
      .map((row, i) => (row.every((block) => block !== EmptyBlock) ? i : -1))
      .filter((index) => index >= 0);
  }
  #clearLine() {
    const lineClearIndeces = this.#findLineClearIndeces();
    if (lineClearIndeces.length) {
      lineClearIndeces.forEach((index) => {
        const beforeCleared = this.#immobile.slice(0, index);
        const afterCleared = this.#immobile.slice(index + 1);
        const newLine = new Array(this.#width).fill(EmptyBlock);
        this.#immobile = [newLine].concat(beforeCleared, afterCleared);
      });
      this.events.notify({ clearedLines: lineClearIndeces.length, level: this.level });
    }
  }
  #nextRowIsEmpty() {
    const moveDown = this.#falling.moveDown();
    return !this.#hitsFloor(moveDown) && !this.#hitsImmobile(moveDown);
  }
  hasFalling() {
    return this.#falling !== null;
  }
  width() {
    return this.#width;
  }
  height() {
    return this.#height;
  }
  blockAt(row, col) {
    const emptyBlock = this.#immobile[row][col];
    if (!this.hasFalling()) {
      return emptyBlock;
    }
    const block = this.#falling.blockAt(row, col);
    if (block !== EmptyBlock) {
      return block;
    }
    return emptyBlock;
  }
  toString() {
    return shapeToString(this);
  }
}
