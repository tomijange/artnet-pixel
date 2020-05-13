var Effect = require("./Effect");

module.exports = class Background extends Effect {
  constructor(fillStyle = "#000000") {
    super();
    this.fillStyle = fillStyle;
  }
  draw(ctx, width, height) {
    ctx.fillStyle = this.fillStyle;
    ctx.fillRect(0, 0, width, height);
  }
};
