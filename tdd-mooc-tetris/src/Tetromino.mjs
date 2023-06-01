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

  static getTShape() {
    return new Tetromino(Tetromino.#T_SHAPE);
  }

  static getIShape() {
    return new Tetromino(Tetromino.#I_SHAPE);
  }

  static getOShape() {
    return new Tetromino(Tetromino.#O_SHAPE);
  }

  constructor(shape, rotationCounter = 0) {
    super(shape);
    this.#rotationCounter = rotationCounter;
  }

  // * Overrides
  #rotationCounter;

  rotateRight() {
    if (this.shape.includes('O')) return new Tetromino(this.toString())
    if (this.shape.includes('I')) {
      if (this.#rotationCounter === 0) {
        return new Tetromino(super.rotateRight().toString(), this.#rotationCounter + 1)
      }
      else {
        return new Tetromino(super.rotateLeft().toString(), this.#rotationCounter - 1)
      }
    }

    return new Tetromino(super.rotateRight().toString(), this.#rotationCounter + 1)
  }

  rotateLeft() {
    if (this.shape.includes('I')) {

      return this.rotateRight()
    }

    if (this.shape.includes('O')) return new Tetromino(this.toString())

    return new Tetromino(super.rotateLeft().toString())
  }
}

// ! These 3 are being called always
Tetromino.T_SHAPE = Tetromino.getTShape();
Tetromino.I_SHAPE = Tetromino.getIShape();
Tetromino.O_SHAPE = Tetromino.getOShape();