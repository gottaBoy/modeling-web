'use strict';

"use strict";
function drawRectangle(mouseX, mouseY, width, height, color, borderWidth, context) {
  context.save();
  context.strokeStyle = color;
  context.lineWidth = borderWidth;
  context.beginPath();
  context.rect(mouseX, mouseY, width, height);
  context.stroke();
  context.restore();
}

exports.drawRectangle = drawRectangle;
