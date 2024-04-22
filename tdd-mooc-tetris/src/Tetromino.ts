import { EmptyBlock, I_SHAPES, L_SHAPES, O_SHAPES, Shape, T_SHAPES } from "./shapes";

export class Tetromino implements Shape {
  static T_SHAPE = new Tetromino(0, T_SHAPES);

  static I_SHAPE = new Tetromino(0, I_SHAPES);

  static O_SHAPE = new Tetromino(0, O_SHAPES);

  static L_SHAPE = new Tetromino(0, L_SHAPES);

  #currentOrientation: number;
  #orientations: string[];
  #shape: string[][];

  constructor(currentOrientation: number, orientations: string[]) {
    this.#currentOrientation = (currentOrientation + orientations.length) % orientations.length;
    this.#orientations = orientations;
    this.#shape = this.#orientations[this.#currentOrientation]
      .replaceAll(" ", "")
      .trim()
      .split("\n")
      .map((row) => row.split(""));
  }

  rotateRight(): Tetromino {
    return new Tetromino(this.#currentOrientation + 1, this.#orientations);
  }

  rotateLeft(): Tetromino {
    return new Tetromino(this.#currentOrientation - 1, this.#orientations);
  }

  width(): number {
    return this.#shape[0].length;
  }

  height(): number {
    return this.#shape.length;
  }

  blockAt(row: number, col: number): string {
    return this.#shape[row][col];
  }

  toString(): string {
    let s = "";
    for (let row = 0; row < this.height(); row++) {
      for (let col = 0; col < this.width(); col++) {
        s += this.blockAt(row, col);
      }
      s += "\n";
    }
    return s;
  }
}
