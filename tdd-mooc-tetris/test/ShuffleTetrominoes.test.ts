import { beforeEach, describe, test } from "vitest";
import { ShuffleBag } from "../src/ShuffleBag";
import { Tetromino } from "../src/Tetromino";
import { expect } from "chai";
import { getRandomInt } from "../src/utils";

describe("Shuffle tetrominoes", () => {
  const Tetrominoes = [
    Tetromino.I_SHAPE,
    Tetromino.J_SHAPE,
    Tetromino.L_SHAPE,
    Tetromino.O_SHAPE,
    Tetromino.S_SHAPE,
    Tetromino.T_SHAPE,
    Tetromino.Z_SHAPE,
  ];

  const stringifiedTetrominoes = Tetrominoes.map((item) => item.toString());

  let bag: ShuffleBag;
  beforeEach(() => {
    bag = new ShuffleBag(Tetrominoes);
  });

  test("is created with the 7 different types of tetrominoes", () => {
    expect(bag.items.map((item) => item.toString())).to.have.members(stringifiedTetrominoes);
  });

  test("can extract a tetromino and reduces its size", () => {
    const nextTetromino = bag.next();

    expect(bag.items.map((item) => item.toString())).to.not.include(nextTetromino!.toString());
    expect(stringifiedTetrominoes).to.include(nextTetromino!.toString());
    expect(bag.size).to.equal(6);
  });

  test("can extract all tetrominoes", () => {
    let remainingWithdrawals = 7;

    while (remainingWithdrawals > 0) {
      bag.next();
      --remainingWithdrawals;
    }

    expect(bag.size).to.equal(0);
  });

  test("can extract all tetrominoes without repeating any", () => {
    const extractedTetrominoes: string[] = [];
    let remainingWithdrawals = 7;

    while (remainingWithdrawals > 0) {
      const nextTetromino = bag.next();

      expect(stringifiedTetrominoes).to.include(nextTetromino!.toString());
      expect(extractedTetrominoes).to.not.include(nextTetromino!.toString());

      extractedTetrominoes.push(nextTetromino!.toString());

      --remainingWithdrawals;
    }

    expect(bag.size).to.equal(0);
  });

  test("can extract multiple tetrominoes", () => {
    let numRuns = 100;

    do {
      const bag = new ShuffleBag(Tetrominoes);

      let remainingWithdrawals = getRandomInt(8, 100);

      while (remainingWithdrawals > 0) {
        const nextTetromino = bag.next();

        expect(bag.items.map((item) => item.toString())).to.not.include(nextTetromino!.toString());
        expect(stringifiedTetrominoes).to.include(nextTetromino!.toString());

        --remainingWithdrawals;
      }
      --numRuns;
    } while (numRuns > 0);
  });
});
