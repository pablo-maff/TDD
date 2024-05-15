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

  updateItems() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name != "Aged Brie" && this.items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            this.#updateQuality(i, -1)
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.#updateQuality(i, 1)
          if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
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
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (this.items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
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
