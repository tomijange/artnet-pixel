var Effect = require("./Effect");
var PImage = require("pureimage");

var fnt = PImage.registerFont("SourceSansPro-Regular.ttf", "Source Sans Pro");
fnt.load();

module.exports = class Text extends Effect {
  constructor(txt = "", x = 0, y = 0) {
    super();
    this.x = x;
    this.y = y;
    this.size = 24;
    this.txt = txt;

    this.scroll = 0;
  }

  draw(ctx, width, height) {
    if (!fnt.loaded) {
      console.log("font not loaded");
      return;
    }
    // ctx.fillStyle = this.fillStyle;

    ctx.font = `${this.size}pt 'Source Sans Pro'`;
      const measuring = ctx.measureText(this.txt);
      const overflow = measuring.width >= width;
    if (overflow) {
      this.scroll++;
        if (this.scroll > measuring.width+width) {
        this.scroll = 0;
      }
    }
    ctx.fillText(this.txt, this.x - (overflow?this.scroll - width:this.scroll), this.y);
  }
};
