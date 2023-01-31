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
    for (let row = 0; row < this.#height; row++) {
      for (let col = 0; col < this.#width; col++) {
        if (row === currentBlockRow && col === currentBlockCol) {
          result += this.block.getColor();
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
    this.#setCurrentBlockPosition(0, 1)
  }

  tick() {
    const { currentBlockRow, currentBlockCol } = this.#getCurrentBlockPosition()

    if (currentBlockRow < this.#height - 1) {
      this.#moveBlock(currentBlockRow + 1, currentBlockCol)
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
      this.#setCurrentBlockPosition(row, col)
    }
    else {
      this.#stopBlockMovement()
    };
  };

  #setCurrentBlockPosition(row, col) {
    this.#currentRow = row;
    this.#currentCol = col;
  };

  #getCurrentBlockPosition() {
    return { currentBlockRow: this.#currentRow, currentBlockCol: this.#currentCol };
  };

  #stopBlockMovement() {
    const { currentBlockRow, currentBlockCol } = this.#getCurrentBlockPosition()

    this.board[currentBlockRow][currentBlockCol] = this.block.getColor();

    this.#setCurrentBlockPosition(null, null)
    this.block = null;
  }

  #isEmptyBoardSquare(row, col) {
    return this.board[row][col] === this.#boardSquare;
  }
}
