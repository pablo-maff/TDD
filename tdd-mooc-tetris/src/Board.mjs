export class Board {
  #width;
  #height;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
    this.createBoard()
  }

  #board = [];
  #boardSquare = '.'

  /* // TODO: 
          * Clean up a bit of the mess before continuing
          * hasFalling can contain the logic to return the position of the blocks at least for the next step
          * define Block methods and use them
          * toString should only stringify the #board
          * drop is just the entry point for a block
          * tick only moves the block one row down
          * After having the above working, a new method should take care of moving the blocks around the #board, consider a 2D array
  */
  // * LESSON 1 (* 2): If possible, make sure to know how things work before coding them!
  // * LESSON 2 (record it with fire in your mind): Each method should just take care of one thing and its name must indicate what that thing is.
  // * LESSON 3 (same than on 2): Try to understand the problem and the solution that I'm trying before running the tests again instead of executing tests like a monkey with a keyboard.
  // * LESSON 4 (same, I've seen it all in the readings): Refactor only with green tests, if a new test fails and refactoring is needed. Comment it out until the app is ready to code more functionality in it.

  // * LESSON 5: Think about what you need, write down the problem, the steps to solve it and apply it

  /*
  TODO: I need to detach the #board creation from the placing of the pieces
  * The #board should start empty! 
  TODO: REDO I need: A way to track the current position and state of a piece
  * {color: 'X', positionX: 0, positionY: 1, isFalling: true}
  TODO: REDO I need to make the piece move down
  * ticked() = positionX + 1
  TODO: REDO I need to stop the piece from falling
  * if positionX === this.ticked then isFalling: false
  TODO: I need to detach the #board creation from the #board rendering
  * Create a new method to create the #board and use toString to just do that
  TODO: REDO I need to insert the piece in the desired position
  * Modify drop(), it should accept x and y coordinates
  */

  // ! REMEMBER RULES OF TETRIS
  // * A Block is a symbol different than dot
  // * When a block is placed on the upper round then is GAME OVER!
  // * If a block reaches the bottom row, or it reaches the upper row of a piece in place, and is ticked one more time then the piece has stopped falling

  // * Don't use side effects, return instead of modifying current one
  createBoard() {
    for (let y = 0; y < this.#height; y++) {
      this.#board[y] = []
      for (let x = 0; x < this.#width; x++) {
        this.#board[y][x] = this.#boardSquare;
      }
      // * End of row
      this.#board[y][this.#height] = '\n';
    }
    // * End of #board
  }

  // * When toString is executed the final state of the #board at the moment of execution is returned
  toString() {
    return this.#board.join('').replaceAll(',', '')
  }

  drop(block) {
    // * Multiple blocks will be falling during the turn but there can be only one block falling at a time
    if (!this.hasFalling()) {
      this.block = block
      this.#board[0][1] = this.block.getColor()
    }
    else {
      throw new Error('already falling')
    }
  }

  tick() {
    const blockCurrentPositionY = this.block.getPositionY()
    const newPositionY = blockCurrentPositionY + 1
    this.block.setPositionY(newPositionY)
    this.moveBlock(newPositionY, 1, blockCurrentPositionY)
  }

  moveBlock(y, x, previousPositionY) {
    if (y >= this.#height) {
      this.block = null
    }
    else if (this.isEmptyBoardSquare(y, x)) {
      this.#board[previousPositionY][x] = this.#boardSquare
      this.#board[y][x] = this.block.getColor()
    }
    else {
      this.block = null
    }
  }

  hasFalling() {
    return !!this.block
  }

  boardIsCreated() {
    return !!this.#board.length
  }

  isEmptyBoardSquare(y, x) {
    return this.#board[y][x] === this.#boardSquare
  }
}
