export class Board {
  #width;
  #height;
  #currentBlockMiddleColOnBoard

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
    this.board = this.#createEmptyBoard();
    this.#currentBlockMiddleColOnBoard = Math.round((this.#width / 2) - 1)
  }

  #boardSquare = '.';
  #blockCurrentTopRow = 0;
  #blocksOnBoard = [];

  #createEmptyBoard() {
    let emptyBoard = []

    for (let row = 0; row < this.#height; row++) {
      emptyBoard[row] = []
      for (let col = 0; col < this.#width; col++) {
        emptyBoard[row][col] = this.#boardSquare;
      }
    }
    return emptyBoard
  }

  toString() {
    let result = ''

    const currentBlock = this.#getBlockCurrentPosition(this.#blockCurrentTopRow, this.#currentBlockMiddleColOnBoard)

    for (let row = 0; row < this.#height; row++) {
      for (let col = 0; col < this.#width; col++) {
        const currentBlockInBoard = currentBlock && currentBlock.find(block => block.row === row && block.column === col)
        if (currentBlockInBoard) {
          result += this.block.getShape();
        }
        else {
          result += this.board[row][col];
        }
      }
      result += '\n';
    }

    return result
  }

  drop(block) {
    if (this.hasFalling()) {
      throw new Error("already falling")
    }
    this.#blockCurrentTopRow = 0
    this.#currentBlockMiddleColOnBoard = Math.round((this.#width / 2) - 1)
    this.block = block;
  }

  tick() {
    if (!this.hasFalling()) return

    if (this.#isEmptyBoardSquare(this.#blockCurrentTopRow + 1, this.#currentBlockMiddleColOnBoard)) {
      this.#blockCurrentTopRow += 1
      return
    }

    this.#stopBlockMovement(this.#blockCurrentTopRow, this.#currentBlockMiddleColOnBoard)
  }

  hasFalling() {
    return !!this.block
  }

  #getBlockCurrentPosition(row, col) {
    if (!this.hasFalling()) return null

    const currentPosition = this.block.mapToBoardCoordinates(row, col)

    return currentPosition
  }

  #stopBlockMovement(row, col) {
    const currentBlockPosition = this.#getBlockCurrentPosition(row, col)

    let result = []

    for (let row = 0; row < this.#height; row++) {
      result[row] = []
      for (let col = 0; col < this.#width; col++) {
        const currentBlockInBoard = currentBlockPosition?.find(block => block.row === row && block.column === col)

        if (currentBlockInBoard) {
          result[row][col] = this.block.getShape();
        }
        else {
          result[row][col] = this.board[row][col];
        }
      }
    }

    this.board = result

    this.#blocksOnBoard = [...this.#blocksOnBoard, ...currentBlockPosition]

    this.block = null
  }

  #isEmptyBoardSquare(row, col, rotatedBlockCoordinates) {
    const nextBlockPosition = !rotatedBlockCoordinates ? this.#getBlockCurrentPosition(row, col) : rotatedBlockCoordinates

    const isEmpty = nextBlockPosition.reduce((isEmpty, nextPosition) => {
      if (nextPosition.row < 0 || nextPosition.column < 0) {
        isEmpty = false
        return
      }
      if (nextPosition.row >= this.#height || nextPosition.column >= this.#width) {
        isEmpty = false
        return
      }

      const blocksCollisions = this.#blocksOnBoard.some(blockPosition => {
        return nextPosition.row === blockPosition.row && nextPosition.column === blockPosition.column;
      })

      if (blocksCollisions) {
        isEmpty = false
      }

      return isEmpty
    }, true)

    return isEmpty
  }

  // * User Controls
  moveBlockLeft() {
    if (!this.hasFalling()) return

    if (this.#isEmptyBoardSquare(this.#blockCurrentTopRow, this.#currentBlockMiddleColOnBoard - 1)) {
      this.#currentBlockMiddleColOnBoard -= 1
    }
  }

  moveBlockRight() {
    if (!this.hasFalling()) return

    if (this.#isEmptyBoardSquare(this.#blockCurrentTopRow, this.#currentBlockMiddleColOnBoard + 1)) {
      this.#currentBlockMiddleColOnBoard += 1
    }
  }

  moveBlockDown() {
    this.tick()
  }

  rotateRight() {
    const tempRotatedBlockCoordinates = this.block.rotateRight().mapToBoardCoordinates(this.#blockCurrentTopRow, this.#currentBlockMiddleColOnBoard)

    const canWallKick = this.#canWallKick(tempRotatedBlockCoordinates)

    const tempTopRow = Math.min(...tempRotatedBlockCoordinates.map(item => item.row));

    if (canWallKick) {
      this.#currentBlockMiddleColOnBoard += canWallKick
      this.block = this.block.rotateRight()
      this.#blockCurrentTopRow = tempTopRow
      return
    }

    if (this.#isEmptyBoardSquare(tempTopRow, this.#currentBlockMiddleColOnBoard, tempRotatedBlockCoordinates)) {
      this.block = this.block.rotateRight()
      this.#blockCurrentTopRow = tempTopRow
    }

    return
  }

  rotateLeft() {
    const tempRotatedBlockCoordinates = this.block.rotateLeft().mapToBoardCoordinates(this.#blockCurrentTopRow, this.#currentBlockMiddleColOnBoard)

    const canWallKick = this.#canWallKick(tempRotatedBlockCoordinates)

    const tempTopRow = Math.min(...tempRotatedBlockCoordinates.map(item => item.row));

    console.log("canWallKick", canWallKick);
    if (canWallKick) {
      console.log("currentBlockMiddleColOnBoard", this.#currentBlockMiddleColOnBoard);
      this.#currentBlockMiddleColOnBoard += canWallKick
      this.block = this.block.rotateLeft()
      this.#blockCurrentTopRow = tempTopRow
      return
    }

    if (this.#isEmptyBoardSquare(tempTopRow, this.#currentBlockMiddleColOnBoard, tempRotatedBlockCoordinates)) {
      this.block = this.block.rotateLeft()
      this.#blockCurrentTopRow = tempTopRow
    }

    return
  }

  #canWallKick(rotatedBlockCoordinates) {
    function getLeftOrRightColumnOffset(column1, column2) {
      return column1 < column2 ? 1 : -1
    }

    const boardMiddleCol = Math.round((this.#width / 2) - 1)

    const isAgainstTheWall = rotatedBlockCoordinates.some(coordinate =>
      coordinate.column < 0 || coordinate.column > this.#width - 1)

    const isAgainstBlock = this.#blocksOnBoard.find(blockOnBoardPosition =>
      rotatedBlockCoordinates.some(rotatedBlockPosition =>
        blockOnBoardPosition.row === rotatedBlockPosition.row &&
        blockOnBoardPosition.column === rotatedBlockPosition.column))

    if (!isAgainstTheWall && !isAgainstBlock) return false

    const leftOrRightColumnOffset = isAgainstTheWall
      ? getLeftOrRightColumnOffset(this.#currentBlockMiddleColOnBoard, boardMiddleCol)
      : getLeftOrRightColumnOffset(isAgainstBlock.column, this.#currentBlockMiddleColOnBoard)

    const nextBlockPositionIsEmpty = this.#isEmptyBoardSquare(rotatedBlockCoordinates.row, rotatedBlockCoordinates.col + leftOrRightColumnOffset)

    if (!nextBlockPositionIsEmpty) return false

    return leftOrRightColumnOffset
  }
}

