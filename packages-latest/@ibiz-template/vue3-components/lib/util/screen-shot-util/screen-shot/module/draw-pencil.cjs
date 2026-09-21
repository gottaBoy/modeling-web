'use strict';

"use strict";
function initPencil(context, mouseX, mouseY) {
  context.beginPath();
  context.moveTo(mouseX, mouseY);
}
function drawPencil(context, mouseX, mouseY, size, color) {
  context.save();
  context.lineWidth = size;
  context.strokeStyle = color;
  context.lineTo(mouseX, mouseY);
  context.stroke();
  context.restore();
}

exports.drawPencil = drawPencil;
exports.initPencil = initPencil;
