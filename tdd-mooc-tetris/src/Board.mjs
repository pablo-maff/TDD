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
        if (row >= currentBlockRow?.start && row <= currentBlockRow?.end && col === currentBlockCol) {
          console.log('this.block.getShape()', this.block.getShape());
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
    if (this.hasFalling()) throw new Error("already falling")
    this.block = block;

    this.#setBlockInitialPosition(this.block.getLength())
  }

  tick() {
    const { currentBlockCol, currentBlockRow } = this.#getCurrentBlockPosition()

    if (currentBlockRow.end < this.#height - 1) {
      this.#moveBlock(currentBlockRow.end, currentBlockCol)
    }
    else {
      this.#stopBlockMovement()
    }
  }

  hasFalling() {
    return !!this.block
  }

  #moveBlock(row, col) {
    if (this.#isEmptyBoardSquare(row, col)) {
      this.#setBlockCurrentPosition(col)
    }
    else {
      this.#stopBlockMovement()
    };
  };

  #setBlockInitialPosition(tetrominoLength) {
    const boardMiddleCol = Math.round((this.#width / 2) - 1)
    const tetrominoOffset = Math.round(tetrominoLength / 2 - 1)

    this.#currentRow = { start: 0, end: tetrominoLength }
    this.#currentCol = tetrominoLength > 0 ? boardMiddleCol - tetrominoOffset : 1
  }

  #setBlockCurrentPosition(col, empty) {
    this.#currentRow = !empty ? {
      start: this.#currentRow.start + 1,
      end: this.#currentRow.end + 1
    } : null

    this.#currentCol = col;
  };

  #getCurrentBlockPosition() {
    return { currentBlockRow: this.#currentRow, currentBlockCol: this.#currentCol };
  };

  #stopBlockMovement() {
    const { currentBlockRow, currentBlockCol } = this.#getCurrentBlockPosition()

    this.board[currentBlockRow.start][currentBlockCol] = this.block.getShape();

    this.#setBlockCurrentPosition(null, true)
    this.block = null;
  }

  #isEmptyBoardSquare(row, col) {
    return this.board[row + 1][col] === this.#boardSquare
  }
}
