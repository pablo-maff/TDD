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
  #currentRow;
  #currentCol;
  #boardCurrentTopRow = 0;
  #blocksOnBoard = [];

  #createEmptyBoard() {
    let emptyBoard = []
    for (let row = 0; row < this.#height; row++) {
      emptyBoard[row] = []
      for (let col = 0; col < this.#width; col++) {
        emptyBoard[row][col] = this.#boardSquare;
      }
      // emptyBoard[row][this.#width] = '\n';
    }
    return emptyBoard
  }

  toString() {
    // TODO: Make it work by asking or getting the current position of the shape (not the block)

    // * Print blocksOnBoard and if there is a currentBlock, print it as well
    let result2 = ''

    const blocksInPlace = this.#blocksOnBoard
    const currentBlock = this.getBlockCurrentPosition2(this.#boardCurrentTopRow, this.#boardMiddleCol)
    console.log('#blocksOnBoard', this.#blocksOnBoard)
    // console.log('currentBlock', this.getBlockCurrentPosition2(this.#boardCurrentTopRow, this.#boardMiddleCol))

    for (let row = 0; row < this.#height; row++) {
      for (let col = 0; col < this.#width; col++) {
        const currentBlockInBoard = currentBlock?.find(block => block.row === row && block.column === col)

        // ! TODO NEXT: print in the board the blocks that stopped moving in stopBlockMovement2
        const allBlocksInBoard = blocksInPlace?.find(block => block.row === row && block.column === col)
        if (currentBlockInBoard || allBlocksInBoard) {
          result2 += this.block.getShape2();
        }
        else {
          result2 += this.board[row][col];
        }
      }
      result2 += '\n';
    }

    console.log('result2', result2);

    return result2
  }

  drop(block) {
    if (this.hasFalling()) throw new Error("already falling")
    this.block = block;

    // this.#setBlockCurrentPosition()

    // !Deprecated
    // this.#setBlockInitialPosition(this.block.getLength())
  }

  tick() {
    const { currentBlockRow, currentBlockCol } = this.#getCurrentBlockPosition()

    // TODO: new implementation of isEmptyBoardSquare

    if (this.#isEmptyBoardSquare2(this.#boardCurrentTopRow + 1, this.#boardMiddleCol)) {
      this.#moveBlock()
    }

    else if (this.hasFalling()) {
      this.#stopBlockMovement2(this.#boardCurrentTopRow, this.#boardMiddleCol)
      // this.#stopBlockMovement()
    }
  }

  hasFalling() {
    return !!this.block
  }

  #moveBlock() {
    this.#setBlockCurrentPosition()
  };

  // ? Check positions in board instead of tetrominolength
  #setBlockInitialPosition(tetrominoLength) {
    const boardMiddleCol = Math.round((this.#width / 2) - 1)
    const tetrominoOffset = Math.round(tetrominoLength / 2 - 1)
    const startingCol = tetrominoLength > 0 ? boardMiddleCol - tetrominoOffset : 1

    this.#currentRow = { start: 0, end: tetrominoLength }
    this.#currentCol = tetrominoLength > 0 ? boardMiddleCol - tetrominoOffset : 1
    this.#currentCol = {
      start: startingCol,
      end: startingCol + tetrominoLength
    }
  }

  getBlockCurrentPosition2(row, col) {
    if (!this.hasFalling()) return null

    const currentPosition = this.block.mapToBoardCoordinates(row, col)

    // console.log('currentPosition', currentPosition);

    return currentPosition
  }

  #setBlockCurrentPosition(empty) {
    // console.log('this.#boardCurrentTopRow', this.#boardCurrentTopRow);
    this.#boardCurrentTopRow = !empty ? this.#boardCurrentTopRow + 1 : null
    // this.#currentRow = !empty ? {
    //   start: this.#currentRow.start + 1,
    //   end: this.#currentRow.end + 1
    // } : null

    // this.#currentCol = !empty ? {
    //   start: this.#currentCol.start, // * For now the piece can't move to the sides
    //   end: this.#currentCol.end
    // } : null

  };

  #getCurrentBlockPosition() {
    return { currentBlockRow: this.#currentRow, currentBlockCol: this.#currentCol };
  };

  #stopBlockMovement2(row, col) {
    const currentBlockPosition = this.getBlockCurrentPosition2(row, col)

    // console.log('this.board', this.board);

    this.#blocksOnBoard = [...this.#blocksOnBoard, ...currentBlockPosition]

    // ! TODO NEXT: Fix toString

    this.block = null
  }

  // ? ask the board if there is something at coordinate x,y
  #stopBlockMovement() {
    const { currentBlockRow, currentBlockCol } = this.#getCurrentBlockPosition()
    // TODO: Make it work by asking or getting the current position of the shape (not the block)

    let result = []
    let shapeIndex = 0
    for (let row = 0; row < this.#height; row++) {
      result[row] = []
      for (let col = 0; col < this.#width; col++) {
        // ! NEXT TODO: Refactor
        if (this.block?.getShape()[shapeIndex] === '\n') shapeIndex++
        if (row >= currentBlockRow?.start && row <= currentBlockRow?.end && col >= currentBlockCol?.start && col < currentBlockCol?.end) {
          if (this.block?.getShape()[shapeIndex] !== undefined) {
            result[row][col] = this.block.getShape()[shapeIndex];
            shapeIndex++
          }
          else {
            result[row][col] = this.board[row][col];
          }
        }
        else {
          result[row][col] = this.board[row][col];
        }
      }
      result[row].push('\n');
    }

    this.board = result

    this.block = null;
  }

  #isEmptyBoardSquare2(row, col) {
    if (!this.hasFalling()) return false
    const nextBlockPosition = this.getBlockCurrentPosition2(row, col)

    const willColide = nextBlockPosition.reduce((collision, nextPosition) => {
      if (nextPosition.row >= this.#height || nextPosition.column >= this.#width) {
        collision = true
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

  #isEmptyBoardSquare(row, col) {
    // ! Only works for 3x3 blocks with T shape
    // TODO: Make it work by asking or getting the current position of the shape (not the block)
    const blockLastRow = this.block?.getShape().substring(this.block?.getShape().length - 4, this.block?.getShape().length - 1)

    if (row > this.#height) return false
    else if (this.board[row]?.includes('T') && [blockLastRow].includes('T')) {
      return false
    }
    else if (this.board[row]?.includes('T') && ![blockLastRow].includes('T')) {
      this.block?.trimEnd()
      this.#setBlockCurrentPosition()
      return false
    }
    return true
  }
}
