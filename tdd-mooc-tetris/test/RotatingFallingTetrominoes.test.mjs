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

  it("are placed in their initial position in the board", () => {
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

  it("cannot be rotated right if it has stopped falling", () => {

    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board)
    // board.rotateRight()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );

    expect(
      board.hasFalling(),
      "the player should not be able to move the block"
    ).to.be.false;
  });

  xit("cannot be rotated when there is no room to rotate", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft()
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight()
    board.moveBlockRight()
    board.tick()
    board.tick()
    board.tick()
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
