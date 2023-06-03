import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { fallToBottom } from "./utils.mjs";

describe("Rotating Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("can be rotated right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  it("can be rotated right more than once", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight()
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `...TTT....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("can be rotated left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  it("can be rotated left more than once", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft()
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `...TTT....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  xit("cannot be rotated when there is no room to rotate", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft()
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight()
    board.moveBlockRight()
    board.rotateRight()

    // board.tick()
    // board.tick()
    // board.tick()
    board.rotateRight()
    // board.rotateRight()
    // board.rotateLeft()
    console.log("board", board.toString());

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....TT....
       ...TTTT...
       ....TT....`
    );
  });
})
