export class RotatingShape {
  shape;
  #shapeToArray;
  #cleanShape;
  #shapeLength
  // * filter and clean data here. make shape a 2D array, it will be easier to rotate
  constructor(shape) {
    this.shape = shape
    this.#shapeToArray = this.shape.split(' ').filter(shapeBit =>
      shapeBit !== '')

    this.#shapeLength = this.#shapeToArray.at(-1).length
    this.#cleanShape = []

    for (let y = 0; y < this.#shapeLength; y++) {
      this.#cleanShape[y] = []
      for (let x = 0; x < this.#shapeLength; x++) {
        this.#cleanShape[y][x] = this.#shapeToArray[y][x]
        this.#cleanShape[y][this.#shapeLength] = '\n'
      }
    }
  }

  toString() {
    return this.#cleanShape.flat(1).join().replaceAll(',', '')
  }

  rotateRight() {
    let result = []

    for (let y = 0; y < this.#shapeLength; y++) {
      result[y] = []
      for (let x = 0; x < this.#shapeLength; x++) {
        result[y][x] = this.#cleanShape[this.#shapeLength - x - 1][y]
        result[y][this.#shapeLength] = '\n'
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
