import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  describe("The T shape", () => {
    it("starts from the top middle", () => {
      board.drop(Tetromino.T_SHAPE);

      expect(board.toString()).to.equalShape(
        `....T.....
       ...TTT....
       ..........
       ..........
       ..........
       ..........`
      );
    });

    // TODO: Check if some cases contemplated in FallingBlocks are missing here, write them and eliminate FallingBlocks test suite

    it("stop when they hit the bottom", () => {
      board.drop(Tetromino.T_SHAPE);
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
      );
    });

    it("stop when they land on another block", () => {
      board.drop(Tetromino.T_SHAPE);
      fallToBottom(board);
      board.drop(Tetromino.T_SHAPE);
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
      );
    });
  })

  describe("The I shape", () => {
    it("starts from the top middle", () => {
      board.drop(Tetromino.I_SHAPE);

      expect(board.toString()).to.equalShape(
        `...IIII...
       ..........
       ..........
       ..........
       ..........
       ..........`
      );
    });

    it("stop when they hit the bottom", () => {
      board.drop(Tetromino.I_SHAPE);
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       ..........
       ..........
       ..........
       ...IIII...`
      );
    });

    it("stop when they land on another block", () => {
      board.drop(Tetromino.I_SHAPE);
      fallToBottom(board);
      board.drop(Tetromino.I_SHAPE);
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       ..........
       ..........
       ...IIII...
       ...IIII...`
      );
    });
  })

  describe("The O shape", () => {
    it("starts from the top middle", () => {
      board.drop(Tetromino.O_SHAPE);

      expect(board.toString()).to.equalShape(
        `....OO....
       ....OO....
       ..........
       ..........
       ..........
       ..........`
      );
    });

    it("stop when they hit the bottom", () => {
      board.drop(Tetromino.O_SHAPE);
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       ..........
       ..........
       ....OO....
       ....OO....`
      );
    });

    it("stop when they land on another block", () => {
      board.drop(Tetromino.O_SHAPE);
      fallToBottom(board);
      board.drop(Tetromino.O_SHAPE);
      fallToBottom(board);

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       ....OO....
       ....OO....
       ....OO....
       ....OO....`
      );
    });
  })
});
