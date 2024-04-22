import { expect } from "chai";
import { Board } from "../src/Board.js";
import { fallToBottom, moveLeft, moveRight } from "./utils.js";
import { beforeEach, describe, test } from "vitest";
import { Tetromino } from "../src/Tetromino.js";

describe("Rotating Falling tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test.skip("can not rotate if center column collides", () => {
    const board = Board.loadBoard(
      `..........
      ..........
      ..........
      ....X.....
      ..........
      ..........`
    );

    board.drop(Tetromino.L_SHAPE);
    board.tick();
    board.tick();
    board.rotateRight();

    console.log("board.toString()", board.toString());

    expect(board.toString()).to.equalShape(
      `..........
      ..........
      ...LLL....
      ...LX.....
      ..........
      ..........`
    );
  });

  describe("T shape", () => {
    test("can be rotated right", () => {
      board.drop(Tetromino.T_SHAPE);
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `....T.....
         ...TT.....
         ....T.....
         ..........
         ..........
         ..........`
      );
    });

    test("can be rotated right more than once", () => {
      board.drop(Tetromino.T_SHAPE);
      board.rotateRight();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ....T.....
         ...TTT....
         ..........
         ..........
         ..........`
      );
    });

    test("can be rotated left", () => {
      board.drop(Tetromino.T_SHAPE);
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `....T.....
         ....TT....
         ....T.....
         ..........
         ..........
         ..........`
      );
    });

    test("can be rotated left more than once", () => {
      board.drop(Tetromino.T_SHAPE);
      board.rotateLeft();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ....T.....
         ...TTT....
         ..........
         ..........
         ..........`
      );
    });

    test("cannot be rotated left when there is no room to rotate", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ..........
         .......T..
         .....TTT..
         ....TTTT..`
      );

      board.drop(Tetromino.T_SHAPE);
      moveRight(board, 4);
      board.rotateLeft();
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       ..........
       .......TT.
       .....TTTTT
       ....TTTTT.`
      );
    });

    test("cannot be rotated right when there is no room to rotate", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ..........
         .......T..
         .....TTT..
         ....TTTT..`
      );

      board.drop(Tetromino.T_SHAPE);
      moveRight(board, 4);
      board.rotateLeft();
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       ..........
       .......TT.
       .....TTTTT
       ....TTTTT.`
      );
    });

    test("can wall kick rotating right on the left side of the wall", () => {
      board.drop(Tetromino.T_SHAPE);
      board.tick();
      board.tick();
      board.rotateLeft();
      moveLeft(board, 10);
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       TTT.......
       .T........
       ..........
       ..........`
      );
    });

    test("can wall kick rotating left on the right side of the wall", () => {
      board.drop(Tetromino.T_SHAPE);
      board.tick();
      board.tick();
      board.rotateRight();
      moveRight(board, 10);
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       .......TTT
       ........T.
       ..........
       ..........`
      );
    });

    test("can wall kick rotating left if against another block", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ....I.....
         ....I.....
         ....I.....
         ....I.....`
      );

      board.drop(Tetromino.T_SHAPE);
      board.moveRight();
      board.rotateLeft();
      board.tick();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       ....I.T...
       ....ITTT..
       ....I.....
       ....I.....`
      );
    });

    test("can wall kick rotating left if against another block", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ..........
         ......T...
         .....TT...
         ......T...`
      );

      board.drop(Tetromino.T_SHAPE);
      moveRight(board, 3);
      board.rotateLeft();
      board.tick();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       ........T.
       ......TTTT
       .....TT...
       ......T...`
      );
    });

    test("can wall kick rotating right if against another block", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ........I.
         ........I.
         ........I.
         ........I.`
      );

      board.drop(Tetromino.T_SHAPE);
      moveRight(board, 3);
      board.rotateRight();
      board.tick();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       ......T.I.
       .....TTTI.
       ........I.
       ........I.`
      );
    });

    test("can wall kick rotating right if against another block", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ...I......
         ...I......
         ...I......
         ...I......`
      );

      board.drop(Tetromino.T_SHAPE);
      board.moveLeft();
      board.moveLeft();
      board.rotateRight();
      board.tick();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       .T.I......
       TTTI......
       ...I......
       ...I......`
      );
    });

    test("can escape from a hollow by floor kicking", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         X.........
         X.........
         X.........
         XX.XXX....`
      );

      board.drop(Tetromino.T_SHAPE);
      board.moveLeft();
      board.moveLeft();
      board.rotateRight();
      board.tick();
      board.tick();
      board.tick();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         X.........
         X.T.......
         XTTT......
         XX.XXX....`
      );
    });
  });

  describe("I shape", () => {
    test("can be rotated", () => {
      board.drop(Tetromino.I_SHAPE);
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `.....I....
         .....I....
         .....I....
         .....I....
         ..........
         ..........`
      );
    });

    test("can be rotated more than once", () => {
      board.drop(Tetromino.I_SHAPE);
      board.rotateRight();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ...IIII...
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test("cannot be rotated if it has stopped falling", () => {
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

      expect(board.hasFalling(), "the player should not be able to move the block").to.be.false;
    });

    test("cannot be rotated when there is no room to rotate", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         .......T..
         .......T..
         .....TTT..
         ....TTTT..`
      );

      board.drop(Tetromino.I_SHAPE);
      moveRight(board, 4);
      board.rotateLeft();
      board.tick();
      board.tick();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         .......TI.
         .......TI.
         .....TTTI.
         ....TTTTI.`
      );
    });

    test("can wall kick on the left side of the wall", () => {
      board.drop(Tetromino.I_SHAPE);
      board.rotateLeft();
      moveLeft(board, 10);
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         IIII......
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test("can wall kick on the right side of the wall", () => {
      board.drop(Tetromino.I_SHAPE);
      board.rotateLeft();
      moveRight(board, 10);
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ......IIII
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test("can wall kick if against another block", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ....I.....
         ....I.....
         ....I.....
         ....I.....`
      );

      board.drop(Tetromino.I_SHAPE);
      board.rotateLeft();
      board.tick();
      board.tick();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ....I.....
         ....IIIII.
         ....I.....
         ....I.....`
      );
    });

    test("can wall kick if against another block", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ....I.....
         ....I.....
         ....I.....
         ....I.....`
      );

      board.drop(Tetromino.I_SHAPE);
      board.moveLeft();
      board.moveLeft();
      board.rotateLeft();
      board.tick();
      board.tick();
      board.rotateLeft();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ....I.....
         IIIII.....
         ....I.....
         ....I.....`
      );
    });

    test("can floor kick on the floor row", () => {
      board.drop(Tetromino.I_SHAPE);
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      board.tick();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         .....I....
         .....I....
         .....I....
         .....I....`
      );
    });

    test("can floor kick on top of blocks", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ..........
         ..........
         ...IIII...
         ...IIII...`
      );

      board.drop(Tetromino.I_SHAPE);
      board.tick();
      board.tick();
      board.tick();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `.....I....
         .....I....
         .....I....
         .....I....
         ...IIII...
         ...IIII...`
      );
    });

    test("can't floor kick if it is on the air above another block", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ..........
         ..........
         ..........
         ...IIII...`
      );

      board.drop(Tetromino.I_SHAPE);
      board.tick();
      board.tick();
      board.tick();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ...IIII...
         ..........
         ...IIII...`
      );
    });

    test("can floor kick when collision happens on the side and there is room to rotate", () => {
      const board = Board.loadBoard(
        `..........
         ..........
         ..........
         .......T..
         .....TTT..
         ....TTTT..`
      );

      board.drop(Tetromino.I_SHAPE);
      moveRight(board, 4);
      board.rotateLeft();
      board.tick();
      board.tick();
      board.rotateRight();

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       ......IIII
       .......T..
       .....TTT..
       ....TTTT..`
      );
    });
  });
});
