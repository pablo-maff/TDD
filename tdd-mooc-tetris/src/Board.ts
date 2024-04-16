import { Shape, shapeToString } from "./shapes";
import { Block } from "./Block";

const EMPTY = ".";

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
    return new MovableShape(this.#shape.rotateRight(), this.#row, this.#col);
  }

  rotateLeft(): MovableShape {
    return new MovableShape(this.#shape.rotateLeft(), this.#row, this.#col);
  }

  // * Returns the block starting coordinates of the shape relative to the board
  nonEmptyBlocks(): Point[] {
    const points = [];
    for (let row = this.#row; row < this.height(); row++) {
      for (let col = this.#col; col < this.width(); col++) {
        const block = this.blockAt(row, col);
        if (block !== EMPTY) {
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
      return EMPTY;
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

  constructor(width: number, height: number, loadBoard?: string) {
    this.#width = width;
    this.#height = height;
    if (loadBoard) {
      this.#immobile = loadBoard
        .replaceAll(" ", "")
        .trim()
        .split("\n")
        .map((row) => row.split(""));
      return;
    }
    this.#immobile = new Array(height);
    for (let row = 0; row < height; row++) {
      this.#immobile[row] = new Array(width).fill(EMPTY);
    }
  }

  static loadBoard(board: string): Board {
    return new Board(10, 6, board);
  }

  drop(piece: Shape | string): void {
    if (typeof piece === "string") {
      piece = new Block(piece);
    }

    if (this.#falling) {
      throw new Error("another piece is already falling");
    }

    const middleCol = Math.floor((this.#width - piece.width()) / 2);

    this.#falling = new MovableShape(piece, 0, middleCol);
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
    if (!this.hasFalling()) {
      return this;
    }

    const attempt = this.#falling!.rotateRight();

    if (this.#hitsWall(attempt)) {
      const attempt2 = this.#wallKickAgainstWall().rotateRight();

      if (!this.#hitsImmobile(attempt2)) {
        this.#falling = attempt2;
      }

      return this;
    }

    const hitsImmobile = this.#hitsImmobile(attempt);

    if (!!hitsImmobile) {
      const attempt2 = this.#wallKickAgainstShape(hitsImmobile.col + 1, attempt.width()).rotateRight();

      if (!this.#hitsImmobile(attempt2)) {
        this.#falling = attempt2;
      }

      return this;
    }

    if (!this.#hitsImmobile(attempt)) {
      this.#falling = attempt;
    }

    return this;
  }

  rotateLeft(): Shape {
    if (!this.hasFalling()) {
      return this;
    }

    const attempt = this.#falling!.rotateLeft();

    if (this.#hitsWall(attempt)) {
      const attempt2 = this.#wallKickAgainstWall().rotateLeft();

      if (!this.#hitsImmobile(attempt2)) {
        this.#falling = attempt2;
      }

      return this;
    }

    const hitsImmobile = this.#hitsImmobile(attempt);

    if (!!hitsImmobile) {
      const attempt2 = this.#wallKickAgainstShape(hitsImmobile.col + 1, attempt.width()).rotateLeft();

      if (!this.#hitsImmobile(attempt2)) {
        this.#falling = attempt2;
      }

      return this;
    }

    if (!this.#hitsImmobile(attempt)) {
      this.#falling = attempt;
    }

    return this;
  }

  #wallKickAgainstWall(): MovableShape {
    const blockIsOnRightSideOfBoard = this.#falling!.width() > this.width() / 2;

    return blockIsOnRightSideOfBoard ? this.#falling!.moveLeft() : this.#falling!.moveRight();
  }

  #wallKickAgainstShape(collisionColumn: number, attemptWidth: number): MovableShape {
    if (!collisionColumn || !attemptWidth) {
      throw new Error("missing arguments");
    }

    const collisionOnRightSideOfShape = attemptWidth <= collisionColumn;

    return collisionOnRightSideOfShape ? this.#falling!.moveLeft() : this.#falling!.moveRight();
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
    return falling.nonEmptyBlocks().find((block) => this.#immobile[block.row][block.col] !== EMPTY);
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

    if (block !== EMPTY) {
      return block;
    }

    return emptyBlock;
  }

  toString(): string {
    return shapeToString(this);
  }
}
