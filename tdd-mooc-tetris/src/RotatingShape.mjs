export class RotatingShape {
  shape;
  #cleanShape
  // * filter and clean data here. make shape a 2D array, it will be easier to rotate
  constructor(shape) {
    this.shape = shape
    this.#cleanShape = shape.split(' ').filter(shapeBit =>
      shapeBit !== '')
  }

  toString() {
    return this.#cleanShape.join().replaceAll(',', '').replaceAll(' ', '') + '\n'
  }

  rotateRight() {
    let result = []
    const shapeLength = this.#cleanShape.at(-1).length

    for (let y = 0; y < shapeLength; y++) {
      result[y] = []
      for (let x = 0; x < shapeLength; x++) {
        result[y][x] = this.#cleanShape[shapeLength - x - 1][y]
      }
      if (y !== shapeLength - 1) {
        result[y].push('\n')
      }
    }
    this.#cleanShape = [...result]

    return this
  }

  rotateLeft() {
    const rotateShape = new RotatingShape(this.shape)
    rotateShape.rotateRight().rotateRight().rotateRight()

    return rotateShape
  }
}
