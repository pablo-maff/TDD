import { EmptyBlock, Shape, shapeToString } from "./shapes";
import { Block } from "./Block";

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
    if (typeof piece === "string") {
      piece = new Block(piece);
    }

    if (this.#falling) {
      throw new Error("another piece is already falling");
    }

    const middleCol = Math.floor((this.#width - piece.width()) / 2);

    this.#falling = new MovableShape(piece, 0, middleCol);
  }

  drop2(piece: Shape | string): void {
    if (typeof piece === "string") {
      piece = new Block(piece);
    }

    if (this.#falling) {
      throw new Error("another piece is already falling");
    }

    const middleCol = Math.floor((this.#width - piece.width()) / 2);

    this.#falling = new MovableShape(piece, -1, middleCol);
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
      const wallKick = this.#wallKick(attempt);

      if (!this.#hitsImmobile(wallKick)) {
        this.#falling = wallKick;
      } else {
        const doubleWallKick = this.#wallKick(wallKick);
        this.#falling = doubleWallKick;
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
      const wallKick = this.#wallKick(attempt);

      if (!this.#hitsImmobile(wallKick)) {
        this.#falling = wallKick;
      } else {
        const doubleWallKick = this.#wallKick(wallKick);
        if (!this.#hitsImmobile(doubleWallKick)) {
          this.#falling = doubleWallKick;
        }
      }

      return this;
    }

    const hitsImmobile = this.#hitsImmobile(attempt);

    if (!!hitsImmobile) {
      const wallKickShape = this.#wallKickShape(hitsImmobile.col + 1, attempt.width(), attempt);

      const wallKickHitsImmobile = this.#hitsImmobile(wallKickShape);
      if (!wallKickHitsImmobile) {
        this.#falling = wallKickShape;
      } else {
        const doubleWallKickShape = this.#wallKickShape(hitsImmobile.col + 1, attempt.width(), wallKickShape);
        if (!this.#hitsImmobile(doubleWallKickShape)) {
          this.#falling = doubleWallKickShape;
        }
      }

      return this;
    }

    if (!this.#hitsImmobile(attempt)) {
      this.#falling = attempt;
    }

    return this;
  }

  #wallKick(shape: MovableShape): MovableShape {
    const blockIsOnRightSideOfBoard = shape.width() > this.width() / 2;

    return blockIsOnRightSideOfBoard ? shape.moveLeft() : shape.moveRight();
  }

  #wallKickAgainstShape(collisionColumn: number, attemptWidth: number): MovableShape {
    if (!collisionColumn || !attemptWidth) {
      throw new Error("missing arguments");
    }

    const collisionOnRightSideOfShape = attemptWidth <= collisionColumn;

    return collisionOnRightSideOfShape ? this.#falling!.moveLeft() : this.#falling!.moveRight();
  }

  #wallKickShape(collisionColumn: number, attemptWidth: number, shape: MovableShape): MovableShape {
    if (!collisionColumn || !attemptWidth) {
      throw new Error("missing arguments");
    }

    const collisionOnRightSideOfShape = attemptWidth <= collisionColumn;

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
