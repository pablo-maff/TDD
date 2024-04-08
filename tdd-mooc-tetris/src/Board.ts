interface IBoard {
  toString(): string;
  drop(block: string): void;
  tick(): void;
  hasFalling(): boolean;
}

// Represents an empty cell on the board.
const EMPTY: "." = ".";

class MovingShape {
  #shape: any;
  #row: number;
  #col: number;

  constructor(shape: any, row: number, col: number) {
    this.#shape = shape;
    this.#row = row;
    this.#col = col;
  }

  moveDown() {
    return new MovingShape(this.#shape, this.#row++, this.#col);
  }
}

export class Board implements IBoard {
  // Board dimensions and state.
  readonly #width: number;
  readonly #height: number;
  #block: string | null = null; // The current block, if any, that is falling.
  #block2: MovingShape | null = null; // The current block, if any, that is falling.
  #blockCurrentRow: number = 0; // The row index of the falling block.
  #board: string[][]; // 2D array to represent the game board state.
  #middleCol: number = 0;

  // Initializes a new game board with specified dimensions.
  constructor(width: number, height: number) {
    this.#width = width;
    this.#height = height;
    // Fill the board with EMPTY cells.
    this.#board = new Array(height).fill(undefined).map((_) => new Array(width).fill(EMPTY));
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
    this.#middleCol = Math.round(this.#width / 2 - 1);
    this.#block = block;
    this.#block2 = new MovingShape(block, 0, this.#middleCol);
    // Place the block at the starting position.
    this.#board[0][this.#middleCol] = block;
  }

  // Progresses the game by one tick, moving the falling block down.
  tick(): void {
    if (!this.hasFalling()) {
      throw new Error("missing block");
    }

    const moveDownAttempt = this.#block2!.moveDown();

    if (!this.#willCollide() && moveDownAttempt) {
      // Move the block down one row.
      this.#moveDown();
      this.#block2!.moveDown();
      return;
    }

    this.#stopMovement();
  }

  // Returns true if a block is falling; otherwise, false.
  hasFalling(): boolean {
    return !!this.#block && !!this.#block2;
  }

  #stopMovement() {
    this.#block = null;
    this.#block2 = null;
    this.#blockCurrentRow = 0;
  }

  #moveDown() {
    if (!this.#block) {
      throw new Error("missing block");
    }

    this.#board[this.#blockCurrentRow][this.#middleCol] = EMPTY;
    this.#board[++this.#blockCurrentRow][this.#middleCol] = this.#block;
    this.#block2?.moveDown();
  }

  // Private method to check if the falling block will collide.
  #willCollide(): boolean {
    // Check for collision with the bottom of the board or another block.
    return this.#hitsWall() || this.#hitsBlock();
  }

  #hitsBlock(): boolean {
    return this.#board[this.#blockCurrentRow + 1][this.#middleCol] !== EMPTY;
  }

  #hitsWall(): boolean {
    return this.#blockCurrentRow + 1 >= this.#height;
  }
  #willCollide2(shape: MovingShape): boolean {
    // Check for collision with the bottom of the board or another block.
    return this.#hitsWall2(shape) || this.#hitsBlock2(shape);
  }
  #hitsBlock2(shape: MovingShape): boolean {
    return this.#board[this.#blockCurrentRow + 1][this.#middleCol] !== EMPTY;
  }
  #hitsWall2(shape: MovingShape): boolean {
    return this.#blockCurrentRow + 1 >= this.#height;
  }
}
