import { describe, test } from "vitest";
import { NintendoScoring } from "../src/NintendoScoring";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

describe("Nintento Scoring system", () => {
  test("starts with 0 points", () => {
    const scoring = new NintendoScoring();

    expect(scoring.value).to.equal(0);
  });

  test("adds 40 points if 1 line is cleared", () => {
    const board = Board.loadBoard(
      `.........
       .........
       .........
       .........
       XXXX.XXXX
       XXXX.XXXX`
    );

    const scoring = new NintendoScoring();

    board.events.subscribe(scoring);

    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.tick();

    expect(scoring.value).to.equal(40);
  });

  test("adds 100 points when 2 lines are cleared at the same time", () => {
    const board = Board.loadBoard(
      `.........
       .........
       .........
       ......XXX
       XXXX.XXXX
       XXXX.XXXX`
    );

    const boardScoring = new NintendoScoring();

    board.events.subscribe(boardScoring);

    board.drop(Tetromino.I_SHAPE);
    board.rotateLeft();
    board.tick();
    board.tick();
    board.tick();

    expect(boardScoring.value).to.equal(100);
  });

  test("adds 300 points when 3 lines are cleared at the same time", () => {
    const board = Board.loadBoard(
      `.........
       .........
       ......XXX
       XXXX.XXXX
       XXXX.XXXX
       XXXX.XXXX`
    );

    const boardScoring = new NintendoScoring();

    board.events.subscribe(boardScoring);

    board.drop(Tetromino.I_SHAPE);
    board.rotateLeft();
    board.tick();
    board.tick();
    board.tick();

    expect(boardScoring.value).to.equal(300);
  });

  test("adds 1200 points when 4 lines are cleared at the same time", () => {
    const board = Board.loadBoard(
      `.........
       ......XXX
       XXXX.XXXX
       XXXX.XXXX
       XXXX.XXXX
       XXXX.XXXX`
    );

    const boardScoring = new NintendoScoring();

    board.events.subscribe(boardScoring);

    board.drop(Tetromino.I_SHAPE);
    board.rotateLeft();
    board.tick();
    board.tick();
    board.tick();

    expect(boardScoring.value).to.equal(1200);
  });
});
