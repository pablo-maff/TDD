interface IRotatingShape {
  toString(): string;
  rotateRight(): RotatingShape;
  rotateLeft(): RotatingShape;
}

export class RotatingShape implements IRotatingShape {
  #shape; // 2D array representing the shape.

  // Initializes a new shape with the given 2D array.
  constructor(shape: string[][]) {
    this.#shape = shape;
  }

  // Creates a RotatingShape instance from a string representation.
  static fromString(shape: string): RotatingShape {
    return new RotatingShape(
      shape
        .replaceAll(" ", "") // Removes spaces for compact representation.
        .split("\n") // Splits into rows.
        .map((row) => row.split("")) // Splits each row into columns.
    );
  }

  // Returns a string representation of the shape.
  toString(): string {
    let boardString = "";
    for (let row = 0; row < this.#shape.length; row++) {
      for (let col = 0; col < this.#shape[row].length; col++) {
        boardString += this.#shape[row][col];
      }
      boardString += "\n";
    }
    return boardString;
  }

  // Rotates the shape 90 degrees to the right (clockwise).
  rotateRight(): RotatingShape {
    // Generates a new shape array for the rotated shape.
    const rotatedShape = this.#shape.map((row, i) => row.map((_, j) => this.#shape[this.#shape.length - 1 - j][i]));
    return new RotatingShape(rotatedShape);
  }

  // Rotates the shape 90 degrees to the left (counterclockwise).
  rotateLeft(): RotatingShape {
    // Utilizes rotateRight three times to achieve a left rotation.
    return new RotatingShape(this.#shape).rotateRight().rotateRight().rotateRight();
  }

  width() {
    return this.#shape[0].length;
  }

  height() {
    return this.#shape.length;
  }

  blockAt(row: number, col: number) {
    return this.#shape[row][col];
  }
}
