'use strict';

var qxUtil = require('qx-util');
var vue = require('vue');
var core = require('@ibiz-template/core');
require('../../util/index.cjs');
var uiStore = require('../../util/store/ui-store/ui-store.cjs');

"use strict";
function useControlPopoverzIndex(controller) {
  const { zIndex } = uiStore.useUIStore();
  controller.state.zIndex = zIndex.increment();
  vue.onUnmounted(() => {
    zIndex.decrement();
  });
}
function usePopoverzIndex() {
  const popoverid = "popover_".concat(qxUtil.createUUID());
  const setPopoverZIndex = (zIndexClass) => {
    const { zIndex } = uiStore.useUIStore();
    const transfer = document.getElementsByClassName(popoverid);
    const modalZIndex = zIndex.increment();
    if (transfer && transfer.length > 0 && zIndexClass) {
      for (let i = 0; i < transfer.length; i++) {
        transfer[i].style.setProperty(
          zIndexClass,
          "".concat(modalZIndex)
        );
      }
    }
  };
  return {
    popoverid,
    setPopoverZIndex
  };
}
function shareCommonAncestor(element1, element2) {
  if (!element1 || !element2)
    return false;
  if (element1 === element2)
    return true;
  const ancestorsOfElement1 = /* @__PURE__ */ new Set();
  let current = element1;
  while (current) {
    ancestorsOfElement1.add(current);
    const parentNode = current.parentNode;
    if (parentNode && (parentNode.nodeName === "BODY" || parentNode.nodeName === "HTML")) {
      current = null;
    } else {
      current = parentNode;
    }
  }
  current = element2;
  while (current) {
    if (ancestorsOfElement1.has(current)) {
      return true;
    }
    current = current.parentNode;
  }
  return false;
}
function usePopoverVisible(triggerRef, getElement) {
  let cleanup;
  const popoverVisible = vue.ref(false);
  const setPopoverVisible = (visible) => {
    popoverVisible.value = visible;
  };
  vue.watch(
    () => triggerRef.value,
    (newValue) => {
      if (newValue && !cleanup) {
        cleanup = core.listenJSEvent(
          window,
          "click",
          (evt) => {
            if (popoverVisible.value && triggerRef.value) {
              const result = shareCommonAncestor(
                getElement(triggerRef.value),
                evt.target
              );
              if (result) {
                popoverVisible.value = false;
              }
            }
          },
          { capture: true }
        );
      }
    },
    { immediate: true }
  );
  vue.onUnmounted(() => {
    cleanup == null ? void 0 : cleanup();
  });
  return {
    popoverVisible,
    setPopoverVisible
  };
}

exports.shareCommonAncestor = shareCommonAncestor;
exports.useControlPopoverzIndex = useControlPopoverzIndex;
exports.usePopoverVisible = usePopoverVisible;
exports.usePopoverzIndex = usePopoverzIndex;
