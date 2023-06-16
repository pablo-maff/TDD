import { RotatingShape2 } from "./RotatingShape2.mjs";

export class TetrominoArika extends RotatingShape2 {
  #rotationIndex;

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

  static T_SHAPE = new TetrominoArika(TetrominoArika.#T_SHAPE);

  static I_SHAPE = new TetrominoArika(TetrominoArika.#I_SHAPE);

  static O_SHAPE = new TetrominoArika(TetrominoArika.#O_SHAPE);

  // TODO NEXT: Get rid of RotatingShape2 constructor stuff while keeping things working
  constructor(shape, rotationIndex = 0) {
    console.log("rotationIndex", rotationIndex);
    super(shape[getRotationIndex(shape, rotationIndex)]);

    this.#rotationIndex = rotationIndex
    // console.log("this.#rotationIndex", this.#rotationIndex);

    // TODO: Move it outside of the constructor and update this.rotationIndex to simplify the logic here
    function getRotationIndex(shape, rotationIndex) {
      if (rotationIndex + shape.length < 0) return 0
      if (rotationIndex < 0) {
        console.log("shape.length", shape.length);
        console.log("shape.length - rotationIndex", shape.length + rotationIndex);
        return rotationIndex + shape.length
      }
      else if (rotationIndex < shape.length) {
        return rotationIndex
      }
      return 0
    }

  }

  // * Overrides
  toString() {
    return this.shape.split("\n").map(block => block.trim()).join("\n") + "\n"
  }

  rotateRight() {
    // if (this.shape.includes('O')) return new TetrominoArika(this.toString())
    // if (this.shape.includes('I')) {
    //   return new TetrominoArika(super.rotateRight().toString(), this.#rotationCounter + 1)
    // }


    return new TetrominoArika(TetrominoArika.#T_SHAPE, this.#rotationIndex + 1)
  }

  rotateLeft() {
    // if (this.shape.includes('I')) {
    //   return this.rotateRight()
    // }

    // if (this.shape.includes('O')) return new TetrominoArika(this.toString())

    return new TetrominoArika(TetrominoArika.#T_SHAPE, this.#rotationIndex - 1)
  }
}
