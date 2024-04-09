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

  // * Returns the bottommost row of the shape
  height(): number {
    return this.#row + this.#shape.height();
  }

  // * Returns the rightmost column of the shape
  width(): number {
    return this.#col + this.#shape.width();
  }
}

export class Board implements Shape {
  #width: number;
  #height: number;
  #falling: MovableShape | null = null;
  #immobile: string[][];

  constructor(width: number, height: number) {
    this.#width = width;
    this.#height = height;
    this.#immobile = new Array(height);
    for (let row = 0; row < height; row++) {
      this.#immobile[row] = new Array(width).fill(EMPTY);
    }
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

    if (this.#hitsFloor(attempt) || this.#hitsImmobile(attempt)) {
      this.#stopFalling();
    } else {
      this.#falling = attempt;
    }
  }

  #hitsFloor(falling: MovableShape): boolean {
    for (const block of falling.nonEmptyBlocks()) {
      if (block.row >= this.#height) {
        return true;
      }
    }
    return false;
  }

  #hitsImmobile(falling: MovableShape): boolean {
    for (const block of falling.nonEmptyBlocks()) {
      if (this.#immobile[block.row][block.col] !== EMPTY) {
        return true;
      }
    }
    return false;
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
