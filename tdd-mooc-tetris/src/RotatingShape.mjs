export class RotatingShape {
  shape;

  // * filter and clean data here. make shape a 2D array, it will be easier to rotate
  constructor(shape) {
    this.shape = shape
    this.cleanShape = shape.split(' ').filter(shapeBit =>
      shapeBit !== '')
  }

  toString() {
    return this.cleanShape.join().replaceAll(',', '').replaceAll(' ', '') + '\n'
  }

  rotateRight() {
    this.result = []
    const shapeLength = this.cleanShape.at(-1).length

    for (let y = 0; y < shapeLength; y++) {
      this.result[y] = []
      for (let x = 0; x < shapeLength; x++) {
        this.result[y][x] = this.cleanShape[shapeLength - x - 1][y]
      }
      if (y !== shapeLength - 1) {
        this.result[y].push('\n')
      }
    }
    this.cleanShape = [...this.result]

    return this
  }

  rotateLeft() {
    const rotateShape = new RotatingShape(this.shape)
    rotateShape.rotateRight()
    rotateShape.rotateRight()
    rotateShape.rotateRight()

    return rotateShape
  }
}
