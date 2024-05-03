import { beforeEach, describe, test } from "vitest";
import { NintendoScoring } from "../src/NintendoScoring";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";
import { lineClear } from "./utils";

describe("Nintento Scoring system", () => {
  let scoringSystem: NintendoScoring;

  beforeEach(() => {
    scoringSystem = new NintendoScoring();
  });

  test("starts with 0 points", () => {
    expect(scoringSystem.value).to.equal(0);
  });

  test("adds 40 points if 1 line is cleared", () => {
    lineClear(scoringSystem);

    expect(scoringSystem.value).to.equal(40);
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

  test("sums up 140 points after 2 different line clear, a double and a simple one", () => {
    const board = Board.loadBoard(
      `.........
       .........
       ......XXX
       XXXX.XXXX
       XXX.XXXXX
       XXX.XXXXX`
    );

    const boardScoring = new NintendoScoring();

    board.events.subscribe(boardScoring);

    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    board.tick();
    board.tick();
    board.tick();

    board.drop(Tetromino.I_SHAPE);
    board.moveLeft();
    board.rotateLeft();
    board.tick();
    board.tick();
    board.tick();

    expect(boardScoring.value).to.equal(140);
  });

  test("adds 80 points when 1 line is cleared on level 1", () => {
    const board = Board.loadBoard(
      `.........
       .........
       .........
       .........
       XXXX.XXXX
       XXXX.XXXX`,
      1
    );

    const boardScoring = new NintendoScoring();

    board.events.subscribe(boardScoring);

    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.tick();

    expect(boardScoring.value).to.equal(80);
  });
});
