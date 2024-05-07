import { describe, test } from "vitest";
import { expect } from "chai";
import { parsePeopleCsv } from "../src/untestable3.mjs";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

describe("Untestable 3: CSV file parsing", () => {
  test("returns an empty array for empty data", () => {
    // TODO: write proper tests
    expect(parsePeopleCsv('')).to.deep.equal([]);
  });
});
