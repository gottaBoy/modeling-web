import { ref } from 'vue';
import { useClickOutside } from '../click-outside/click-outside.mjs';
import { useEventListener } from '../event/event.mjs';

"use strict";
function useFocusAndBlur(focus, blur) {
  const componentRef = ref();
  const isFocus = ref(false);
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
  useEventListener(
    componentRef,
    "click",
    (_evt) => {
      if (!isFocus.value) {
        outsideFuns = useClickOutside(componentRef, () => {
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

export { useFocusAndBlur };
