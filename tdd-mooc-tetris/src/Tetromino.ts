import { RotatingShape } from "./RotatingShape";

interface ITetromino {
  toString(): string;
  rotateRight(): Tetromino;
  rotateLeft(): Tetromino;
}

export class Tetromino implements ITetromino {
  // Static fields representing the string shapes of Tetrominos.
  static #T_SHAPE = `.T.
                     TTT
                     ...`;

  static #I_SHAPE = `.....
                     .....
                     IIII.
                     .....
                     .....`;

  static #O_SHAPE = `.OO
                     .OO
                     ...`;

  // Public static instances of Tetrominos, pre-constructed for easy access.
  static T_SHAPE: Tetromino = Tetromino.fromString(4, this.#T_SHAPE);
  static I_SHAPE: Tetromino = Tetromino.fromString(2, this.#I_SHAPE);
  static O_SHAPE: Tetromino = Tetromino.fromString(1, this.#O_SHAPE);

  // Factory method to create a Tetromino from a string representation.
  static fromString(rotations: number, shape: string): Tetromino {
    // Converts the string shape into a RotatingShape and generates all its orientations.
    const rotatingTetromino = RotatingShape.fromString(shape);

    const orientations = [
      rotatingTetromino,
      rotatingTetromino.rotateRight(),
      rotatingTetromino.rotateRight().rotateRight(),
      rotatingTetromino.rotateRight().rotateRight().rotateRight(),
    ].slice(0, rotations); // Limits the orientations to the specified number of rotations.

    return new Tetromino(0, orientations); // Initializes the Tetromino with the first orientation.
  }

  // Fields to track the Tetromino's current orientation and its shapes.
  #orientationIndex: number;
  #orientations: RotatingShape[];

  // Constructor to create a Tetromino with specified orientationIndex and its different orientations.
  constructor(currentOrientationIndex: number, orientations: RotatingShape[]) {
    this.#orientationIndex = (currentOrientationIndex + orientations.length) % orientations.length; // Ensures the orientation is within bounds.
    this.#orientations = orientations; // Stores the possible orientations.
  }

  // Returns a string representation of the Tetromino's current orientation.
  toString(): string {
    return this.#orientations[this.#orientationIndex].toString();
  }

  // Returns a new Tetromino instance rotated to the right (clockwise).
  rotateRight(): Tetromino {
    return new Tetromino(this.#orientationIndex + 1, this.#orientations);
  }

  // Returns a new Tetromino instance rotated to the left (counterclockwise).
  rotateLeft(): Tetromino {
    return new Tetromino(this.#orientationIndex - 1, this.#orientations);
  }
}
