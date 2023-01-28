import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino extends RotatingShape {
  #piece

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

  static T_SHAPE = new Tetromino(this.#T_SHAPE)
  static I_SHAPE = new Tetromino(this.#I_SHAPE)

  // * Overrides
  #rotationCounter = 0

  rotateRight() {
    if (this.shape.includes('I')) {
      if (this.#rotationCounter > 1) {
        return this
      }
    }

    this.#rotationCounter += 1
    return super.rotateRight()
  }

  rotateLeft() {
    if (this.shape.includes('I')) return this

    return super.rotateLeft()
  }

}