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
  #currentRow = 0;
  #currentCol = 1;
  #currentRow2;
  #currentCol2;

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
    let result = ''
    for (let row = 0; row < this.#height; row++) {
      for (let col = 0; col < this.#width; col++) {
        result += this.board[row][col];
      }
      result += '\n';
    }
    return result
  }

  drop(block) {
    if (this.hasFalling()) throw new Error("already falling")
    this.block = block;
    this.setCurrentBlockPosition(0, 1)
    this.board[0][1] = this.block.getColor()
  }

  tick() {
    if (this.#currentRow < this.#height - 1) {
      this.#currentRow += 1
      this.moveBlock(this.#currentRow, this.#currentCol)
    }
    else {
      this.block = null
      this.#currentRow = 0
    }
  }

  moveBlock(row, col) {
    if (this.isEmptyBoardSquare(row, col)) {
      this.board[row - 1][col] = this.#boardSquare;
      this.board[row][col] = this.block.getColor();
    }
    else {
      this.block = null;
      this.#currentRow = 0;
    };
  };

  setCurrentBlockPosition(row, col) {
    this.#currentRow2 = row;
    this.#currentCol2 = col;
  };

  getCurrentBlockPosition() {
    return { currentRow: this.#currentRow2, currentCol: this.#currentCol2 };
  };

  hasFalling() {
    return !!this.block
  }

  isEmptyBoardSquare(y, x) {
    return this.board[y][x] === this.#boardSquare
  }
}
