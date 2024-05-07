import { describe, test } from "vitest";
import { expect } from "chai";
import { parsePeopleCsv } from "../src/untestable3.mjs";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

describe("Untestable 3: CSV file parsing", () => {
  const anya = 'Anya,Forger,6,Female'
  const loid = 'Loid,Forger,,Male'
  const yor = 'Yor,Forger,27,Female'

  const expectedAnya = {
    firstName: "Anya",
    lastName: "Forger",
    age: 6,
    gender: "f"
  }

  const expectedLoid = {
    firstName: "Loid",
    lastName: "Forger",
    gender: "m"
  }

  const expectedYor = {
    firstName: "Yor",
    lastName: "Forger",
    age: 27,
    gender: "f"
  }

  test("returns an empty array for empty data", () => {
    expect(parsePeopleCsv('')).to.deep.equal([]);
  });

  test("returns the parsed data for 1 row", () => {
    expect(parsePeopleCsv(anya)).to.deep.include(expectedAnya);
  });

  test("returns the parsed data for 1 row without age", () => {
    expect(parsePeopleCsv(loid)).to.deep.include(expectedLoid);
  });

  test("returns the parsed data for 2 rows", () => {
    expect(parsePeopleCsv(anya + '\n' + loid)).to.deep.equal([expectedAnya, expectedLoid]);
  });

  test("returns the parsed data for 1 rows when there is an empty row at the start", () => {
    expect(parsePeopleCsv('\n' + anya)).to.deep.include(expectedAnya);
  });

  test("returns the parsed data for 1 rows when there is an empty row at the end", () => {
    expect(parsePeopleCsv(anya + '\n')).to.deep.include(expectedAnya);
  });

  test("returns the parsed data for 3 rows when there is an empty row in the middle", () => {
    expect(parsePeopleCsv(anya + '\n' + loid + '\n' + '\n' + yor)).to.deep.equal([expectedAnya, expectedLoid, expectedYor]);
  });
});
