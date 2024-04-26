import { EmptyBlock, Shape, shapeToString } from "./shapes";

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
    this.#row = shape.width() === 1 ? 0 : -1;

    const middleCol = Math.floor((row - shape.width()) / 2);

    this.#col = middleCol;
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
  collisionInternalPoint(collision: Point): Point {
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

  constructor(width: number, height: number, immobile?: string[][]) {
    this.#width = width;
    this.#height = height;

    // * For loaded boards
    if (immobile) {
      this.#immobile = immobile;

      return;
    }

    // * For fresh boards
    this.#immobile = new Array(height);
    for (let row = 0; row < height; row++) {
      this.#immobile[row] = new Array(width).fill(EmptyBlock);
    }
  }

  static loadBoard(board: string): Board {
    const immobile = board
      .replaceAll(" ", "")
      .trim()
      .split("\n")
      .map((row) => row.split(""));

    const height = immobile.length;
    const width = immobile[0].length;

    return new Board(width, height, immobile);
  }

  drop(piece: Shape): void {
    if (this.hasFalling()) {
      throw new Error("another piece is already falling");
    }

    this.#falling = new MovableShape(piece, this.#width);
  }

  tick(): void {
    if (!this.hasFalling()) {
      return;
    }

    const attempt = this.#falling!.moveDown();
    const canTick = !this.#hitsFloor(attempt) && !this.#hitsImmobile(attempt);

    if (canTick) {
      this.#falling = attempt;
      return;
    }

    this.#stopFalling();
  }

  moveLeft(): void {
    if (!this.hasFalling()) {
      return;
    }

    this.#moveHorizontally(this.#falling!.moveLeft());
  }

  moveRight(): void {
    if (!this.hasFalling()) {
      return;
    }

    this.#moveHorizontally(this.#falling!.moveRight());
  }

  rotateRight(): Shape {
    this.#rotate("right");

    return this;
  }

  rotateLeft(): Shape {
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
      this.#falling = attempt;
      return;
    }

    if (this.#hitsFloor(attempt)) {
      this.#handleFloorCollision(attempt);
      return;
    }

    if (this.#hitsWall(attempt)) {
      this.#handleWallCollision(attempt);
      return;
    }

    // * If we reach this point is because it is hitting a block
    this.#handleBlockCollision(attempt);
  }

  #handleWallCollision(attempt: MovableShape): void {
    const wallKick = this.#wallKick(attempt);

    if (!this.#hitsImmobile(wallKick)) {
      this.#falling = wallKick;
      return;
    }

    const doubleWallKick = this.#doubleWallKick(attempt);

    if (!this.#hitsImmobile(doubleWallKick)) {
      this.#falling = doubleWallKick;
      return;
    }
  }

  #handleFloorCollision(attempt: MovableShape): void {
    const floorKick1 = this.#floorKick(attempt);
    const floorKick2 = this.#floorKick(floorKick1);

    if (!this.#hitsImmobile(floorKick2)) {
      this.#falling = floorKick2;
    }
  }

  // TODO: Refactor
  #handleBlockCollision(attempt: MovableShape): MovableShape | null {
    const collisionCoordinates = this.#hitsImmobile(attempt);

    if (!collisionCoordinates) {
      return;
    }

    // * center column collision rule applies for all tetrominoes except I
    const centerColumnCollision =
      attempt.collisionInternalPoint(collisionCoordinates).col === 1 && !attempt.toString().includes("I");

    if (centerColumnCollision) {
      // * If center row collides on rotation kicking can't be performed
      return;
    }

    const floorKickShape = this.#floorKick(attempt);

    return (
      this.#setWallKick(attempt) ||
      this.#setFloorKick(floorKickShape) ||
      this.#setDoubleFloorKick(floorKickShape) ||
      this.#setDoubleWallKick(attempt)
    );
  }

  #canKick(attempt: MovableShape): boolean {
    return !this.#hitsImmobile(attempt);
  }

  #setWallKick(attempt: MovableShape): MovableShape | null {
    const wallKickShape = this.#wallKick(attempt);

    if (this.#canKick(wallKickShape)) {
      return (this.#falling = wallKickShape);
    }
    return null;
  }

  #setFloorKick(attempt: MovableShape): MovableShape | null {
    if (this.#nextRowIsEmpty()) {
      return null;
    }
    if (this.#canKick(attempt)) {
      return (this.#falling = attempt);
    }
    return null;
  }

  #setDoubleWallKick(attempt: MovableShape): MovableShape | null {
    // TODO: This verification should only be done in floor kicks. Need to find a way to remove it without breaking the game
    if (this.#nextRowIsEmpty()) {
      return null;
    }
    const doubleWallKickShape = this.#doubleWallKick(attempt);

    if (this.#canKick(doubleWallKickShape)) {
      return (this.#falling = doubleWallKickShape);
    }

    return null;
  }

  #setDoubleFloorKick(attempt: MovableShape): MovableShape | null {
    if (this.#nextRowIsEmpty()) {
      return null;
    }
    const doubleFloorKickShape = this.#floorKick(attempt);
    // * Can perform double floor kick if it doesn't hit any other block and in the case of I, if the rotation is not in horizontal position
    const attemptIsVerticalI = !attempt.toString().includes("IIII");
    if (this.#canKick(doubleFloorKickShape) && attemptIsVerticalI) {
      return (this.#falling = doubleFloorKickShape);
    }
    return null;
  }

  #nextRowIsEmpty(): boolean {
    const moveDown = this.#falling!.moveDown();

    return !this.#hitsFloor(moveDown) && !this.#hitsImmobile(moveDown);
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

  #moveHorizontally(attempt: MovableShape) {
    if (!this.#hitsWall(attempt) && !this.#hitsImmobile(attempt)) {
      this.#falling = attempt;
    }
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

  #hitsImmobile(falling: MovableShape): Point | void {
    return falling.nonEmptyBlocks().find((block) => {
      const row = block.row < 0 ? 0 : block.row;
      return this.#immobile[row][block.col] !== EmptyBlock;
    });
  }

  #stopFalling(): void {
    for (let row = 0; row < this.height(); row++) {
      for (let col = 0; col < this.width(); col++) {
        this.#immobile[row][col] = this.blockAt(row, col);
      }
    }
    this.#falling = null;
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

    if (!this.#falling) {
      return emptyBlock;
    }

    const block = this.#falling.blockAt(row, col);

    if (block !== EmptyBlock) {
      return block;
    }

    return emptyBlock;
  }

  toString(): string {
    return shapeToString(this);
  }
}
