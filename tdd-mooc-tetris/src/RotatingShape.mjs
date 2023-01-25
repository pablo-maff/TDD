export class RotatingShape {
  shape;

  // * filter and clean data here. make shape a 2D array, it will be easier to rotate
  constructor(shape) {
    this.shape = shape
  }
  #rotate = 0;

  toString() {
    // * Will be a single line after implementing rotateRight and rotateLeft properly
    if (!this.#rotate) return this.shape.replaceAll(' ', '') + '\n'

    return this.rotateShape().join().replaceAll(',', '')
  }

  // ! Time to make this proper
  rotateShape = () => {
    const shape = this.shape.split('').filter(shapeBit => shapeBit !== ' ' && shapeBit !== '\n')
    const shapeWidthAndHeight = Math.sqrt(this.shape.replaceAll(' ', '').replaceAll('\n', '').length);

    let newShape = []
    let colNum = 0

    for (let y = 0; y < shapeWidthAndHeight; y++) {
      newShape[y] = []
      for (let x = 0; x < shapeWidthAndHeight; x++) {
        newShape[y].push(shape[shapeWidthAndHeight * x + colNum])
      }
      // * It would be better to separate them into two different functions
      // * rotates right
      if (this.#rotate === 1) {
        newShape[y].reverse()
      }
      newShape[y].push('\n')
      colNum++
    }
    // * rotates left
    if (this.#rotate === 3) {
      newShape.reverse()
    }
    return newShape
  }

  // * return a new rotateShape instance from this methods
  rotateRight() {
    this.#rotate = 1

    return this
  }

  rotateLeft() {
    this.#rotate = 3

    return this
  }
}
