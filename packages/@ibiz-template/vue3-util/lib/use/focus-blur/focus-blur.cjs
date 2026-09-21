'use strict';

var vue = require('vue');
var clickOutside = require('../click-outside/click-outside.cjs');
var event = require('../event/event.cjs');

"use strict";
function useFocusAndBlur(focus, blur) {
  const componentRef = vue.ref();
  const isFocus = vue.ref(false);
  let outsideFuns;
  const doBlur = () => {
    if (!isFocus.value) {
      ibiz.log.debug(ibiz.i18n.t("vue3Util.use.focusBlur.noFocus"));
    }
    blur();
    outsideFuns.stop();
    isFocus.value = false;
  };
  const pause = () => {
    if (outsideFuns) {
      outsideFuns.pause();
    }
  };
  const stop = () => {
    if (outsideFuns) {
      outsideFuns.stop();
    }
  };
  event.useEventListener(
    componentRef,
    "click",
    (_evt) => {
      if (!isFocus.value) {
        outsideFuns = clickOutside.useClickOutside(componentRef, () => {
          doBlur();
        });
        isFocus.value = true;
        focus();
      }
    },
    { capture: true }
    // 捕获防止内部ui拦截点击事件
  );
  return { componentRef, isFocus, doBlur, pause, stop };
}

exports.useFocusAndBlur = useFocusAndBlur;
