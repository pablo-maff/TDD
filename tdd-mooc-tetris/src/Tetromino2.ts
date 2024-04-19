import { RotatingShape2 } from "./RotatingShape2";
import { EmptyBlock, Shape, shapeToString } from "./shapes";

export class Tetromino2 implements Shape {
  static T_SHAPE = new Tetromino2(0, [
    `....
       TTT.
       .T..
       ....`,
    `.T..
       TT..
       .T..
       ....`,
    `....
       .T..
       TTT.
       ....`,
    `.T..
       .TT.
       .T..
       ....`,
  ]);

  static I_SHAPE = new Tetromino2(0, [
    `....
       IIII
       ....
       ....`,
    `..I.
       ..I.
       ..I.
       ..I.`,
  ]);

  static O_SHAPE = new Tetromino2(0, [
    `....
       .OO.
       .OO.
       ....`,
  ]);

  #currentOrientation: number;
  #orientations: string[];
  #shape2: string[][];

  constructor(currentOrientation: number, orientations: string[]) {
    this.#currentOrientation = (currentOrientation + orientations.length) % orientations.length;
    this.#orientations = orientations;
    this.#shape2 = this.#orientations[this.#currentOrientation]
      .replaceAll(" ", "")
      .trim()
      .split("\n")
      .map((row) => row.split(""));
  }

  rotateRight(): Tetromino2 {
    return new Tetromino2(this.#currentOrientation + 1, this.#orientations);
  }

  rotateLeft(): Tetromino2 {
    return new Tetromino2(this.#currentOrientation - 1, this.#orientations);
  }

  width(): number {
    return this.#shape2[0].length;
  }

  internalWidth(): number {
    const width = this.#shape2.reduce((width, row, i) => {
      const color = row.find((block) => block !== EmptyBlock);

      if (!color) {
        return width;
      }

      const rowWidth = row.lastIndexOf(color) + 1;

      if (rowWidth > width) {
        return rowWidth;
      }

      return width;
    }, 0);

    return width;
  }

  height(): number {
    return this.#shape2.length;
  }

  blockAt(row: number, col: number): string {
    return this.#shape2[row][col];
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
