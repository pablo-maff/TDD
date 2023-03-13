export class RotatingShape {
  shape;
  #shapeToArray;
  #cleanShape;
  #shapeWidth;
  #tempCoordinates = [];
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
          this.#tempCoordinates = [...this.#tempCoordinates, { row, column: col }]
        }
      }
    }
    this.setCoordinates(this.#tempCoordinates)

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

    for (let row = 0; row < this.#shapeWidth; row++) {
      result[row] = []
      for (let col = 0; col < this.#shapeWidth; col++) {
        result[row][col] = this.#cleanShape[this.#shapeWidth - col - 1][row]
        if (result[row][col] !== ".") {
          this.#tempCoordinates = [...this.#tempCoordinates, { row, column: col }]
        }
      }
    }
    this.setCoordinates(this.#tempCoordinates)

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

  setCoordinates(newCoordinates) {
    this.#coordinates = newCoordinates
    this.#tempCoordinates = []
  }

  mapToBoardCoordinates(boardRowAxis, boardColAxis) {
    const boardColumnInitialPosition = this.#coordinates[0].column
    const boardRowInitialPosition = this.#coordinates[0].row

    const mapBlockToBoardCoordinates = this.#coordinates.reduce((mappedCoordinates, coordinate) => {
      let mappedBoardColumn = boardColAxis;
      let mappedBoardRow = boardRowAxis

      if (coordinate.column > boardColumnInitialPosition) {
        mappedBoardColumn = boardColAxis - (boardColumnInitialPosition - coordinate.column)
      }
      else if (coordinate.column < boardColumnInitialPosition) {
        mappedBoardColumn = boardColAxis + (coordinate.column - boardColumnInitialPosition)
      }

      if (coordinate.row > boardRowInitialPosition) {
        mappedBoardRow = boardRowAxis - (boardRowInitialPosition - coordinate.row)
      }
      else if (coordinate.row < boardRowInitialPosition) {
        mappedBoardRow = boardRowAxis + (coordinate.row - boardRowInitialPosition)
      }

      return [...mappedCoordinates, { row: mappedBoardRow, column: mappedBoardColumn }]
    }, [])

    return mapBlockToBoardCoordinates
  }

  getShape() {
    // TODO: Pass cleanShape instead, need to fix Board to work without trimming the clean shape first
    return this.toString()
  }

  getShape2() {
    const { row, column } = this.getCoordinates()[0]
    return this.#cleanShape.flat()[row, column]
  }

  getLength() {
    return this.#shapeWidth
  }
}
