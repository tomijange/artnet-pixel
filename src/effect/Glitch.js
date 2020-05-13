var Effect = require("./Effect");

module.exports = class Glitch extends Effect {
  draw(ctx, width, height) {
    if (Math.random() < 0.4) {
      ctx.fillStyle = "#000000";
      const x = Math.random() * width;
      const y = Math.random() * height;
      ctx.fillRect(x, y, Math.min(width - x, Math.random() * width), Math.min(height-y, Math.random() * height));
    }
  }
};
