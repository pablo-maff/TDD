import { Shape, shapeToString } from "./shapes";
// * Test double class
export class Block implements Shape {
  #color;

  constructor(color: string) {
    this.#color = color;
  }

  width(): number {
    return 1;
  }

  height(): number {
    return 1;
  }

  blockAt(row: number, col: number): string {
    if (row === 0 && col === 0) {
      return this.#color;
    }

    return "";
  }

  rotateRight(): Shape {
    return this;
  }

  rotateLeft(): Shape {
    return this;
  }

  toString(): string {
    return shapeToString(this);
  }
}
