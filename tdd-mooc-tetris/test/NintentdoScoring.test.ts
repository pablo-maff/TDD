import { describe, test } from "vitest";
import { NintendoScoring } from "../src/NintendoScoring";
import { expect } from "chai";

describe("Nintento Scoring system", () => {
  test("starts with 0 points", () => {
    const scoring = new NintendoScoring();

    expect(scoring.value).to.equal(0);
  });
});
