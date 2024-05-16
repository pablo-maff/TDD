import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

const backStageItem = "Backstage passes to a TAFKAL80ETC concert"
const agedBrie = "Aged Brie"
const sulfuras = "Sulfuras, Hand of Ragnaros"

describe("Gilded Rose", () => {
  test("Empty shop defaults to empty array", () => {
    const gildedRose = new Shop();
    const items = gildedRose.dayPassed()
    expect(items).to.deep.equal([])
  })

  test("Item has a sellIn value", () => {
    const item = new Item("foo", 1, 1)

    expect(item.sellIn).to.equal(1)
  })

  test("Item can update sellIn value", () => {
    const item = new Item("foo", 1, 1).updateSellIn(2)

    expect(item.sellIn).to.equal(2)
  })

  test("Item has a quality value", () => {
    const item = new Item("foo", 1, 1)

    expect(item.quality).to.equal(1)
  })

  test("Item can update quality value", () => {
    const item = new Item("foo", 1, 0).updateQuality(1)

    expect(item.quality).to.equal(1)
  })

  test("Item maximum quality is 50", () => {
    const item = new Item("foo", 1, 51)
    expect(item.quality).to.equal(50)
  })

  test("Item quality maximum updated value is 50", () => {
    const item = new Item("foo", 1, 1).updateQuality(51)

    expect(item.quality).to.equal(50)
  })

  test("Item quality minimum updated value is 0", () => {
    const item = new Item("foo", 1, 1).updateQuality(-1)

    expect(item.quality).to.equal(0)
  })

  test("Item has a sellIn value", () => {
    const item = new Item("foo", 1, 1)

    expect(item.sellIn).to.equal(1)
  })

  test("Shop updates sellIn value for all items after a day has passed", () => {
    const item1 = new Item("foo", 1, 1)
    const item2 = new Item("bar", 11, 11)

    const shop = new Shop([item1, item2])
    const shopAfterDayPassed = shop.dayPassed()

    const updatedShopItemsSellIn = shopAfterDayPassed.map(item => item.sellIn)

    expect(updatedShopItemsSellIn).to.deep.equal([0, 10])
  })

  test("Shop updates quality value for all items after a day has passed", () => {
    const item1 = new Item("foo", 1, 1)
    const item2 = new Item("bar", 11, 11)

    const shop = new Shop([item1, item2])
    const shopAfterDayPassed = shop.dayPassed()

    const updatedShopItemsQuality = shopAfterDayPassed.map(item => item.quality)

    expect(updatedShopItemsQuality).to.deep.equal([0, 10])
  })

  test("Once the sell by date has passed, quality degrades twice as fast", () => {
    const shop = new Shop([new Item("foo", 1, 10)])

    shop.dayPassed()
    shop.dayPassed()

    expect(shop.items[0].quality).to.equal(7)
  })

  test("Aged Brie increases in Quality the older it gets", () => {
    const shop = new Shop([new Item(agedBrie, 20, 20)])

    shop.dayPassed()
    shop.dayPassed()

    expect(shop.items[0].quality).to.equal(22)
  })

  test("Aged Brie increases in Quality twice as fast after sellIn is negative", () => {
    const shop = new Shop([new Item(agedBrie, 1, 20)])

    shop.dayPassed()
    shop.dayPassed()

    expect(shop.items[0].quality).to.equal(23)
  })

  test("Sulfuras never has to be sold so sellIn remains the same", () => {
    const shop = new Shop([new Item(sulfuras, 20)])

    shop.dayPassed()
    shop.dayPassed()

    expect(shop.items[0].sellIn).to.equal(20)
  })

  test("Sulfuras never decreases in quality and it is always 80", () => {
    const shop = new Shop([new Item(sulfuras, 20)])

    shop.dayPassed()
    shop.dayPassed()

    expect(shop.items[0].quality).to.equal(80)
  })

  test("Backstage passes increases in Quality as its SellIn value approaches", () => {
    const shop = new Shop([new Item(backStageItem, 20, 20)])

    shop.dayPassed()
    shop.dayPassed()

    expect(shop.items[0].quality).to.equal(22)
  })

  test("Backstage passes quality increases by 2 when there are 10 days or less left for the concert", () => {
    const shop = new Shop([new Item(backStageItem, 11, 20)])

    shop.dayPassed()

    expect(shop.items[0].quality).to.equal(22)
  })

  test("Backstage passes quality increases by 3 when there are 5 days or less left for the concert 1", () => {
    const shop = new Shop([new Item(backStageItem, 6, 20)])

    shop.dayPassed()

    expect(shop.items[0].quality).to.equal(23)
  })

  test("Backstage passes quality increases by 3 when there is 1 day left for the concert 2", () => {
    const shop = new Shop([new Item(backStageItem, 1, 20)])

    shop.dayPassed()

    expect(shop.items[0].quality).to.equal(23)
  })

  test("Backstage passes quality drops to 0 after the concert", () => {
    const shop = new Shop([new Item(backStageItem, 0, 20)])

    shop.dayPassed()

    expect(shop.items[0].quality).to.equal(0)
  })
});
