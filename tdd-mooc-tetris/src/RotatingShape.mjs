export class RotatingShape {
  shape;
  #shapeToArray;
  cleanShape;
  #shapeWidth;
  #tempCoordinates = [];
  #coordinates = [];

  constructor(shape) {
    this.shape = shape
    // TODO: Should simplify what's going on in the constructor at some point

    this.#shapeToArray = this.shape.replaceAll(' ', '').split('\n').filter(value => value.trim() !== '');

    this.#shapeWidth = this.#shapeToArray.length

    this.cleanShape = []

    for (let row = 0; row < this.#shapeWidth; row++) {
      this.cleanShape[row] = []
      for (let col = 0; col < this.#shapeWidth; col++) {
        this.cleanShape[row][col] = this.#shapeToArray[row][col]
        if (this.#shapeToArray[row][col] !== ".") {
          this.#tempCoordinates = [...this.#tempCoordinates, { row, column: col }]
        }
      }
    }
    this.#setCoordinates(this.#tempCoordinates)
  }


  toString() {
    let result = ''

    for (let row = 0; row < this.#shapeWidth; row++) {
      for (let col = 0; col < this.#shapeWidth; col++) {
        if (this.cleanShape[row] && this.cleanShape[row][col] !== undefined) {
          result += this.cleanShape[row][col]
        }
      }

      const lastChar = result.slice(-1);
      const isNewLine = /\r|\n/.test(lastChar);

      if (!isNewLine) {
        result += '\n'
      }
    }

    return result
  }

  rotateRight() {
    let result = []
    this.#tempCoordinates = [];

    for (let row = 0; row < this.#shapeWidth; row++) {
      result[row] = []
      for (let col = 0; col < this.#shapeWidth; col++) {
        result[row][col] = this.cleanShape[this.#shapeWidth - col - 1][row]
        if (result[row][col] !== ".") {
          this.#tempCoordinates = [...this.#tempCoordinates, { row, column: col }]
        }
      }
    }
    this.#setCoordinates(this.#tempCoordinates)

    return new RotatingShape(result.join('\n').replaceAll(',', ''))
  }

  rotateLeft() {
    let result = []
    this.#tempCoordinates = []

    for (let row = 0; row < this.#shapeWidth; row++) {
      result[row] = []
      for (let col = 0; col < this.#shapeWidth; col++) {
        result[row][col] = this.cleanShape[col][this.#shapeWidth - row - 1]
        if (result[row][col] !== ".") {
          this.#tempCoordinates = [...this.#tempCoordinates, { row, column: col }]
        }
      }
    }
    this.#setCoordinates(this.#tempCoordinates)

    return new RotatingShape(result.join('\n').replaceAll(',', ''))
  }

  #setCoordinates(newCoordinates) {
    this.#tempCoordinates = []
    this.#coordinates = newCoordinates
  }

  mapToBoardCoordinates(boardRowAxis, boardColAxis) {
    // TODO: Will need a declarative solution here at some point
    const boardColumnInitialPosition = this.#coordinates[0].column === 0 ? 1 : this.#coordinates[0].column
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
    const { row, column } = this.#coordinates[0]
    return this.cleanShape[row][column]
  }
}
