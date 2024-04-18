import { Shape, shapeToString } from "./shapes";

export class RotatingShape2 implements Shape {
  #shape: string[][];
  #width: number;

  constructor(width: number, shape: string) {
    this.#width = width;
    this.#shape = shape
      .replaceAll(" ", "")
      .trim()
      .split("\n")
      .map((row) => row.split(""));
  }

  width(): number {
    return this.#width;
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
