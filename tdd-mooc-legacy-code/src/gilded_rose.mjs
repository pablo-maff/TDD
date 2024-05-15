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

  updateItems() {
    for (var i = 0; i < this.items.length; i++) {
      if (!this.#isAgedBrie(this.items[i].name) && !this.#isBackstagePass(this.items[i].name)) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            this.#updateQuality(i, -1)
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.#updateQuality(i, 1)
          if (this.#isBackstagePass(this.items[i].name)) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.#updateQuality(i, 1)
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.#updateQuality(i, 1)
              }
            }
          }
        }
      }
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.#updateSellIn(i, -1)
      }
      if (this.items[i].sellIn < 0) {
        if (!this.#isAgedBrie(this.items[i].name)) {
          if (!this.#isBackstagePass(this.items[i].name)) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
                this.#updateQuality(i, -1)
              }
            }
          } else {
            this.#updateQuality(i, -this.items[i].quality)
          }
        } else {
          if (this.items[i].quality < 50) {
            this.#updateQuality(i, this.items[i].quality)
          }
        }
      }
    }

    return this.items;
  }
}
