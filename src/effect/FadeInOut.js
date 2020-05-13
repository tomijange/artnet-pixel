var Effect = require("./Effect");
var chroma = require("chroma-js");

module.exports = class FadeInOut extends Effect {
    constructor(speed = 256/8) {
    super();
      this.mode = "idle";
      this.speed = speed;
  }

  appear() {
    this.in();
  }

  dispose(cb) {
    this.out();
    this.cb = cb;
  }

  in() {
    this.mode = "in";
    this.alpha = 0;
  }
  out() {
    this.mode = "out";
    this.alpha = 1;
  }

  draw(ctx, width, height) {
    if (this.mode === "in") {
      this.alpha += this.speed * 1 / 256;
    }
    if (this.mode === "out") {
      this.alpha -= this.speed * 1 / 256;
    }
    if (this.alpha >= 1 || this.alpha <= 0) {
      this.mode = "idle";
      if (this.cb) {
        this.cb();
        this.cb = null;
        }
        this.alpha = Math.max(0, Math.min(1, this.alpha));
    }

    ctx.fillStyle = `rgba(${chroma(ctx.fillStyle)
      .alpha(this.alpha)
      .rgba()
      .join(",")})`;
  }
};
