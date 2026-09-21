import { listenJSEvent } from '@ibiz-template/core';

"use strict";
function useFocusByEnter(target = document, querySelects = [
  "a",
  "input",
  "button",
  "textarea",
  "select",
  '[tabindex]:not([tabindex="-1"])'
], callback) {
  const querySelector = querySelects.join(",");
  const listener = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const currentElement = document.activeElement;
      const focusableElements = Array.from(
        target.querySelectorAll(querySelector)
      );
      const currentIndex = focusableElements.indexOf(currentElement);
      const nextElement = focusableElements[currentIndex + 1];
      if (nextElement) {
        nextElement.focus();
      } else {
        callback == null ? void 0 : callback();
      }
    }
  };
  const cleanup = listenJSEvent(window, "keydown", listener, {
    capture: true
  });
  return { cleanup };
}

export { useFocusByEnter };
