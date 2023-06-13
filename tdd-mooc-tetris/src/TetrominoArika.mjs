import { RotatingShape } from "./RotatingShape.mjs";

export class TetrominoArika extends RotatingShape {
  static #T_SHAPE = [
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
  ]

  static #I_SHAPE = [
    `....
     IIII
     ....
     ....`,
    `..I.
     ..I.
     ..I.
     ..I.`
  ]

  static #O_SHAPE = [
    `....
     .OO.
     .OO.
     ....`
  ]

  static T_SHAPE = new TetrominoArika(TetrominoArika.#T_SHAPE, 0);

  static I_SHAPE = new TetrominoArika(TetrominoArika.#I_SHAPE, 0);

  static O_SHAPE = new TetrominoArika(TetrominoArika.#O_SHAPE, 0);

  constructor(shape, rotationIndex) {
    super(shape[rotationIndex]);
  }

  // * Overrides
  // rotateRight() {
  //   if (this.shape.includes('O')) return new TetrominoArika(this.toString())
  //   if (this.shape.includes('I')) {
  //     if (this.#rotationCounter === 0) {
  //       return new TetrominoArika(super.rotateRight().toString(), this.#rotationCounter + 1)
  //     }
  //     else {
  //       return new TetrominoArika(super.rotateLeft().toString(), this.#rotationCounter - 1)
  //     }
  //   }

  //   return new TetrominoArika(super.rotateRight().toString(), this.#rotationCounter + 1)
  // }

  // rotateLeft() {
  //   if (this.shape.includes('I')) {
  //     return this.rotateRight()
  //   }

  //   if (this.shape.includes('O')) return new TetrominoArika(this.toString())

  //   return new TetrominoArika(super.rotateLeft().toString())
  // }
}
