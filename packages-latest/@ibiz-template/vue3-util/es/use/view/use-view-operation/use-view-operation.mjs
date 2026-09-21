import { listenJSEvent } from '@ibiz-template/core';
import { onMounted, onUnmounted } from 'vue';

"use strict";
function useViewOperation(view) {
  let listenJSEventFuncs = [];
  onMounted(() => {
    const viewElement = document.getElementById(view.id);
    const listenJSEventNames = ["keydown", "click"];
    if (!viewElement)
      return;
    listenJSEventFuncs = listenJSEventNames.map((eventName) => {
      return listenJSEvent(
        viewElement,
        eventName,
        (event) => {
          view.setOperateState("MANUAL");
        },
        { once: true, capture: true }
      );
    });
  });
  onUnmounted(() => {
    if (listenJSEventFuncs && listenJSEventFuncs.length > 0) {
      listenJSEventFuncs.forEach((listenJSEventFunc) => {
        listenJSEventFunc();
      });
    }
  });
}

export { useViewOperation };
