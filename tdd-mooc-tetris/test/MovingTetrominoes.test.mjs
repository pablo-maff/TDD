import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Moving tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  describe("The T shape", () => {
    it("can be moved left", () => {
      board.drop(Tetromino.T_SHAPE);
      board.moveBlockLeft()

      expect(board.toString()).to.equalShape(
        `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
      );
    });

    it("can be moved right", () => {
      board.drop(Tetromino.T_SHAPE);
      board.moveBlockRight()

      expect(board.toString()).to.equalShape(
        `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
      );
    });

    it("can be moved down", () => {
      board.drop(Tetromino.T_SHAPE);
      board.moveBlockDown()

      expect(board.toString()).to.equalShape(
        `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
      );
    });
  })

  describe("The I shape", () => {
    it("can be moved left", () => {
      board.drop(Tetromino.I_SHAPE);
      board.moveBlockLeft()

      expect(board.toString()).to.equalShape(
        `..IIII....
       ..........
       ..........
       ..........
       ..........
       ..........`
      );
    });

    it("can be moved right", () => {
      board.drop(Tetromino.I_SHAPE);
      board.moveBlockRight()

      expect(board.toString()).to.equalShape(
        `....IIII..
       ..........
       ..........
       ..........
       ..........
       ..........`
      );
    });

    it("can be moved down", () => {
      board.drop(Tetromino.I_SHAPE);
      board.moveBlockDown()

      expect(board.toString()).to.equalShape(
        `..........
       ...IIII...
       ..........
       ..........
       ..........
       ..........`
      );
    });
  })
});
