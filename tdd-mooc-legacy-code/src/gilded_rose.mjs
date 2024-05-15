export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  #updateQuality(i, value) {
    this.items[i].quality = this.items[i].quality + value;
  }

  #updateSellIn(i, value) {
    this.items[i].sellIn = this.items[i].sellIn + value;
  }

  #isBackstagePass(name) {
    return name === "Backstage passes to a TAFKAL80ETC concert"
  }

  #isAgedBrie(name) {
    return name === "Aged Brie"
  }

  #isSulfuras(name) {
    return name === "Sulfuras, Hand of Ragnaros"
  }

  updateItems() {
    for (var i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i]

      if (!this.#isAgedBrie(currentItem.name) && !this.#isBackstagePass(currentItem.name)) {
        if (currentItem.quality > 0) {
          if (!this.#isSulfuras(currentItem.name)) {
            this.#updateQuality(i, -1)
          }
        }
      } else {
        if (currentItem.quality < 50) {
          this.#updateQuality(i, 1)
          if (this.#isBackstagePass(currentItem.name)) {
            if (currentItem.sellIn < 11) {
              if (currentItem.quality < 50) {
                this.#updateQuality(i, 1)
              }
            }
            if (currentItem.sellIn < 6) {
              if (currentItem.quality < 50) {
                this.#updateQuality(i, 1)
              }
            }
          }
        }
      }
      if (!this.#isSulfuras(currentItem.name)) {
        this.#updateSellIn(i, -1)
      }
      if (currentItem.sellIn < 0) {
        if (!this.#isAgedBrie(currentItem.name)) {
          if (!this.#isBackstagePass(currentItem.name)) {
            if (currentItem.quality > 0) {
              if (!this.#isSulfuras(currentItem.name)) {
                this.#updateQuality(i, -1)
              }
            }
          } else {
            this.#updateQuality(i, -currentItem.quality)
          }
        } else {
          if (currentItem.quality < 50) {
            this.#updateQuality(i, currentItem.quality)
          }
        }
      }
    }

    return this.items;
  }
}
