export class RotatingShape2 {
  shape;
  #shapeToArray;
  blockType;
  #shapeWidth;
  #tempCoordinates = [];
  #coordinates = [];

  constructor(shape, blockType) {
    this.shape = shape

    this.blockType = blockType

    this.#shapeToArray = this.shape.split("\n").map(block => block.trim());

    this.#shapeWidth = 4

    for (let row = 0; row < this.#shapeWidth; row++) {
      for (let col = 0; col < this.#shapeWidth; col++) {
        if (this.#shapeToArray[row][col] !== ".") {
          this.#tempCoordinates = [...this.#tempCoordinates, { row, column: col }]
        }
      }
    }

    // console.log("this.#tempCoordinates", this.#tempCoordinates);
    this.#setCoordinates(this.#tempCoordinates)
    // this.mapToBoardCoordinates(boardRowAxis, boardColAxis)
  }

  #setCoordinates(newCoordinates) {
    this.#tempCoordinates = []
    this.#coordinates = newCoordinates
    console.log("this.#coordinates", this.#coordinates);
  }

  //! TODO NEXT: Find a way to get rid of this method. The coordinates should be always the board coordinates now that there is no need for keeping track of internal block cooridnates
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
    return this.blockType
  }
}
