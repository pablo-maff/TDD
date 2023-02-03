export class Block {
  color;

  constructor(color) {
    this.color = color;
  }

  getShape() {
    return this.color
  }

  getLength() {
    return 0
  }
}
