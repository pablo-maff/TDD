import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

const backStageItem = "Backstage passes to a TAFKAL80ETC concert"

describe("Gilded Rose", () => {
  test("foo, sellIn 0, quality 0", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateItems();
    expect(items[0].name).to.equal("foo");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  });

  test("Aged Brie, sellIn 0, quality 0", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 0)]);
    const items = gildedRose.updateItems();
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(2);
  });

  test("Backstage passes to a TAFKAL80ETC concert, sellIn 0, quality 0", () => {
    const gildedRose = new Shop([new Item(backStageItem, 0, 0)]);
    const items = gildedRose.updateItems();
    expect(items[0].name).to.equal(backStageItem);
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  });

  test("Sulfuras, Hand of Ragnaros, sellIn 0, quality 0", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 0)]);
    const items = gildedRose.updateItems();
    expect(items[0].name).to.equal("Sulfuras, Hand of Ragnaros");
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(0);
  });

  test("foo, sellIn 0, quality 1", () => {
    const gildedRose = new Shop([new Item("foo", 0, 1)]);
    const items = gildedRose.updateItems();
    expect(items[0].name).to.equal("foo");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  });

  test("foo, sellIn 0, quality 99", () => {
    const gildedRose = new Shop([new Item("foo", 0, 99)]);
    const items = gildedRose.updateItems();
    expect(items[0].name).to.equal("foo");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(97);
  });

  test("shop without arguments defaults to empty array", () => {
    const gildedRose = new Shop();
    const items = gildedRose.updateItems()
    expect(items).to.deep.equal([])
  })


  test("Aged Brie, sellIn 0, quality 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 50)]);
    const items = gildedRose.updateItems();
    expect(items[0].name).to.equal("Aged Brie");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(50);
  });

  test("Backstage passes to a TAFKAL80ETC concert, sellIn 99, quality 99", () => {
    const gildedRose = new Shop([new Item(backStageItem, 99, 99)]);
    const items = gildedRose.updateItems();
    expect(items[0].name).to.equal(backStageItem);
    expect(items[0].sellIn).to.equal(98);
    expect(items[0].quality).to.equal(99);
  });

  test("Sulfuras, Hand of Ragnaros, sellIn 99, quality 99", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 99, 99)]);
    const items = gildedRose.updateItems();
    expect(items[0].name).to.equal("Sulfuras, Hand of Ragnaros");
    expect(items[0].sellIn).to.equal(99);
    expect(items[0].quality).to.equal(99);
  });

  test("Backstage passes to a TAFKAL80ETC concert, sellIn 5, quality 40", () => {
    const gildedRose = new Shop([new Item(backStageItem, 5, 40)]);
    const items = gildedRose.updateItems();
    expect(items[0].name).to.equal(backStageItem);
    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(43);
  });

  test("Backstage passes to a TAFKAL80ETC concert, sellIn 11, quality 40", () => {
    const gildedRose = new Shop([new Item(backStageItem, 11, 40)]);
    const items = gildedRose.updateItems();
    expect(items[0].name).to.equal(backStageItem);
    expect(items[0].sellIn).to.equal(10);
    expect(items[0].quality).to.equal(41);
  });

  test("Backstage passes to a TAFKAL80ETC concert, sellIn 10, quality 50", () => {
    const gildedRose = new Shop([new Item(backStageItem, 10, 50)]);
    const items = gildedRose.updateItems();
    expect(items[0].name).to.equal(backStageItem);
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(50);
  });

  test("Backstage passes to a TAFKAL80ETC concert, sellIn 5, quality 49", () => {
    const gildedRose = new Shop([new Item(backStageItem, 5, 49)]);
    const items = gildedRose.updateItems();
    expect(items[0].name).to.equal(backStageItem);
    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(50);
  });

  test("Backstage passes to a TAFKAL80ETC concert, sellIn 6, quality 40", () => {
    const gildedRose = new Shop([new Item(backStageItem, 6, 40)]);
    const items = gildedRose.updateItems();
    expect(items[0].name).to.equal(backStageItem);
    expect(items[0].sellIn).to.equal(5);
    expect(items[0].quality).to.equal(42);
  });

  test("foo, sellIn 1, quality 10", () => {
    const gildedRose = new Shop([new Item("foo", 1, 10)]);
    const items = gildedRose.updateItems();
    expect(items[0].name).to.equal("foo");
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(9);
  });

  test("Sulfuras, Hand of Ragnaros, sellIn -1, quality 99", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, 99)]);
    const items = gildedRose.updateItems();
    expect(items[0].name).to.equal("Sulfuras, Hand of Ragnaros");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(99);
  });
});
