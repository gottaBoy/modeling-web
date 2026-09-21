import { NOOP, listenJSEvent } from '@ibiz-template/core';
import { isNil } from 'ramda';
import { watch, onBeforeUnmount } from 'vue';

"use strict";
function useEventListener(elRef, eventName, listener, options = {}) {
  let cleanup = NOOP;
  watch(
    elRef,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        if (isNil(newVal)) {
          cleanup();
          cleanup = NOOP;
        } else {
          cleanup = listenJSEvent(
            (newVal == null ? void 0 : newVal.$el) || newVal,
            eventName,
            listener,
            options
          );
        }
      }
    },
    { immediate: true }
  );
  onBeforeUnmount(() => {
    if (cleanup !== NOOP) {
      cleanup();
    }
  });
  return () => {
    cleanup();
  };
}

export { useEventListener };
