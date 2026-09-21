'use strict';

var core = require('@ibiz-template/core');
var ramda = require('ramda');
var vue = require('vue');

"use strict";
function useEventListener(elRef, eventName, listener, options = {}) {
  let cleanup = core.NOOP;
  vue.watch(
    elRef,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        if (ramda.isNil(newVal)) {
          cleanup();
          cleanup = core.NOOP;
        } else {
          cleanup = core.listenJSEvent(
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
  vue.onBeforeUnmount(() => {
    if (cleanup !== core.NOOP) {
      cleanup();
    }
  });
  return () => {
    cleanup();
  };
}

exports.useEventListener = useEventListener;
