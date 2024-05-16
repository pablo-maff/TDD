export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;

    if (name === "Sulfuras, Hand of Ragnaros") {
      this.quality = 80
    }
  }

  updateQuality(value) {
    if (value >= 0) {
      this.quality = value
    }

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

  updateItems() {
    for (var i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i]

      if (!this.#isAgedBrie(currentItem.name) && !this.#isBackstagePass(currentItem.name) && !this.#isSulfuras(currentItem.name) && currentItem.quality > 0) {
        this.#updateQuality(currentItem, currentItem.quality - 1)

      }

      if (currentItem.quality < 50 && (this.#isAgedBrie(currentItem.name) || this.#isBackstagePass(currentItem.name))) {
        this.#updateQuality(currentItem, currentItem.quality + 1)
        if (this.#isBackstagePass(currentItem.name) && currentItem.sellIn < 11 && currentItem.quality < 50) {
          if (currentItem.sellIn < 6) {
            this.#updateQuality(currentItem, currentItem.quality + 2)
          } else {
            this.#updateQuality(currentItem, currentItem.quality + 1)
          }
        }
      }

      if (!this.#isSulfuras(currentItem.name)) {
        this.#updateSellIn(currentItem, currentItem.sellIn - 1)
      }

      if (currentItem.sellIn < 0) {
        if (this.#isBackstagePass(currentItem.name)) {
          this.#updateQuality(currentItem, currentItem.quality - currentItem.quality)
        }
        if (this.#isAgedBrie(currentItem.name) && currentItem.quality < 50) {
          this.#updateQuality(currentItem, currentItem.quality + currentItem.quality)
        }
        if (!this.#isSulfuras(currentItem.name) && !this.#isAgedBrie(currentItem.name) && currentItem.quality > 0) {
          this.#updateQuality(currentItem, currentItem.quality - 1)
        }
      }
    }

    return this.items;
  }
}
