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

  // toString() {
  //   return super.toString()
  // }

  // rotateLeft() {
  //   return super.rotateLeft()
  // }

}