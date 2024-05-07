import { describe, test } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  const now = new Date('2022-12-20T03:24:00')

  test("returns correct remaining days if now is on the same year before christmas", () => {
    expect(daysUntilChristmas(now)).to.equal(5)
  })

  test("returns correct remaining days if now is on the same year after christmas", () => {
    const now = new Date('2022-12-26T03:24:00')

    expect(daysUntilChristmas(now)).to.equal(364)
  })

  test("returns correct remaining days if now is on christmas", () => {
    const now = new Date('2022-12-25T03:24:00')

    expect(daysUntilChristmas(now)).to.equal(0)
  })

  test("returns correct remaining days if there is a leap year", () => {
    const now = new Date('2023-12-26T03:24:00')

    expect(daysUntilChristmas(now)).to.equal(365)
  })
});
