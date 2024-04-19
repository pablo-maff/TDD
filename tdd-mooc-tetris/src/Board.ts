import { EmptyBlock, Shape, shapeToString } from "./shapes";
import { Block } from "./Block";
import { Tetromino } from "./Tetromino";

class Point {
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

  constructor(shape: Shape, row: number, col: number) {
    this.#shape = shape;
    this.#row = row;
    this.#col = col;
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

  internalWidth(): number {
    if (!this.#shape.internalWidth) {
      throw new Error("Shape missing internalWidth method");
    }

    return this.#col + this.#shape.internalWidth();
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

  drop(piece: Shape | string): void {
    let initialRow = -1;

    if (typeof piece === "string") {
      piece = new Block(piece);
      initialRow = 0;
    }

    if (this.#falling) {
      throw new Error("another piece is already falling");
    }

    const middleCol = Math.floor((this.#width - piece.width()) / 2);

    this.#falling = new MovableShape(piece, initialRow, middleCol);
  }

  tick(): void {
    if (!this.hasFalling()) {
      return;
    }

    const attempt = this.#falling!.moveDown();

    if (!this.#hitsFloor(attempt) && !this.#hitsImmobile(attempt)) {
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
    return this.#rotate("right");
  }

  rotateLeft(): Shape {
    return this.#rotate("left");
  }

  #rotate(direction: "left" | "right"): Shape {
    if (!this.hasFalling()) {
      return this;
    }

    const attempt = direction === "left" ? this.#falling!.rotateLeft() : this.#falling!.rotateRight();

    if (!this.#hitsWall(attempt) && !this.#hitsImmobile(attempt)) {
      this.#falling = attempt;

      return this;
    }

    if (this.#hitsWall(attempt)) {
      return this.#handleWallCollision(attempt);
    }

    // * If we reach this point is because it is hitting a block
    return this.#handleBlockCollision(attempt);
  }

  #handleWallCollision(attempt: MovableShape): Shape {
    const wallKick = this.#wallKick(attempt);

    if (!this.#hitsImmobile(wallKick)) {
      this.#falling = wallKick;

      return this;
    }

    const doubleWallKick = this.#wallKick(wallKick);

    if (!this.#hitsImmobile(doubleWallKick)) {
      this.#falling = doubleWallKick;

      return this;
    }

    return this;
  }

  #handleBlockCollision(attempt: MovableShape): Shape {
    const collisionCoordinates = this.#hitsImmobile(attempt);

    if (!collisionCoordinates) {
      return this;
    }

    const wallKickShape = this.#wallKickShape(attempt);

    if (!this.#hitsImmobile(wallKickShape)) {
      this.#falling = wallKickShape;

      return this;
    }

    const doubleWallKickShape = this.#wallKickShape(wallKickShape);

    if (!this.#hitsImmobile(doubleWallKickShape)) {
      this.#falling = doubleWallKickShape;

      return this;
    }

    return this;
  }

  #wallKick(shape: MovableShape): MovableShape {
    const blockIsOnRightSideOfBoard = shape.width() > this.width() / 2;

    return blockIsOnRightSideOfBoard ? shape.moveLeft() : shape.moveRight();
  }

  #wallKickShape(shape: MovableShape): MovableShape {
    const collisionCoordinates = this.#hitsImmobile(shape);

    const collisionOnRightSideOfShape = shape.internalWidth() <= collisionCoordinates!.col + 1;

    return collisionOnRightSideOfShape ? shape.moveLeft() : shape.moveRight();
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
