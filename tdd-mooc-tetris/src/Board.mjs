export class Board {
  #width;
  #height;
  #boardMiddleCol

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
    this.board = this.#createEmptyBoard();
    this.#boardMiddleCol = Math.round((this.#width / 2) - 1)
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

    const currentBlock = this.#getBlockCurrentPosition(this.#blockCurrentTopRow, this.#boardMiddleCol)

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
    this.#boardMiddleCol = Math.round((this.#width / 2) - 1)
    this.block = block;
  }

  tick() {
    if (!this.hasFalling()) return

    if (this.#isEmptyBoardSquare(this.#blockCurrentTopRow + 1, this.#boardMiddleCol)) {
      this.#blockCurrentTopRow += 1
      return
    }

    this.#stopBlockMovement(this.#blockCurrentTopRow, this.#boardMiddleCol)
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

    if (this.#isEmptyBoardSquare(this.#blockCurrentTopRow, this.#boardMiddleCol - 1)) {
      this.#boardMiddleCol -= 1
    }
  }

  moveBlockRight() {
    if (!this.hasFalling()) return

    if (this.#isEmptyBoardSquare(this.#blockCurrentTopRow, this.#boardMiddleCol + 1)) {
      this.#boardMiddleCol += 1
    }
  }

  moveBlockDown() {
    this.tick()
  }

  rotateRight() {
    const tempRotatedBlockCoordinates = this.block.rotateRight().mapToBoardCoordinates(this.#blockCurrentTopRow, this.#boardMiddleCol)

    const canWallKick = this.#canWallKick(this.#blockCurrentTopRow, this.#boardMiddleCol, tempRotatedBlockCoordinates)

    const tempTopRow = Math.min(...tempRotatedBlockCoordinates.map(item => item.row));

    console.log("canWallKick", canWallKick);

    if (canWallKick) {
      console.log("this.#boardMiddleCol", this.#boardMiddleCol);
      this.#boardMiddleCol += 1
      this.block = this.block.rotateRight()
      this.#blockCurrentTopRow = tempTopRow
      return
    }

    if (this.#isEmptyBoardSquare(tempTopRow, this.#boardMiddleCol, tempRotatedBlockCoordinates)) {
      this.block = this.block.rotateRight()
      this.#blockCurrentTopRow = tempTopRow
    }

    return
  }

  rotateLeft() {
    const tempRotatedBlockCoordinates = this.block.rotateLeft().mapToBoardCoordinates(this.#blockCurrentTopRow, this.#boardMiddleCol)

    const tempTopRow = Math.min(...tempRotatedBlockCoordinates.map(item => item.row));

    if (this.#isEmptyBoardSquare(tempTopRow, this.#boardMiddleCol, tempRotatedBlockCoordinates)) {
      this.block = this.block.rotateLeft()
      this.#blockCurrentTopRow = tempTopRow
    }

    return
  }

  #canWallKick(row, col, rotatedBlockCoordinates) {
    // console.log("rotatedBlockCoordinates", rotatedBlockCoordinates);
    const currentPosition = this.#getBlockCurrentPosition(row, col)
    // console.log("currentPosition", currentPosition);

    const isAgainstTheWall = rotatedBlockCoordinates.some(coordinate =>
      coordinate.column < 0 || coordinate.column > this.#width - 1)

    // const isAgainstBlock = this.#blocksOnBoard.some(blockPosition =>
    //   nextPosition.row === blockPosition.row && nextPosition.column === blockPosition.column)

    console.log("isAgainstTheWall", isAgainstTheWall);
    console.log("col", col);
    console.log("emptyDestination", this.#isEmptyBoardSquare(row, col + 1));

    // ! Only works for left side of wall
    if (isAgainstTheWall && this.#isEmptyBoardSquare(row, col + 1)) {
      return true
    }
    return false
  }
}

