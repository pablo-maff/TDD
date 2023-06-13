import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { fallToBottom, moveLeft, moveRight } from "./utils.mjs";
import { TetrominoArika } from "../src/TetrominoArika.mjs";

describe("Moving tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  describe("The T shape", () => {
    it("can be moved left", () => {
      board.drop(TetrominoArika.T_SHAPE);
      board.moveBlockLeft()

      expect(board.toString()).to.equalShape(
        `..TTT.....
         ...T......
         ..........
         ..........
         ..........
         ..........`
      );
    });

    it("can be moved right", () => {
      board.drop(TetrominoArika.T_SHAPE);
      board.moveBlockRight()

      expect(board.toString()).to.equalShape(
        `....TTT...
         .....T....
         ..........
         ..........
         ..........
         ..........`
      );
    });

    it("can be moved down", () => {
      board.drop(TetrominoArika.T_SHAPE);
      board.tick()

      expect(board.toString()).to.equalShape(
        `..........
         ...TTT....
         ....T.....
         ..........
         ..........
         ..........`
      );
    });

    it("cannot be moved left beyond the board and is still falling", () => {
      board.drop(TetrominoArika.T_SHAPE);
      moveLeft(board, 10)

      expect(board.toString()).to.equalShape(
        `TTT.......
         .T........
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
      board.drop(TetrominoArika.T_SHAPE);
      moveRight(board, 10)

      expect(board.toString()).to.equalShape(
        `.......TTT
         ........T.
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
      board.drop(TetrominoArika.T_SHAPE);
      fallToBottom(board)

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ...TTT....
         ....T.....`
      );

      expect(
        board.hasFalling(),
        "the player should not be able to move the block"
      ).to.be.false;
    })

    it("still moves when reaches the bottom", () => {
      board.drop(TetrominoArika.T_SHAPE);
      board.tick()
      board.tick()
      board.tick()
      board.tick()

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..........
         ...TTT....
         ....T.....`
      );

      expect(
        board.hasFalling(),
        "the player should still be able to move the block"
      ).to.be.true;
    })

    it("cannot be moved left through other blocks and block stops on top of the other block", () => {
      board.drop(TetrominoArika.T_SHAPE);
      moveLeft(board, 5)
      fallToBottom(board)

      board.drop(TetrominoArika.T_SHAPE);
      board.tick()
      board.tick()
      board.tick()

      moveLeft(board, 10)

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..TTT.....
         TTTT......
         .T........`
      );

      expect(
        board.hasFalling(),
        "the player should be able to move the block"
      ).to.be.true;
    })

    it("cannot be moved right through other blocks and block stops on top of the other block", () => {
      board.drop(TetrominoArika.T_SHAPE);
      moveRight(board, 5)
      fallToBottom(board)

      board.drop(TetrominoArika.T_SHAPE);
      board.tick()
      board.tick()
      board.tick()

      moveRight(board, 10)

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         .....TTT..
         ......TTTT
         ........T.`
      );

      expect(
        board.hasFalling(),
        "the player should be able to move the block"
      ).to.be.true;
    })

    it("cannot be moved down through other blocks and block stops falling", () => {
      board.drop(TetrominoArika.T_SHAPE);
      moveLeft(board, 5)
      fallToBottom(board)

      board.drop(TetrominoArika.T_SHAPE);
      board.tick()
      board.tick()
      board.tick()

      moveLeft(board, 10)

      board.tick()

      expect(board.toString()).to.equalShape(
        `..........
         ..........
         ..........
         ..TTT.....
         TTTT......
         .T........`
      );

      expect(
        board.hasFalling(),
        "the player should not be able to move the block"
      ).to.be.false;
    })
  })


  describe("The I shape", () => {
    it("can be moved left", () => {
      board.drop(TetrominoArika.I_SHAPE);
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
      board.drop(TetrominoArika.I_SHAPE);
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
      board.drop(TetrominoArika.I_SHAPE);
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
      board.drop(TetrominoArika.I_SHAPE);
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
      board.drop(TetrominoArika.I_SHAPE);
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
      board.drop(TetrominoArika.I_SHAPE);
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
      board.drop(TetrominoArika.I_SHAPE);
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

    it("cannot be moved left through other blocks", () => {
      board.drop(TetrominoArika.I_SHAPE);
      moveLeft(board, 5)
      fallToBottom(board)

      board.drop(TetrominoArika.I_SHAPE);
      moveLeft(board, 5)
      fallToBottom(board)

      board.drop(TetrominoArika.I_SHAPE);
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
      board.drop(TetrominoArika.I_SHAPE);
      moveRight(board, 5)
      fallToBottom(board)

      board.drop(TetrominoArika.I_SHAPE);
      moveRight(board, 5)
      fallToBottom(board)

      board.drop(TetrominoArika.I_SHAPE);
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
    it("cannot be moved down through other blocks and block stops falling", () => {
      board.drop(TetrominoArika.I_SHAPE);
      fallToBottom(board)

      board.drop(TetrominoArika.I_SHAPE);
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
});
