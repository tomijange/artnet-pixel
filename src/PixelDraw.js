var Effect = require("./effect/Effect");

var PImage = require("pureimage");
var artnet = require("artnet");

module.exports = class PixelDraw {
  constructor(
    artnet,
    options = { pixelsX: 0, pixelsY: 0, panelsX: 0, panelsY: 0 }
  ) {
    this.artnet = artnet;
    this.pixelsX = options.pixelsX;
    this.pixelsY = options.pixelsY;
    this.panelsX = options.panelsX;
    this.panelsY = options.panelsY;
    this.width = this.panelsX * this.pixelsX;
    this.height = this.panelsY * this.pixelsY;
    console.log(this.width, this.height);
    this.effects = [];
  }

  makeImage(img) {
    if (img) {
      this.img = img;
    } else {
      this.img = PImage.make(this.width, this.height);
    }
    this.ctx = this.img.getContext("2d");
  }

  addEffects(effects) {
    effects.forEach(effect => {
      this.effects.push(effect);
      effect.appear();
    });
  }

  removeEffects(effects) {
    let len = effects.length;
    effects.forEach(effect =>
      effect.dispose(() => {
        len--;
        if (len === 0) {
          this.effects = this.effects.filter(e => effects.indexOf(e) === -1);
        }
      })
    );
  }

  draw() {
    this.ctx.fillStyle = "#FF000000";
    this.ctx.fillRect(0, 0, this.width, this.height);

    const copy = [...this.effects];
    copy.forEach(effect => {
      effect.draw(this.ctx, this.width, this.height);
    });
  }

  drawOnPanel() {
    const map = [];
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const universe =
          Math.floor(x / this.pixelsX) +
          this.panelsX * Math.floor(y / this.pixelsY);
        const pixelOnPanel =
          (y % this.pixelsY) * this.pixelsX + (x % this.pixelsX);

        const pixel = this.img.getPixelRGBA(x, y);
        var a = pixel & 255;
        var b = (pixel >> 8) & 255;
        var g = (pixel >> 16) & 255;
        var r = (pixel >> 24) & 255;

        r = (a / 255) * r;
        g = (a / 255) * g;
        b = (a / 255) * b;

        const channel = pixelOnPanel * 3;
        let data = map[universe];
        if (!data) {
          data = map[universe] = [];
        }
        data[channel] = r;
        data[channel + 1] = g;
        data[channel + 2] = b;
      }
    }
    for (let i = 0; i < map.length; i++) {
      this.artnet.set(i, 1, map[i]);
    }
  }

  drawOnHTMLCanvas(ctx) {
    var id = ctx.createImageData(1, 1);
    var d = id.data;
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const pixel = this.img.getPixelRGBA(x, y);
        var a = pixel & 255;
        var b = (pixel >> 8) & 255;
        var g = (pixel >> 16) & 255;
        var r = (pixel >> 24) & 255;
        d[0] = r;
        d[1] = g;
        d[2] = b;
        d[3] = a;
        ctx.putImageData(id, x, y);
      }
    }
  }
};
