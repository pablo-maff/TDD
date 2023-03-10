import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino extends RotatingShape {
  static #T_SHAPE =
    `.T.
   TTT
   ...`


  static #I_SHAPE =
    `.....
   .....
   IIII.
   .....
   .....`

  static #O_SHAPE =
    `.OO
    .OO
    ...`

  static T_SHAPE = new Tetromino(this.#T_SHAPE)
  static I_SHAPE = new Tetromino(this.#I_SHAPE)
  static O_SHAPE = new Tetromino(this.#O_SHAPE)

  // ! TODO NEXT: Ask for the coordinates where the block exists or return the list of block coordinates directly. May be other alternatives
  // TODO: Write the tests for this exercise inside of a new describe block.

  // * Overrides
  #rotationCounter = 0

  rotateRight() {
    // TODO: Make a method called orientationChecker
    if (this.shape.includes('O')) return this
    if (this.shape.includes('I') && this.#rotationCounter > 1) {
      return this
    }

    this.#rotationCounter += 1
    return super.rotateRight()
  }

  rotateLeft() {
    if (this.shape.includes('I') || this.shape.includes('O')) return this

    return super.rotateLeft()
  }
}