import { NOOP, onClickOutside } from '@ibiz-template/core';
import { isNil } from 'ramda';
import { watch, onBeforeUnmount } from 'vue';

"use strict";
function useClickOutside(elRef, handler, options = {}) {
  let stop = NOOP;
  let pause = NOOP;
  let proceed = NOOP;
  const destroy = () => {
    stop();
    stop = NOOP;
    pause = NOOP;
    proceed = NOOP;
  };
  watch(
    elRef,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        if (isNil(newVal)) {
          destroy();
        } else {
          const result = onClickOutside(
            (newVal == null ? void 0 : newVal.$el) || newVal,
            handler,
            options
          );
          stop = result.stop;
          pause = result.pause;
          proceed = result.proceed;
        }
      }
    },
    { immediate: true }
  );
  onBeforeUnmount(() => {
    if (stop !== NOOP) {
      destroy();
    }
  });
  return {
    stop: () => stop(),
    pause: () => pause(),
    proceed: () => proceed()
  };
}

export { useClickOutside };
