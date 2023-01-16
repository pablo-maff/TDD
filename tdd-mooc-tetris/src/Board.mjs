export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    // * If falling is false then is GAME OVER!
    this.falling = false;
    this.ticked = 0

    this.block = null;
  }

  // ! REMEMBER RULES OF TETRIS
  // * LESSON 1 (* 2): If possible, make sure to know how things work before coding them!
  // * A Block is a symbol different than dot
  // * When a block is placed on the upper round then is GAME OVER!
  // * If a block reaches the bottom row, or it reaches the upper row of a piece in place, and is ticked one more time then the piece has stopped falling

  // * When toString is executed the final state of the board at the moment of execution is returned
  toString() {
    let board = '';
    // ! Spaghetti
    for (let row = 0; row < this.width; row++) {
      for (let col = 0; col < this.height; col++) {
        if (row === this.ticked && col === 1 && this.falling) {
          // * Block has reached x row and is still falling
          board += this.block;
          this.ticked = 0
        }
        // * If ticked is equal to height (greater in reality, implementation details pfff) then the piece should be placed in the last row
        // * unless there is another piece on the board placed on the trajectory of the falling piece
        else if (this.ticked === this.height && row === this.height - 1 && col === 1 && this.falling) {
          board += this.block;
          this.block = null
          this.falling = false
        }
        else {
          // * Place board part
          board += '.';
        }
      }
      // * End of row
      board += '\n';
    }
    // * End of board

    return board
  }

  drop(block) {
    // * Multiple blocks will be falling during the turn but there can be only one block falling at a time
    console.log('block', this.block);
    console.log('falling', this.falling);
    console.log('this.ticked', this.ticked);
    if (this.ticked === this.height) {
      this.falling = false;
      this.block = false;
    }
    if (!this.block && !this.falling) {
      this.falling = true;
      this.block = block.color
    }
    else {
      throw new Error('already falling')
    }
  }

  tick() {
    this.ticked += 1
  }

  hasFalling() {
    return this.falling
  }
}
