export class RotatingShape {
  shape;
  #shapeToArray
  #cleanShape
  // * filter and clean data here. make shape a 2D array, it will be easier to rotate
  constructor(shape) {
    // ! this.shape was returned with spaces because is set to the initial shape
    this.shape = shape
    this.#shapeToArray = shape.split(' ').filter(shapeBit =>
      shapeBit !== '')

    const shapeLength = this.#shapeToArray.at(-1).length
    this.#cleanShape = []

    for (let y = 0; y < shapeLength; y++) {
      this.#cleanShape[y] = []
      for (let x = 0; x < shapeLength; x++) {
        this.#cleanShape[y][x] = this.#shapeToArray[y][x]
        this.#cleanShape[y][shapeLength] = '\n'
      }
    }
  }

  toString() {
    return this.#cleanShape.flat(1).join().replaceAll(',', '')
  }

  rotateRight() {
    let result = []
    const shapeLength = this.#shapeToArray.at(-1).length

    for (let y = 0; y < shapeLength; y++) {
      result[y] = []
      for (let x = 0; x < shapeLength; x++) {
        result[y][x] = this.#cleanShape[shapeLength - x - 1][y]
        result[y][shapeLength] = '\n'
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
