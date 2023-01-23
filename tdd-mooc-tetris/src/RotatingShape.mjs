export class RotatingShape {
  shape;

  constructor(shape) {
    this.shape = shape
  }
  #rotate = 0;

  toString() {
    if (!this.#rotate) return this.shape.replaceAll(' ', '') + '\n'

    return this.rotateShape().join().replaceAll(',', '')
  }

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

  rotateRight() {
    this.#rotate = 1

    return this
  }

  rotateLeft() {
    this.#rotate = 3

    return this
  }
}
