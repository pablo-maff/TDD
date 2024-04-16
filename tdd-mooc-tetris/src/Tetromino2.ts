import { RotatingShape2 } from "./RotatingShape2";
import { Shape } from "./shapes";

export class Tetromino2 implements Shape {
  static T_SHAPE = new Tetromino2(0, [
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

  // static #I_SHAPE = [
  //   `....
  //    IIII
  //    ....
  //    ....`,
  //   `..I.
  //    ..I.
  //    ..I.
  //    ..I.`
  // ]

  // static #O_SHAPE = [
  //   `....
  //    .OO.
  //    .OO.
  //    ....`
  // ]
  // static T_SHAPE = new Tetromino(
  //   0,
  //   4,
  //   `.T.
  //    TTT
  //    ...`
  // );

  // static I_SHAPE = new Tetromino(
  //   0,
  //   2,
  //   `.....
  //    .....
  //    IIII.
  //    .....
  //    .....`
  // );

  // static O_SHAPE = new Tetromino(
  //   0,
  //   1,
  //   `.OO
  //    .OO
  //    ...`
  // );

  #currentOrientation: number;
  #orientations: RotatingShape2[];

  constructor(currentOrientation: number, orientations: RotatingShape2[]) {
    this.#currentOrientation = (currentOrientation + orientations.length) % orientations.length;
    this.#orientations = orientations;
  }

  rotateRight(): Tetromino2 {
    return new Tetromino2(this.#currentOrientation + 1, this.#orientations);
  }

  rotateLeft(): Tetromino2 {
    return new Tetromino2(this.#currentOrientation - 1, this.#orientations);
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
