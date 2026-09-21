"use strict";
const getAxisColor = (imgData, x, y) => {
  const w = imgData.width;
  const d = imgData.data;
  const color = [];
  color[0] = d[4 * (y * w + x)];
  color[1] = d[4 * (y * w + x) + 1];
  color[2] = d[4 * (y * w + x) + 2];
  color[3] = d[4 * (y * w + x) + 3];
  return color;
};
const setAxisColor = (imgData, x, y, color) => {
  const w = imgData.width;
  const d = imgData.data;
  d[4 * (y * w + x)] = color[0];
  d[4 * (y * w + x) + 1] = color[1];
  d[4 * (y * w + x) + 2] = color[2];
  d[4 * (y * w + x) + 3] = color[3];
};
function drawMosaic(mouseX, mouseY, size, degreeOfBlur, context) {
  const dpr = window.devicePixelRatio || 1;
  const imgData = context.getImageData(
    mouseX * dpr,
    mouseY * dpr,
    size * dpr,
    size * dpr
  );
  const w = imgData.width;
  const h = imgData.height;
  const stepW = w / degreeOfBlur;
  const stepH = h / degreeOfBlur;
  for (let i = 0; i < stepH; i++) {
    for (let j = 0; j < stepW; j++) {
      const color = getAxisColor(
        imgData,
        j * degreeOfBlur + Math.floor(Math.random() * degreeOfBlur),
        i * degreeOfBlur + Math.floor(Math.random() * degreeOfBlur)
      );
      for (let k = 0; k < degreeOfBlur; k++) {
        for (let l = 0; l < degreeOfBlur; l++) {
          setAxisColor(
            imgData,
            j * degreeOfBlur + l,
            i * degreeOfBlur + k,
            color
          );
        }
      }
    }
  }
  context.putImageData(imgData, mouseX * dpr, mouseY * dpr);
}

export { drawMosaic };
