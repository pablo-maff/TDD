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
    const { currentBlockRow, currentBlockCol2 } = this.#getCurrentBlockPosition()
    let result = ''
    let shapeIndex = 0
    for (let row = 0; row < this.#height; row++) {
      for (let col = 0; col < this.#width; col++) {
        if (this.block?.getShape()[shapeIndex] === '\n') shapeIndex++
        if (row >= currentBlockRow?.start && row <= currentBlockRow?.end && col >= currentBlockCol2?.start && col < currentBlockCol2?.end) {
          if (this.block.getShape()[shapeIndex] !== undefined) {
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
    const { currentBlockRow, currentBlockCol2 } = this.#getCurrentBlockPosition()

    if (currentBlockRow.end < this.#height - 1) {
      this.#moveBlock(currentBlockRow.end, currentBlockCol2.end)
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
      this.#setBlockCurrentPosition()
    }
    else {
      this.#stopBlockMovement()
    };
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
    return { currentBlockRow: this.#currentRow, currentBlockCol2: this.#currentCol };
  };

  #stopBlockMovement() {
    const { currentBlockRow, currentBlockCol2 } = this.#getCurrentBlockPosition()

    this.board[currentBlockRow.start][currentBlockCol2.start] = this.block.getShape();

    this.#setBlockCurrentPosition(true)
    this.block = null;
  }

  #isEmptyBoardSquare(row, col) {
    return this.board[row + 1][col] === this.#boardSquare
  }
}
