export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  updateQuality(value) {
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

  #specialItemsDict = {
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
    return name === this.#specialItemsDict.backstage
  }

  #isAgedBrie(name) {
    return name === this.#specialItemsDict.brie
  }

  #isSulfuras(name) {
    return name === this.#specialItemsDict.sulfuras
  }

  updateItems() {
    for (var i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i]

      if (!this.#isAgedBrie(currentItem.name) && !this.#isBackstagePass(currentItem.name) && !this.#isSulfuras(currentItem.name) && currentItem.quality > 0) {
        this.#updateQuality(currentItem, currentItem.quality - 1)

      }

      if (this.#isAgedBrie(currentItem.name) || this.#isBackstagePass(currentItem.name)) {
        if (currentItem.quality < 50) {
          this.#updateQuality(currentItem, currentItem.quality + 1)
          if (this.#isBackstagePass(currentItem.name) && currentItem.sellIn < 11 && currentItem.quality < 50) {
            if (currentItem.sellIn < 6) {
              this.#updateQuality(currentItem, currentItem.quality + 2)
            } else {
              this.#updateQuality(currentItem, currentItem.quality + 1)
            }
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
