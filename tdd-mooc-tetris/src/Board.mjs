export class Board {
  #width;
  #height;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
    this.board = this.#createEmptyBoard();
  }

  #boardSquare = '.';
  #currentRow;
  #currentCol;

  #createEmptyBoard() {
    let emptyBoard = []
    for (let row = 0; row < this.#height; row++) {
      emptyBoard[row] = []
      for (let col = 0; col < this.#width; col++) {
        emptyBoard[row][col] = this.#boardSquare;
      }
      emptyBoard[row][this.#width] = '\n';
    }
    return emptyBoard
  }

  toString() {
    // TODO: Make it work by asking or getting the current position of the shape (not the block)

    const { currentBlockRow, currentBlockCol } = this.#getCurrentBlockPosition()
    let result = ''
    let shapeIndex = 0
    for (let row = 0; row < this.#height; row++) {
      for (let col = 0; col < this.#width; col++) {
        // ! NEXT TODO: Refactor
        // console.log('start, end', currentBlockRow?.start, currentBlockRow?.end);
        if (this.block?.getShape()[shapeIndex] === '\n') shapeIndex++
        if (row >= currentBlockRow?.start && row <= currentBlockRow?.end && col >= currentBlockCol?.start && col < currentBlockCol?.end) {
          if (this.block?.getShape()[shapeIndex] !== undefined) {
            result += this.block.getShape()[shapeIndex];
            shapeIndex++
          }
          else {
            result += this.board[row][col];
          }
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

    this.#setBlockInitialPosition(this.block.getLength())
  }

  tick() {
    const { currentBlockRow, currentBlockCol } = this.#getCurrentBlockPosition()

    if (this.#isEmptyBoardSquare(currentBlockRow?.end, currentBlockCol?.end)) {
      this.#moveBlock()
    }
    else if (this.hasFalling()) {
      this.#stopBlockMovement()
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

  #setBlockCurrentPosition(empty) {
    this.#currentRow = !empty ? {
      start: this.#currentRow.start + 1,
      end: this.#currentRow.end + 1
    } : null

    this.#currentCol = !empty ? {
      start: this.#currentCol.start, // * For now the piece can't move to the sides
      end: this.#currentCol.end
    } : null

  };

  #getCurrentBlockPosition() {
    return { currentBlockRow: this.#currentRow, currentBlockCol: this.#currentCol };
  };

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
