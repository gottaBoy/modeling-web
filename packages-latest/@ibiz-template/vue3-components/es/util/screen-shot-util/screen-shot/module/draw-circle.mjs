"use strict";
function drawCircle(context, mouseX, mouseY, mouseStartX, mouseStartY, borderWidth, color) {
  const startX = mouseX < mouseStartX ? mouseX : mouseStartX;
  const startY = mouseY < mouseStartY ? mouseY : mouseStartY;
  const endX = mouseX >= mouseStartX ? mouseX : mouseStartX;
  const endY = mouseY >= mouseStartY ? mouseY : mouseStartY;
  const radiusX = (endX - startX) * 0.5;
  const radiusY = (endY - startY) * 0.5;
  const centerX = startX + radiusX;
  const centerY = startY + radiusY;
  context.save();
  context.beginPath();
  context.lineWidth = borderWidth;
  context.strokeStyle = color;
  if (typeof context.ellipse === "function") {
    context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
  } else {
    throw new Error("\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301ellipse\uFF0C\u65E0\u6CD5\u7ED8\u5236\u692D\u5706");
  }
  context.stroke();
  context.closePath();
  context.restore();
}

export { drawCircle };
