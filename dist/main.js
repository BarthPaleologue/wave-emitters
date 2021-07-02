"use strict";
let canvas = document.getElementById("renderer");
let ctx = canvas.getContext("2d");
let emitters = [];
for (let i = 0; i < 20; i++) {
    emitters.push([Math.random() * 600, Math.random() * 600]);
}
ctx.fillStyle = "black";
ctx === null || ctx === void 0 ? void 0 : ctx.fillRect(0, 0, 600, 600);
ctx === null || ctx === void 0 ? void 0 : ctx.fill();
for (let x = 0; x < 600; x++) {
    for (let y = 0; y < 600; y++) {
        let value = 0;
        for (let i = 0; i < emitters.length; i++) {
            let r = Math.sqrt(Math.pow((x - emitters[i][0]), 2) + Math.pow((y - emitters[i][1]), 2));
            value += 255 * (1 + Math.sin(r)) / (0.01 * r);
        }
        value /= emitters.length;
        value = Math.round(value);
        ctx.fillStyle = `rgb(${value}, ${value}, ${value})`;
        ctx === null || ctx === void 0 ? void 0 : ctx.fillRect(x, y, 1, 1);
        ctx === null || ctx === void 0 ? void 0 : ctx.fill();
    }
}
