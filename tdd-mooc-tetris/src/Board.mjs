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
  #boardCurrentTopRow = 0;
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

    const blocksInPlace = this.#blocksOnBoard
    const currentBlock = this.getBlockCurrentPosition(this.#boardCurrentTopRow, this.#boardMiddleCol)

    for (let row = 0; row < this.#height; row++) {
      for (let col = 0; col < this.#width; col++) {
        const currentBlockInBoard = currentBlock?.find(block => block.row === row && block.column === col)
        const allBlocksInBoard = blocksInPlace?.find(block => block.row === row && block.column === col)

        if (this.block && (currentBlockInBoard || allBlocksInBoard)) {
          result += this.block.getShape2();
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
    if (this.hasFalling()) throw new Error("already falling")

    this.block = block;
  }

  tick() {
    if (this.#isEmptyBoardSquare(this.#boardCurrentTopRow + 1, this.#boardMiddleCol)) {
      this.#moveBlock()
    }

    else if (this.hasFalling()) {
      this.#stopBlockMovement(this.#boardCurrentTopRow, this.#boardMiddleCol)
    }
  }

  hasFalling() {
    return !!this.block
  }

  #moveBlock() {
    this.#setBlockCurrentPosition()
  };

  getBlockCurrentPosition(row, col) {
    if (!this.hasFalling()) return null

    const currentPosition = this.block.mapToBoardCoordinates(row, col)

    return currentPosition
  }

  #setBlockCurrentPosition() {
    this.#boardCurrentTopRow += 1
  };

  #stopBlockMovement(row, col) {
    const currentBlockPosition = this.getBlockCurrentPosition(row, col)

    this.#blocksOnBoard = [...this.#blocksOnBoard, ...currentBlockPosition]

    let result = []

    const blocksInPlace = this.#blocksOnBoard
    const currentBlock = this.getBlockCurrentPosition(this.#boardCurrentTopRow, this.#boardMiddleCol)

    for (let row = 0; row < this.#height; row++) {
      result[row] = []
      for (let col = 0; col < this.#width; col++) {
        const currentBlockInBoard = currentBlock?.find(block => block.row === row && block.column === col)
        const allBlocksInBoard = blocksInPlace?.find(block => block.row === row && block.column === col)

        if (currentBlockInBoard || allBlocksInBoard) {
          result[row][col] = this.block.getShape2();
        }
        else {
          result[row][col] = this.board[row][col];
        }
      }
    }

    this.board = result

    this.#boardCurrentTopRow = 0

    this.block = null
  }

  #isEmptyBoardSquare(row, col) {
    if (!this.hasFalling()) return false
    const nextBlockPosition = this.getBlockCurrentPosition(row, col)

    const willColide = nextBlockPosition.reduce((collision, nextPosition) => {
      if (nextPosition.row >= this.#height || nextPosition.column >= this.#width) {
        collision = true
        return collision
      }
      this.#blocksOnBoard.forEach(blockPosition => {
        if (nextPosition.row === blockPosition.row && nextPosition.column === blockPosition.column) {
          collision = true
        }
      })
      return collision
    }, false)

    if (willColide) return false

    return true
  }
}
