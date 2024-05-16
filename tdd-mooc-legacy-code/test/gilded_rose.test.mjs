import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

const backStageItem = "Backstage passes to a TAFKAL80ETC concert"
const agedBrie = "Aged Brie"
const sulfuras = "Sulfuras, Hand of Ragnaros"

describe("Gilded Rose", () => {
  test("foo, sellIn 0, quality 0", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.dayPassed();
    expect(items[0].name).to.equal("foo");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  });

  test("Aged Brie, sellIn 0, quality 0", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 0)]);
    const items = gildedRose.dayPassed();
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
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    const items = gildedRose.updateItems();
    expect(items[0].name).to.equal("Sulfuras, Hand of Ragnaros");
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(80);
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
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 99, 80)]);
    const items = gildedRose.updateItems();
    expect(items[0].name).to.equal("Sulfuras, Hand of Ragnaros");
    expect(items[0].sellIn).to.equal(99);
    expect(items[0].quality).to.equal(80);
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
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, 80)]);
    const items = gildedRose.updateItems();
    expect(items[0].name).to.equal("Sulfuras, Hand of Ragnaros");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(80);
  });


  // * ------ New tests for refactoring after reading the requirements using TDD + parallel changes strategy
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
    const item = new Item("foo", 1, 1).updateQuality(2)

    expect(item.quality).to.equal(2)
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

  test("The quality of an item is never negative", () => {
    const item = new Item("foo", 1, 0).updateQuality(-1)

    expect(item.quality).to.equal(0)
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

  test("The Quality of an item is never more than 50", () => {
    const shop = new Shop([new Item(agedBrie, 20, 49)])

    shop.dayPassed()
    shop.dayPassed()

    expect(shop.items[0].quality).to.equal(50)
  })

  test("Sulfuras never has to be sold", () => {
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

  test("Backstage passes quality increases by 2 when there are 10 days or less for the concert", () => {
    const shop = new Shop([new Item(backStageItem, 10, 20)])

    shop.dayPassed()
    shop.dayPassed()

    expect(shop.items[0].quality).to.equal(24)
  })

  test("Backstage passes quality increases by 3 when there are 5 days or less for the concert", () => {
    const shop = new Shop([new Item(backStageItem, 5, 20)])

    shop.dayPassed()
    shop.dayPassed()

    expect(shop.items[0].quality).to.equal(26)
  })

  test("Backstage passes quality drops to 0 after the concert", () => {
    const shop = new Shop([new Item(backStageItem, 1, 20)])

    shop.dayPassed()
    shop.dayPassed()

    expect(shop.items[0].quality).to.equal(0)
  })
});
