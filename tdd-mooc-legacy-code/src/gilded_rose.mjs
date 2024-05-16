export const itemsDict = {
  backstage: "Backstage passes to a TAFKAL80ETC concert",
  brie: "Aged Brie",
  sulfuras: "Sulfuras, Hand of Ragnaros"
}

export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;

    if (quality >= 51) {
      this.quality = 50
    }

    if (name === itemsDict.sulfuras) {
      this.quality = 80
    }
  }

  updateQuality(value) {
    if (value >= 51) {
      this.quality = 50

      return this
    }

    if (value <= -1) {
      this.quality = 0
      return this
    }

    this.quality = value
    return this
  }

  updateSellIn(value) {
    this.sellIn = value

    return this
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  #isBackstagePass(name) {
    return name === itemsDict.backstage
  }

  #isAgedBrie(name) {
    return name === itemsDict.brie
  }

  #isSulfuras(name) {
    return name === itemsDict.sulfuras
  }

  #updateBackstagePass(item) {
    if (item.sellIn < 0) {
      item.updateQuality(0);
      return item
    }

    if (item.sellIn <= 5) {
      item.updateQuality(item.quality + 3);
      return item
    }

    if (item.sellIn <= 10) {
      item.updateQuality(item.quality + 2);
      return item
    }

    item.updateQuality(item.quality + 1);

    return item
  }

  dayPassed() {
    return this.items.map(item => {
      if (this.#isSulfuras(item.name)) {
        return item
      }

      item.updateSellIn(item.sellIn - 1);

      if (this.#isBackstagePass(item.name)) {
        return this.#updateBackstagePass(item)
      }

      if (this.#isAgedBrie(item.name)) {
        if (item.sellIn < 0) {
          item.updateQuality(item.quality + 2);

          return item
        }

        item.updateQuality(item.quality + 1);

        return item
      }

      if (item.sellIn >= 0) {
        item.updateQuality(item.quality - 1);
        return item
      }

      item.updateQuality(item.quality - 2);

      return item
    })
  }
}
