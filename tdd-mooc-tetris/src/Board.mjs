import { RotatingShape } from "./RotatingShape.mjs";

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

    if (this.#isEmptyBoardSquare(currentBlockRow.end, currentBlockCol.end)) {
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

  #stopBlockMovement() {
    const { currentBlockRow, currentBlockCol } = this.#getCurrentBlockPosition()

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
    const { currentBlockRow, currentBlockCol } = this.#getCurrentBlockPosition()

    // TODO: Need to check if the last row of the block is empty
    // ? Probably should refactor what block.getShape returns to be the 2d array instead of the string and make necessary changes to work like that
    // ? Probably need to check a range of rows and cols like in to string
    // * if row >= this.height return false
    // * else if last row of block is not empty and board[row + 1][col] is not empty return false
    // * if last row of block is empty and board[row + 1] !== boardsquare. Make the movement but remove last row of block and call stopBlockMovement
    // * else return true
    if (row < this.#height + 1) { // ! It works only with an empty board
      return true
      return this.board[row + 1][col] === this.#boardSquare
    }
    return false
  }
}
