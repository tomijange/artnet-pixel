var options = {
  host: "192.168.178.255",
  refresh: 40,
  sendAll: true
};

var artnet = require("artnet")(options);
var PImage = require("pureimage");
var fs = require("fs");
var PixelDraw = require("./src/PixelDraw");
var Text = require("./src/effect/Text");
var RainbowBase = require("./src/effect/RainbowBase");
var Glitch = require("./src/effect/Glitch");
var FadeInOut = require("./src/effect/FadeInOut");
var StaticColor = require("./src/effect/StaticColor");
var Background = require("./src/effect/Background");

const pixelsX = 12;
const pixelsY = 12;
// get dimensions of matrix
const panelsX = 6;
const panelsY = 2;

var pixelDraw = new PixelDraw(artnet, { pixelsX, pixelsY, panelsX, panelsY });
pixelDraw.makeImage();

let canvas = document.createElement("canvas");
canvas.width = pixelDraw.width;
canvas.height = pixelDraw.height;
canvas.style.height = "100%";
canvas.style.width = "100%";
document.querySelector(".preview").appendChild(canvas);
let htmlCtx = canvas.getContext("2d");

const loop = setInterval(() => {
  pixelDraw.draw();
  pixelDraw.drawOnPanel();
  pixelDraw.drawOnHTMLCanvas(htmlCtx);
}, 40);
pixelDraw.addEffects([new RainbowBase()]);

let elements = document.getElementsByClassName("static-text");

var current;

for (let i = 0; i < elements.length; i++) {
  elements.item(i).addEventListener("click", function(e) {
      show(e.target.textContent.trim());
    // pixelDraw.addEffect(new Glitch());
  });
}

document.getElementById('blackout').addEventListener('click',() => {
    hide();
})

function show(str) {
    hide();
    current = [
      new FadeInOut(),
      new Text(str, 4, 20)
    ];

    pixelDraw.addEffects(current);
}

function hide() {
    if (current) {
        pixelDraw.removeEffects(current);
        current = null;
    }
}