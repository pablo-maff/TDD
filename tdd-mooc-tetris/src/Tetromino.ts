import { RotatingShape2 } from "./RotatingShape2";
import { Shape } from "./shapes";

export class Tetromino implements Shape {
  static T_SHAPE = new Tetromino(0, [
    new RotatingShape2(
      `....
       TTT.
       .T..
       ....`
    ),
    new RotatingShape2(
      `.T..
       TT..
       .T..
       ....`
    ),
    new RotatingShape2(
      `....
       .T..
       TTT.
       ....`
    ),
    new RotatingShape2(
      `.T..
       .TT.
       .T..
       ....`
    ),
  ]);

  static I_SHAPE = new Tetromino(0, [
    new RotatingShape2(
      `....
       IIII
       ....
       ....`
    ),
    new RotatingShape2(
      `..I.
       ..I.
       ..I.
       ..I.`
    ),
  ]);

  static O_SHAPE = new Tetromino(0, [
    new RotatingShape2(
      `....
       .OO.
       .OO.
       ....`
    ),
  ]);

  #currentOrientation: number;
  #orientations: RotatingShape2[];

  constructor(currentOrientation: number, orientations: RotatingShape2[]) {
    this.#currentOrientation = (currentOrientation + orientations.length) % orientations.length;
    this.#orientations = orientations;
  }

  rotateRight(): Tetromino {
    return new Tetromino(this.#currentOrientation + 1, this.#orientations);
  }

  rotateLeft(): Tetromino {
    return new Tetromino(this.#currentOrientation - 1, this.#orientations);
  }

  #shape(): RotatingShape2 {
    return this.#orientations[this.#currentOrientation];
  }

  width(): number {
    return this.#shape().width();
  }

  height(): number {
    return this.#shape().height();
  }

  blockAt(row: number, col: number): string {
    return this.#shape().blockAt(row, col);
  }

  toString(): string {
    return this.#shape().toString();
  }
}
