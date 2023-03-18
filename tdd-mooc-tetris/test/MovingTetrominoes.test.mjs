import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { fallToBottom, moveLeft, moveRight } from "./utils.mjs";

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

    it("cannot be moved left beyond the board and is still falling", () => {
      board.drop(Tetromino.T_SHAPE);
      moveLeft(board, 10)

      expect(board.toString()).to.equalShape(
        `.T........
       TTT.......
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

    it("cannot be moved right beyond the board and is still falling", () => {
      board.drop(Tetromino.T_SHAPE);
      moveRight(board, 10)

      expect(board.toString()).to.equalShape(
        `........T.
       .......TTT
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

    it("cannot be moved down beyond the board and stops falling", () => {
      board.drop(Tetromino.T_SHAPE);
      fallToBottom(board)

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
    })

    it("still moves when reaches the bottom", () => {
      board.drop(Tetromino.T_SHAPE);
      board.moveBlockDown()
      board.moveBlockDown()
      board.moveBlockDown()
      board.moveBlockDown()

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
        "the player should still be able to move the block"
      ).to.be.true;
    })

    it("cannot be moved left through other blocks and block stops on top of the other block", () => {
      board.drop(Tetromino.T_SHAPE);
      moveLeft(board, 5)
      fallToBottom(board)

      board.drop(Tetromino.T_SHAPE);
      board.moveBlockDown()
      board.moveBlockDown()
      board.moveBlockDown()

      moveLeft(board, 10)

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       ..........
       ...T......
       .TTTT.....
       TTT.......`
      );

      expect(
        board.hasFalling(),
        "the player should be able to move the block"
      ).to.be.true;
    })

    it("cannot be moved right through other blocks and block stops on top of the other block", () => {
      board.drop(Tetromino.T_SHAPE);
      moveRight(board, 5)
      fallToBottom(board)

      board.drop(Tetromino.T_SHAPE);
      board.moveBlockDown()
      board.moveBlockDown()
      board.moveBlockDown()

      moveRight(board, 10)

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       ..........
       ......T...
       .....TTTT.
       .......TTT`
      );

      expect(
        board.hasFalling(),
        "the player should be able to move the block"
      ).to.be.true;
    })

    it("cannot be moved down through other blocks and block stops falling", () => {
      board.drop(Tetromino.T_SHAPE);
      moveLeft(board, 5)
      fallToBottom(board)

      board.drop(Tetromino.T_SHAPE);
      board.moveBlockDown()
      board.moveBlockDown()
      board.moveBlockDown()

      moveLeft(board, 10)

      board.moveBlockDown()

      expect(board.toString()).to.equalShape(
        `..........
       ..........
       ..........
       ...T......
       .TTTT.....
       TTT.......`
      );

      expect(
        board.hasFalling(),
        "the player should not be able to move the block"
      ).to.be.false;
    })
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

    it("cannot be moved left beyond the board and is still falling", () => {
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

    it("cannot be moved right beyond the board and is still falling", () => {
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

    it("cannot be moved down beyond the board and stops falling", () => {
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

    it("still moves when reaches the bottom", () => {
      board.drop(Tetromino.I_SHAPE);
      board.moveBlockDown()
      board.moveBlockDown()
      board.moveBlockDown()
      board.moveBlockDown()
      board.moveBlockDown()

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

    it("cannot be moved left through other blocks", () => {
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

    it("cannot be moved right through other blocks", () => {
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
  })
});
