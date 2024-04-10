import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.js";
import { Board } from "../src/Board.js";
import { fallToBottom, moveLeft, moveRight } from "./utils.js";

describe("Moving tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  describe("The T shape", () => {
    test("can be moved left", () => {
      board.drop(Tetromino.T_SHAPE);
      board.moveBlockLeft();

      expect(board.toString()).to.equalShape(
        `...T......
         ..TTT.....
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test("can be moved right", () => {
      board.drop(Tetromino.T_SHAPE);
      board.moveBlockRight();

      expect(board.toString()).to.equalShape(
        `.....T....
         ....TTT...
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test("can be moved down", () => {
      board.drop(Tetromino.T_SHAPE);
      board.tick();

      expect(board.toString()).to.equalShape(
        `..........
         ....T.....
         ...TTT....
         ..........
         ..........
         ..........`
      );
    });

    test("cannot be moved left if it hits wall", () => {
      board.drop(Tetromino.T_SHAPE);
      moveLeft(board, 10);

      expect(board.toString()).to.equalShape(
        `.T........
         TTT.......
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test("cannot be moved right if it hits wall", () => {
      board.drop(Tetromino.T_SHAPE);
      moveRight(board, 10);

      expect(board.toString()).to.equalShape(
        `........T.
         .......TTT
         ..........
         ..........
         ..........
         ..........`
      );
    });

    test("cannot be moved down beyond the board and stops falling", () => {
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

      expect(board.hasFalling(), "the player should not be able to move the block").to.be.false;
    });

    test("still moves when reaches the bottom", () => {
      board.drop(Tetromino.T_SHAPE);
      board.tick();
      board.tick();
      board.tick();
      board.tick();

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ....T.....
         ...TTT....`
      );

      expect(board.hasFalling(), "the player should still be able to move the block").to.be.true;
    });

    test("cannot be moved left through other blocks", () => {
      board.drop(Tetromino.T_SHAPE);
      moveLeft(board, 5);
      fallToBottom(board);

      board.drop(Tetromino.T_SHAPE);
      board.tick();
      board.tick();
      board.tick();

      moveLeft(board, 10);

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ...T......
         .TTTT.....
         TTT.......`
      );
    });

    // test("cannot be moved right through other blocks and block stops on top of the other block", () => {
    //   board.drop(Tetromino.T_SHAPE);
    //   moveRight(board, 5)
    //   fallToBottom(board)

    //   board.drop(Tetromino.T_SHAPE);
    //   board.tick()
    //   board.tick()
    //   board.tick()

    //   moveRight(board, 10)

    //   expect(board.toString()).to.equalShape(
    //     `..........
    //      ..........
    //      ..........
    //      .....TTT..
    //      ......TTTT
    //      ........T.`
    //   );

    //   expect(
    //     board.hasFalling(),
    //     "the player should be able to move the block"
    //   ).to.be.true;
    // })

    // test("cannot be moved down through other blocks and block stops falling", () => {
    //   board.drop(Tetromino.T_SHAPE);
    //   moveLeft(board, 5)
    //   fallToBottom(board)

    //   board.drop(Tetromino.T_SHAPE);
    //   board.tick()
    //   board.tick()
    //   board.tick()

    //   moveLeft(board, 10)

    //   board.tick()

    //   expect(board.toString()).to.equalShape(
    //     `..........
    //      ..........
    //      ..........
    //      ..TTT.....
    //      TTTT......
    //      .T........`
    //   );

    //   expect(
    //     board.hasFalling(),
    //     "the player should not be able to move the block"
    //   ).to.be.false;
    // })
  });

  /*
  describe("The I shape", () => {
    test("can be moved left", () => {
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

    test("can be moved right", () => {
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

    test("can be moved down", () => {
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

    test("cannot be moved left beyond the board and is still falling", () => {
      board.drop(Tetromino.I_SHAPE);
      moveLeft(board, 10)

      expect(board.toString()).to.equalShape(
        `IIII......
         ..........
         ..........
         ..........
         ..........
         ..........`
      );

      expect(
        board.hasFalling(),
        "the player should still be able to move the block"
      ).to.be.true;
    })

    test("cannot be moved right beyond the board and is still falling", () => {
      board.drop(Tetromino.I_SHAPE);
      moveRight(board, 10)

      expect(board.toString()).to.equalShape(
        `......IIII
         ..........
         ..........
         ..........
         ..........
         ..........`
      );

      expect(
        board.hasFalling(),
        "the player should still be able to move the block"
      ).to.be.true;
    })

    test("cannot be moved down beyond the board and stops falling", () => {
      board.drop(Tetromino.I_SHAPE);
      fallToBottom(board)

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ..........
         ...IIII...`
      );

      expect(
        board.hasFalling(),
        "the player should not be able to move the block"
      ).to.be.false;
    })

    test("still moves when reaches the bottom", () => {
      board.drop(Tetromino.I_SHAPE);
      board.tick()
      board.tick()
      board.tick()
      board.tick()
      board.tick()

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ..........
         ...IIII...`
      );

      expect(
        board.hasFalling(),
        "the player should still be able to move the block"
      ).to.be.true;
    })

    test("cannot be moved left through other blocks", () => {
      board.drop(Tetromino.I_SHAPE);
      moveLeft(board, 5)
      fallToBottom(board)

      board.drop(Tetromino.I_SHAPE);
      moveLeft(board, 5)
      fallToBottom(board)

      board.drop(Tetromino.I_SHAPE);
      board.moveBlockRight()
      board.tick()
      board.tick()
      board.tick()
      board.tick()

      moveLeft(board, 10)

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         IIIIIIII..
         IIII......`
      );

      expect(
        board.hasFalling(),
        "the player should be able to move the block"
      ).to.be.true;
    })

    test("cannot be moved right through other blocks", () => {
      board.drop(Tetromino.I_SHAPE);
      moveRight(board, 5)
      fallToBottom(board)

      board.drop(Tetromino.I_SHAPE);
      moveRight(board, 5)
      fallToBottom(board)

      board.drop(Tetromino.I_SHAPE);
      board.moveBlockLeft()
      board.tick()
      board.tick()
      board.tick()
      board.tick()

      moveRight(board, 10)

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ..IIIIIIII
         ......IIII`
      );

      expect(
        board.hasFalling(),
        "the player should be able to move the block"
      ).to.be.true;
    })
    test("cannot be moved down through other blocks and block stops falling", () => {
      board.drop(Tetromino.I_SHAPE);
      fallToBottom(board)

      board.drop(Tetromino.I_SHAPE);
      fallToBottom(board)
      board.moveBlockDown()

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ...IIII...
         ...IIII...`
      );

      expect(
        board.hasFalling(),
        "the player should not be able to move the block"
      ).to.be.false;
    })
  })
  */
});
