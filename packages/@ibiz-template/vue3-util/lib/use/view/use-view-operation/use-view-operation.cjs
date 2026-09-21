'use strict';

var core = require('@ibiz-template/core');
var vue = require('vue');

"use strict";
function useViewOperation(view) {
  let listenJSEventFuncs = [];
  vue.onMounted(() => {
    const viewElement = document.getElementById(view.id);
    const listenJSEventNames = ["keydown", "click"];
    if (!viewElement)
      return;
    listenJSEventFuncs = listenJSEventNames.map((eventName) => {
      return core.listenJSEvent(viewElement, eventName, (event) => {
        view.setOperateState("MANUAL");
      });
    });
  });
  vue.onUnmounted(() => {
    if (listenJSEventFuncs && listenJSEventFuncs.length > 0) {
      listenJSEventFuncs.forEach((listenJSEventFunc) => {
        listenJSEventFunc();
      });
    }
  });
}

exports.useViewOperation = useViewOperation;
