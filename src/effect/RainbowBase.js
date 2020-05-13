var Effect = require("./Effect");
var chroma = require('chroma-js');
module.exports = class RainbowBase extends Effect {
  constructor() {
    super();
    this.i = 0;
  }
  draw(ctx, width, height) {
    this.i += 0.01;
    ctx.fillStyle = `rgba(${chroma(
      [Math.sin(this.i + 0) * 127 + 128,
      Math.sin(this.i + 2) * 127 + 128,
      Math.sin(this.i + 4) * 127 + 128]
    ).rgba().join(",")})`;
  }
};
