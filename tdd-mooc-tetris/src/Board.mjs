import { RotatingShape } from "./RotatingShape.mjs";

export class Board {
  #width;
  #height;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
    this.board = this.#createEmptyBoard()
  }

  #boardSquare = '.'
  #currentRow = 0
  #currentCol = 1

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
    // ? How do I avoid the board mutation while always passing the same variable here?
    return this.board.join('').replaceAll(',', '')
  }

  drop(block) {
    if (this.hasFalling()) throw new Error("already falling")
    this.block = block;
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
      this.board[row - 1][col] = this.#boardSquare
      this.board[row][col] = this.block.getColor()
    }
    else {
      this.block = null
      this.#currentRow = 0
    }
  }

  hasFalling() {
    return !!this.block
  }

  isEmptyBoardSquare(y, x) {
    return this.board[y][x] === this.#boardSquare
  }
}
