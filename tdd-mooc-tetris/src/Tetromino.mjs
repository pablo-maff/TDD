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

  constructor(shape) {
    super(shape);
    this.#rotationCounter = 0;
  }

  // * Overrides
  #rotationCounter;

  // ! TODO NEXT: Proper implementation to check orientations
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
    if (this.shape.includes('I')) return super.rotateRight()

    if (this.shape.includes('O')) return this

    return super.rotateLeft()
  }
}

Tetromino.T_SHAPE = Tetromino.getTShape();
Tetromino.I_SHAPE = Tetromino.getIShape();
Tetromino.O_SHAPE = Tetromino.getOShape();