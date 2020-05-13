var Effect = require("./Effect");

module.exports = class StaticColor extends Effect {
    constructor(fillStyle = '#FFFFFF') {
        super();
        this.fillStyle = fillStyle;
    }
    draw(ctx, width, height) {
        ctx.fillStyle = this.fillStyle;
    }
};
