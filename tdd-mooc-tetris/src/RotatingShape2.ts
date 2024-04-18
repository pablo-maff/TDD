import { EmptyBlock, Shape, shapeToString } from "./shapes";

export class RotatingShape2 implements Shape {
  #shape: string[][];

  constructor(shape: string) {
    this.#shape = shape
      .replaceAll(" ", "")
      .trim()
      .split("\n")
      .map((row) => row.split(""));
  }

  width(): number {
    const width = this.#shape.reduce((width, row, i) => {
      const color = row.find((block) => block !== EmptyBlock);

      if (!color) {
        return width;
      }

      const rowWidth = row.lastIndexOf(color) + 1;

      if (rowWidth > width) {
        return rowWidth;
      }

      return width;
    }, 0);

    return width;
  }

  height(): number {
    return this.#shape.length;
  }

  blockAt(row: number, col: number): string {
    return this.#shape[row][col];
  }

  toString(): string {
    return shapeToString(this);
  }

  rotateRight(): RotatingShape2 {
    return this;
  }

  rotateLeft(): RotatingShape2 {
    return this;
  }
}
