import { Block } from "./Block.mjs";

export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.falling = false;
    this.ticked = 0
  }

  toString() {
    let board = '';
    let pieceIsPlaced = false

    for (let row = 0; row < this.width; row++) {
      for (let col = 0; col < this.height; col++) {
        if (row === this.ticked && col === 1 && this.falling && !pieceIsPlaced) {
          board += 'X';
          pieceIsPlaced = true
        }
        else {
          board += '.';
        }
      }
      board += '\n';
    }
    return board
  }

  drop(block) {
    if (block.color === 'X') {
      this.falling = true;
    }
    else {
      throw new Error('already falling')
    }
  }

  tick() {
    this.ticked += 1

  }
}
