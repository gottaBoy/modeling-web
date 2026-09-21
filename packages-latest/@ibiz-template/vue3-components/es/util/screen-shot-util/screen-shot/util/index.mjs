"use strict";
function getMousePosition(event) {
  const mouseX = event.offsetX > 0 ? event.offsetX : 0;
  const mouseY = event.offsetY > 0 ? event.offsetY : 0;
  return { mouseX, mouseY };
}

export { getMousePosition };
