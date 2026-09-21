"use strict";
function drawText(text, mouseX, mouseY, color, fontSize, context) {
  context.save();
  context.lineWidth = 1;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.font = "bold ".concat(fontSize, "px none");
  context.fillText(text, mouseX, mouseY);
  context.restore();
}

export { drawText };
