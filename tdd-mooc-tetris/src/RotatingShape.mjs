export class RotatingShape {
  shape;
  #shapeToArray;
  #cleanShape;
  #shapeWidth;
  #coordinates = [];

  // * filter and clean data here. make shape a 2D array, it will be easier to rotate
  constructor(shape) {
    this.shape = shape
    this.#shapeToArray = this.shape.split(' ').filter(shapeBit =>
      shapeBit !== '')

    this.#shapeToArray = this.shape.replaceAll(' ', '').split('\n')

    this.#shapeWidth = this.#shapeToArray.length

    this.#cleanShape = []

    for (let row = 0; row < this.#shapeWidth; row++) {
      this.#cleanShape[row] = []
      for (let col = 0; col < this.#shapeWidth; col++) {
        this.#cleanShape[row][col] = this.#shapeToArray[row][col]
        if (this.#shapeToArray[row][col] !== ".") {
          this.setCoordinates(row, col)
        }
      }
    }
  }

  // TODO: Get rid of this method
  trimEnd() {
    this.#cleanShape = [this.#cleanShape[0], this.#cleanShape[1]]
  }

  toString() {
    let result = ''

    for (let row = 0; row < this.#shapeWidth; row++) {
      for (let col = 0; col < this.#shapeWidth; col++) {
        // TODO: Get rid of this conditional (needed because of trimEnd)
        if (this.#cleanShape[row]) {
          result += this.#cleanShape[row][col]
        }
      }
      result += '\n'
    }

    return result
  }

  rotateRight() {
    let result = []

    for (let y = 0; y < this.#shapeWidth; y++) {
      result[y] = []
      for (let x = 0; x < this.#shapeWidth; x++) {
        result[y][x] = this.#cleanShape[this.#shapeWidth - x - 1][y]
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

  getCoordinates() {
    return this.#coordinates
  }

  setCoordinates(row, col) {
    return this.#coordinates = [...this.#coordinates, { row, column: col }]
  }

  getShape() {
    // TODO: Pass cleanShape instead, need to fix Board to work without trimming the clean shape first
    return this.toString()
  }

  getLength() {
    return this.#shapeWidth
  }
}
