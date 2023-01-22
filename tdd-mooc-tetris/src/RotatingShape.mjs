export class RotatingShape {
  shape;

  constructor(shape) {
    this.shape = shape
  }
  #rotate = 0;

  toString() {
    if (!this.#rotate) return this.shape.replaceAll(' ', '') + '\n'

    const shapeWidthAndHeight = Math.sqrt(this.shape.replaceAll(' ', '').replaceAll('\n', '').length);
    const shapeToArray = this.shape.split('').filter(shapeBit => shapeBit !== ' ' && shapeBit !== '\n')

    let rotatedRight = []

    const getColumnX = (shape, colNum) => {
      let colX = []
      // * Need to get a column of the length of shapeWidthAndHeight
      for (let i = 0; i < shapeWidthAndHeight; i++) {
        colX.push(shape[shapeWidthAndHeight * i + colNum])
        colX.flat(1)
      }
      return colX.reverse()
    }

    // ! Awful, but it works! It is time to clean it up!
    while (this.#rotate) {
      if (!rotatedRight.length) {
        if (this.#rotate === 1) {
          const firstCol = getColumnX(shapeToArray, 0) + '\n'
          const secondCol = getColumnX(shapeToArray, 1) + '\n'
          const thirdCol = getColumnX(shapeToArray, 2) + '\n'
          rotatedRight = [firstCol, secondCol, thirdCol].flat(1)
          if (shapeWidthAndHeight === 5) {
            const fourthCol = getColumnX(shapeToArray, 3) + '\n'
            const fifthCol = getColumnX(shapeToArray, 4) + '\n'
            rotatedRight = [...rotatedRight, fourthCol, fifthCol].flat(1)
          }
        }
        else {
          const firstCol = getColumnX(shapeToArray, 0)
          const secondCol = getColumnX(shapeToArray, 1)
          const thirdCol = getColumnX(shapeToArray, 2)
          rotatedRight = [firstCol, secondCol, thirdCol].flat(1)
          if (shapeWidthAndHeight === 5) {
            const fourthCol = getColumnX(shapeToArray, 3)
            const fifthCol = getColumnX(shapeToArray, 4)
            rotatedRight = [...rotatedRight, fourthCol, fifthCol].flat(1)

          }
        }
      }
      else {
        if (this.#rotate === 1) {
          let tempResult = []
          const firstCol = getColumnX(rotatedRight, 0) + '\n'
          const secondCol = getColumnX(rotatedRight, 1) + '\n'
          const thirdCol = getColumnX(rotatedRight, 2) + '\n'
          tempResult = [firstCol, secondCol, thirdCol].flat(1)
          if (shapeWidthAndHeight === 5) {
            const fourthCol = getColumnX(rotatedRight, 3) + '\n'
            const fifthCol = getColumnX(rotatedRight, 4) + '\n'
            rotatedRight = [...tempResult, fourthCol, fifthCol].flat(1)
          }
          else {
            rotatedRight = [firstCol, secondCol, thirdCol].flat(1)
          }
        } else {
          let tempResult = []
          const firstCol = getColumnX(rotatedRight, 0)
          const secondCol = getColumnX(rotatedRight, 1)
          const thirdCol = getColumnX(rotatedRight, 2)
          tempResult = [firstCol, secondCol, thirdCol].flat(1)
          if (shapeWidthAndHeight === 5) {
            const fourthCol = getColumnX(rotatedRight, 3)
            const fifthCol = getColumnX(rotatedRight, 4)
            rotatedRight = [...tempResult, fourthCol, fifthCol].flat(1)
          }
          else {
            rotatedRight = [firstCol, secondCol, thirdCol].flat(1)
          }
        }
      }
      --this.#rotate
    }
    return rotatedRight.join().replaceAll(',', '')
  }

  rotateRight() {
    this.#rotate += 1

    return this
  }

  rotateLeft() {
    this.#rotate += 3

    return this
  }
}
