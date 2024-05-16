export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;

    if (name === "Sulfuras, Hand of Ragnaros") {
      this.quality = 80
    } else if (quality > 50) {
      throw new Error("Quality can't be greater than 50")
    }
  }

  updateQuality(value) {
    if (value > 50) {
      return this
    }

    if (value >= 0) {
      this.quality = value
      return this
    }

    this.quality = 0
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

  #itemsDict = {
    backstage: "Backstage passes to a TAFKAL80ETC concert",
    brie: "Aged Brie",
    sulfuras: "Sulfuras, Hand of Ragnaros"
  }

  #updateItem(updatedItem) {
    this.items = this.items.map(item => item.name !== updatedItem.name ? item : updatedItem)
  }

  #updateQuality(currentItem, newValue) {
    this.#updateItem(currentItem.updateQuality(newValue))
  }

  #updateSellIn(currentItem, newValue) {
    this.#updateItem(currentItem.updateSellIn(newValue))
  }

  #isBackstagePass(name) {
    return name === this.#itemsDict.backstage
  }

  #isAgedBrie(name) {
    return name === this.#itemsDict.brie
  }

  #isSulfuras(name) {
    return name === this.#itemsDict.sulfuras
  }

  dayPassed() {
    return this.items.map(item => {
      if (this.#isSulfuras(item.name)) {
        return item
      }

      item.updateSellIn(item.sellIn - 1);

      if (item.quality === 50) {
        return item
      }

      if (this.#isBackstagePass(item.name)) {
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
