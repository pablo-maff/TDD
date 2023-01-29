export class Block {
  // color;
  constructor(color) {
    this.block = {
      color: color,
      positionX: 1,
      positionY: 0,
    };
  }

  getColor() {
    return this.block.color;
  }

  getPositionY() {
    return this.block.positionY
  }

  setPositionY(newPositionY) {
    this.block.positionY = newPositionY
  }

}