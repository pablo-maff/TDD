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
    const { currentBlockRow, currentBlockCol } = this.getCurrentBlockPosition()
    let result = ''
    for (let row = 0; row < this.#height; row++) {
      for (let col = 0; col < this.#width; col++) {
        // TODO: Works for #2 but breaks the rest
        // if (row === currentBlockRow && col === currentBlockCol) {
        //   result += this.block.getColor();
        // }
        // else {
        result += this.board[row][col];
        // }
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
    const { currentBlockRow, currentBlockCol } = this.getCurrentBlockPosition()

    if (currentBlockRow < this.#height - 1) {
      this.moveBlock(currentBlockRow + 1, currentBlockCol)
    }
    else {
      this.setStationaryBlockInBoard(currentBlockRow, currentBlockCol)
    }
  }

  moveBlock(row, col) {
    if (this.isEmptyBoardSquare(row, col)) {
      this.setCurrentBlockPosition(row, col)
      this.board[row - 1][col] = this.#boardSquare;
      this.board[row][col] = this.block.getColor();
    }
    else {
      this.setStationaryBlockInBoard(row, col)
    };
  };

  setCurrentBlockPosition(row, col) {
    this.#currentRow = row;
    this.#currentCol = col;
  };

  getCurrentBlockPosition() {
    return { currentBlockRow: this.#currentRow, currentBlockCol: this.#currentCol };
  };

  setStationaryBlockInBoard(row, col) {
    this.board2[row][col] = this.block.getColor();
    this.stopBlockMovement()
  }

  stopBlockMovement() {
    this.block = null;
    this.#currentRow = null;
    this.#currentCol = null
  }

  hasFalling() {
    return !!this.block
  }

  isEmptyBoardSquare(row, col) {
    return this.board[row][col] === this.#boardSquare;
  }
}
