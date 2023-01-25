import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  static #T_SHAPE =
    `.T.
    TTT
    ...`

  toString() {
    return this.T_SHAPE.toString()
  }

  static {
    this.T_SHAPE = new RotatingShape(this.#T_SHAPE)
  }

}