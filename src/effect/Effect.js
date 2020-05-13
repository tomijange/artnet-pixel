module.exports = class Effect {
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx, width, height) {}

  appear() {}
    dispose(cb) { cb();}
};
