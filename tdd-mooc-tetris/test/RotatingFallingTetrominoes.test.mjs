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

  it("cannot be rotated left when there is no room to rotate", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveBlockRight()
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft()
    board.moveBlockRight()
    board.moveBlockRight()
    board.moveBlockRight()
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE);
    board.moveBlockRight()
    board.moveBlockRight()
    board.moveBlockRight()
    board.moveBlockRight()
    board.rotateRight()
    board.tick()
    board.tick()
    board.tick()
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .......TT.
       .....TTTTT
       ....TTTTT.`
    );
  });

  xit("cannot be rotated right when there is no room to rotate", () => {
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

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....TT....
       ...TTTT...
       ....TT....`
    );
  });

  it("can do a wall kick rotating right if there is room to rotate on the left side of the wall", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.rotateRight()
    board.moveBlockLeft()
    board.moveBlockLeft()
    board.moveBlockLeft()
    board.moveBlockLeft()
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `..........
       TTT.......
       .T........
       ..........
       ..........
       ..........`
    );
  });

  it("can do a wall kick rotating left if there is room to rotate on the right side of the wall", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick()
    board.rotateLeft()
    board.moveBlockRight()
    board.moveBlockRight()
    board.moveBlockRight()
    board.moveBlockRight()
    board.moveBlockRight()
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `..........
       .......TTT
       ........T.
       ..........
       ..........
       ..........`
    );
  });

  it("can do a wall kick if rotating right if against another block", () => {
    board.drop(Tetromino.I_SHAPE);
    board.tick()
    board.rotateRight()
    board.moveBlockLeft()
    board.moveBlockLeft()
    board.moveBlockLeft()
    board.moveBlockLeft()
    board.tick()
    board.tick()
    board.drop(Tetromino.T_SHAPE)
    board.rotateRight()
    board.tick()
    board.tick()
    board.moveBlockLeft()
    board.moveBlockLeft()
    board.moveBlockLeft()
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ITTT......
       I.T.......
       I.........
       I.........`
    );
  });

  it("can do a wall kick rotating left if against another block", () => {
    board.drop(Tetromino.I_SHAPE);
    board.tick()
    board.rotateRight()
    board.moveBlockRight()
    board.moveBlockRight()
    board.moveBlockRight()
    board.moveBlockRight()
    board.moveBlockRight()
    board.tick()
    board.tick()
    board.drop(Tetromino.T_SHAPE)
    board.rotateLeft()
    board.tick()
    board.tick()
    board.moveBlockRight()
    board.moveBlockRight()
    board.moveBlockRight()
    board.moveBlockRight()
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ......TTTI
       .......T.I
       .........I
       .........I`
    );
  });

  it("can wall kick rotating left when against another block", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft()
    fallToBottom(board)
    board.drop(Tetromino.T_SHAPE);
    board.moveBlockRight()
    board.rotateRight()
    board.tick()
    board.tick()
    board.tick()

    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....T.T...
       ...TTTTT..
       ....T.....`
    );
  });

})


