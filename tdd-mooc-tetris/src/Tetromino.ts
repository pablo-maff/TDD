import { RotatingShape } from "./RotatingShape";
import { Shape } from "./shapes";

export class Tetromino implements Shape {
  static T_SHAPE = new Tetromino(
    0,
    4,
    `.T.
     TTT
     ...`
  );

  static I_SHAPE = new Tetromino(
    0,
    2,
    `.....
     .....
     IIII.
     .....
     .....`
  );

  static O_SHAPE = new Tetromino(
    0,
    1,
    `.OO
     .OO
     ...`
  );

  #currentOrientation: number;
  #orientations: RotatingShape[];

  constructor(currentOrientation: number, orientations: RotatingShape[]);
  constructor(currentOrientation: number, orientations: number, initialShape: string);
  constructor(currentOrientation: number, orientations: number | RotatingShape[], initialShape?: string) {
    if (typeof orientations === "number") {
      if (!initialShape) throw new Error("missing initial shape");

      this.#currentOrientation = currentOrientation;
      const shape = new RotatingShape(initialShape);
      this.#orientations = [
        shape,
        shape.rotateRight(),
        shape.rotateRight().rotateRight(),
        shape.rotateRight().rotateRight().rotateRight(),
      ].slice(0, orientations);

      return;
    }

    // * Runs when orientations is RotatingShape[]
    this.#currentOrientation = (currentOrientation + orientations.length) % orientations.length;
    this.#orientations = orientations;
  }

  rotateRight(): Tetromino {
    return new Tetromino(this.#currentOrientation + 1, this.#orientations);
  }

  rotateLeft(): Tetromino {
    return new Tetromino(this.#currentOrientation - 1, this.#orientations);
  }

  #shape(): RotatingShape {
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
