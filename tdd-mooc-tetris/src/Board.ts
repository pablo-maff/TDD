import { EventsManager } from "./EventsManager.js";
import { EmptyBlock, I_SHAPES, Shape, shapeToString } from "./shapes.js";
import { LevelsFixedGoal } from "./LevelsFixedGoal.js";

export class Point {
  row: number;
  col: number;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }
}

class MovableShape implements Shape {
  #shape: Shape;
  #row: number; // * The row of the topmost row of the shape
  #col: number; // * The column of the leftmost column of the shape

  constructor(shape: Shape, row: number, col?: number) {
    this.#shape = shape;

    // * If col is specified just pass the values of row and col
    if (typeof col === "number") {
      this.#row = row;
      this.#col = col;
      return;
    }

    // * If col is not specified the shape is being dropped into the board so calculating the initial positions is necessary
    // * If shape is a block then initial row is 0, for tetrominoes it is -1
    this.#row = this.#isBlock(shape) ? 0 : -1;

    const middleCol = Math.floor((row - shape.width()) / 2);

    this.#col = middleCol;
  }

  // * A block is a 1*1 piece used to mock a Tetromino for some basic tests
  #isBlock(shape: Shape) {
    return shape.width() === 1;
  }

  floorKick(): MovableShape {
    return new MovableShape(this.#shape, this.#row - 1, this.#col);
  }

  moveDown(): MovableShape {
    return new MovableShape(this.#shape, this.#row + 1, this.#col);
  }

  moveLeft(): MovableShape {
    return new MovableShape(this.#shape, this.#row, this.#col - 1);
  }

  moveRight(): MovableShape {
    return new MovableShape(this.#shape, this.#row, this.#col + 1);
  }

  rotateRight(): MovableShape {
    return new MovableShape(this.#shape.rotateRight(), this.#row < 0 ? 0 : this.#row, this.#col);
  }

  rotateLeft(): MovableShape {
    return new MovableShape(this.#shape.rotateLeft(), this.#row < 0 ? 0 : this.#row, this.#col);
  }

  // * Returns the block starting coordinates of the shape relative to the board
  nonEmptyBlocks(): Point[] {
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
  collisionInternalCoordinates(collision: Point): Point {
    return new Point(collision.row - this.#row, collision.col - this.#col);
  }

  // * Checks if the block is within boundaries
  blockAt(row: number, col: number): string {
    const blockInHeightBoundaries = row >= this.#row && row < this.height();
    const blockInWidthBoundaries = col >= this.#col && col < this.width();

    if (!blockInHeightBoundaries || !blockInWidthBoundaries) {
      return EmptyBlock;
    }

    return this.#shape.blockAt(row - this.#row, col - this.#col);
  }

  height(): number {
    return this.#row + this.#shape.height();
  }

  width(): number {
    return this.#col + this.#shape.width();
  }

  toString(): string {
    return this.#shape.toString();
  }
}

export class Board implements Shape {
  #width: number;
  #height: number;
  #falling: MovableShape | null = null;
  #immobile: string[][];
  events: EventsManager;
  #level: LevelsFixedGoal;
  isPlaying: boolean;

  constructor(width: number, height: number, immobile?: string[][], level: number = 0) {
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

  static loadBoard(board: string, level?: number): Board {
    const immobile = board
      .replaceAll(" ", "")
      .trim()
      .split("\n")
      .map((row) => row.split(""));

    const height = immobile.length;
    const width = immobile[0].length;

    return new Board(width, height, immobile, level);
  }

  public get level(): number {
    return this.#level.value;
  }

  drop(piece: Shape): void | Record<string, number | boolean> {
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

  tick(): void {
    if (!this.hasFalling()) {
      return;
    }

    const attempt = this.#falling!.moveDown();
    const canTick = !this.#hitsFloor(attempt) && !this.#hitsImmobile(attempt);

    if (canTick) {
      this.#setFalling(attempt);
      return;
    }

    this.#stopFalling();
  }

  moveDown(): void {
    this.tick();
  }

  moveLeft(): void {
    this.#moveHorizontally(this.#falling!.moveLeft());
  }

  moveRight(): void {
    this.#moveHorizontally(this.#falling!.moveRight());
  }

  #moveHorizontally(attempt: MovableShape): void {
    if (!this.hasFalling()) {
      return;
    }

    if (!this.#hitsWall(attempt) && !this.#hitsImmobile(attempt)) {
      this.#setFalling(attempt);
      return;
    }
  }

  rotateRight(): Board {
    this.#rotate("right");

    return this;
  }

  rotateLeft(): Board {
    this.#rotate("left");

    return this;
  }

  #rotate(direction: "left" | "right"): void {
    if (!this.hasFalling()) {
      return;
    }

    const attempt = direction === "left" ? this.#falling!.rotateLeft() : this.#falling!.rotateRight();
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
      this.#handleKick(attempt, this.#collisionCoordinates(attempt)!);
    }
  }

  #handleKick(attempt: MovableShape, collisionCoordinates: Point): MovableShape | null {
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

  #setWallKick(attempt: MovableShape): MovableShape | null {
    const attemptIsVerticalI = attempt.toString().includes(I_SHAPES[1].substring(0, 4));

    if (attemptIsVerticalI || this.#hitsImmobile(attempt)) {
      return null;
    }

    return this.#setFalling(attempt);
  }

  #setFloorKick(attempt: MovableShape): MovableShape | null {
    const floorKickShape = this.#floorKick(attempt);

    if (this.#nextRowIsEmpty() || this.#hitsImmobile(floorKickShape)) {
      return null;
    }

    return this.#setFalling(floorKickShape);
  }

  #setDoubleFloorKick(attempt: MovableShape): MovableShape | null {
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

  #wallKick(shape: MovableShape): MovableShape {
    const wallKickRight = shape.moveRight();
    const canWallKickRight = !this.#hitsWall(wallKickRight) && !this.#hitsImmobile(wallKickRight);

    // * ARS has a right side bias for wall kicks, so if wall kick right is possible we return that
    if (canWallKickRight) {
      return wallKickRight;
    }

    // * if wall kick right is not possible then wall kick left is performed
    return shape.moveLeft();
  }

  #doubleWallKick(shape: MovableShape): MovableShape {
    const wallKickRight = shape.moveRight().moveRight();
    const canWallKickRight = !this.#hitsWall(wallKickRight) && !this.#hitsImmobile(wallKickRight);

    // * ARS has a right side bias for wall kicks, so if wall kick right is possible we return that
    if (canWallKickRight) {
      return wallKickRight;
    }

    // * if wall kick right is not possible then wall kick left is performed
    return shape.moveLeft().moveLeft();
  }

  #floorKick(shape: MovableShape): MovableShape {
    return shape.floorKick();
  }

  #doubleFloorKick(shape: MovableShape): MovableShape {
    return shape.floorKick().floorKick();
  }

  #collisionCoordinates(falling: MovableShape): Point | void {
    return falling.nonEmptyBlocks().find((block) => {
      const row = block.row < 0 ? 0 : block.row;
      return this.#immobile[row][block.col] !== EmptyBlock;
    });
  }

  #hitsImmobile(attempt: MovableShape): boolean {
    return !!this.#collisionCoordinates(attempt);
  }

  #hitsWall(falling: MovableShape): boolean {
    return falling.nonEmptyBlocks().some((block) => {
      const hitsLeftWall = block.col < 0;
      const hitsRightWall = block.col >= this.width();

      return hitsLeftWall || hitsRightWall;
    });
  }

  #hitsFloor(falling: MovableShape): boolean {
    return falling.nonEmptyBlocks().some((block) => block.row >= this.#height);
  }

  #setFalling(attempt: MovableShape | null): MovableShape | null {
    return (this.#falling = attempt);
  }

  #stopFalling(): void {
    for (let row = 0; row < this.height(); row++) {
      for (let col = 0; col < this.width(); col++) {
        this.#immobile[row][col] = this.blockAt(row, col);
      }
    }
    this.#setFalling(null);
    this.#clearLine();
  }

  #findLineClearIndeces(): number[] {
    return this.#immobile
      .map((row, i) => (row.every((block) => block !== EmptyBlock) ? i : -1))
      .filter((index) => index >= 0);
  }

  #clearLine(): void {
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

  #nextRowIsEmpty(): boolean {
    const moveDown = this.#falling!.moveDown();

    return !this.#hitsFloor(moveDown) && !this.#hitsImmobile(moveDown);
  }

  hasFalling(): boolean {
    return this.#falling !== null;
  }

  width(): number {
    return this.#width;
  }

  height(): number {
    return this.#height;
  }

  blockAt(row: number, col: number): string {
    const emptyBlock = this.#immobile[row][col];

    if (!this.hasFalling()) {
      return emptyBlock;
    }

    const block = this.#falling!.blockAt(row, col);

    if (block !== EmptyBlock) {
      return block;
    }

    return emptyBlock;
  }

  toString(): string {
    return shapeToString(this);
  }
}
