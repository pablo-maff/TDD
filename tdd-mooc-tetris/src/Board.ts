interface IBoard {
  toString(): string;
  drop(block: string): void;
  tick(): void;
  hasFalling(): boolean;
}

// Represents an empty cell on the board.
const EMPTY: "." = ".";

export class Board implements IBoard {
  // Board dimensions and state.
  readonly #width: number;
  readonly #height: number;
  #block: string | null; // The current block, if any, that is falling.
  #blockCurrentRow: number; // The row index of the falling block.
  #blockFalling: boolean; // Flag to indicate if a block is currently falling.
  #board: string[][]; // 2D array to represent the game board state.

  // Initializes a new game board with specified dimensions.
  constructor(width: number, height: number) {
    this.#width = width;
    this.#height = height;
    this.#block = null;
    this.#blockCurrentRow = 0;
    this.#blockFalling = false;
    // Fill the board with EMPTY cells.
    this.#board = new Array(height);
    for (let row = 0; row < height; row++) {
      this.#board[row] = new Array(width).fill(EMPTY);
    }
  }

  // Returns the current state of the board as a string.
  toString(): string {
    let boardString = "";
    for (let row = 0; row < this.#height; row++) {
      for (let col = 0; col < this.#width; col++) {
        boardString += this.#board[row][col];
      }
      boardString += "\n";
    }
    return boardString;
  }

  // Attempts to drop a new block onto the board.
  drop(block: string): void {
    if (this.hasFalling()) {
      throw new Error("already falling");
    }
    this.#block = block;
    this.#blockFalling = true;
    // Place the block at the starting position.
    this.#board[0][1] = block;
  }

  // Progresses the game by one tick, moving the falling block down.
  tick(): void {
    if (!this.#block) {
      throw new Error("missing block");
    }
    if (!this.#willCollide()) {
      // Move the block down one row.
      this.#board[this.#blockCurrentRow][1] = EMPTY;
      this.#board[++this.#blockCurrentRow][1] = this.#block;
      return;
    }
    // Stop the block if it will collide in the next move.
    this.#blockFalling = false;
    this.#block = null;
    this.#blockCurrentRow = 0;
  }

  // Returns true if a block is falling; otherwise, false.
  hasFalling(): boolean {
    return this.#blockFalling;
  }

  // Private method to check if the falling block will collide.
  #willCollide(): boolean {
    // Check for collision with the bottom of the board or another block.
    return this.#blockCurrentRow + 1 >= this.#height || this.#board[this.#blockCurrentRow + 1][1] !== EMPTY;
  }
}
