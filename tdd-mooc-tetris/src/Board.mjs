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
    if (!this.hasFalling()) return

    if (this.#isEmptyBoardSquare(this.#blockCurrentTopRow + 1, this.#boardMiddleCol)) {
      this.#moveBlock()
      return
    }

    this.#stopBlockMovement(this.#blockCurrentTopRow, this.#boardMiddleCol)
  }

  hasFalling() {
    return !!this.block
  }

  #moveBlock() {
    this.#blockCurrentTopRow += 1
  };

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
          result[row][col] = this.block.getShape2();
        }
        else {
          result[row][col] = this.board[row][col];
        }
      }
    }

    this.board = result

    this.#blocksOnBoard = [...this.#blocksOnBoard, ...currentBlockPosition]

    this.#blockCurrentTopRow = 0

    this.block = null
  }

  #isEmptyBoardSquare(row, col) {
    const nextBlockPosition = this.#getBlockCurrentPosition(row, col)

    const isEmpty = nextBlockPosition.reduce((isEmpty, nextPosition) => {
      if (nextPosition.row >= this.#height || nextPosition.column >= this.#width) {
        isEmpty = false
        return isEmpty
      }
      this.#blocksOnBoard.forEach(blockPosition => {
        if (nextPosition.row === blockPosition.row && nextPosition.column === blockPosition.column) {
          isEmpty = false
        }
      })
      return isEmpty
    }, true)

    return isEmpty
  }
}
