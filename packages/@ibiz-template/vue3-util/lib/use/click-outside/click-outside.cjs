'use strict';

var core = require('@ibiz-template/core');
var ramda = require('ramda');
var vue = require('vue');

"use strict";
function useClickOutside(elRef, handler, options = {}) {
  let stop = core.NOOP;
  let pause = core.NOOP;
  let proceed = core.NOOP;
  const destroy = () => {
    stop();
    stop = core.NOOP;
    pause = core.NOOP;
    proceed = core.NOOP;
  };
  vue.watch(
    elRef,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        if (ramda.isNil(newVal)) {
          destroy();
        } else {
          const result = core.onClickOutside(
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
  vue.onBeforeUnmount(() => {
    if (stop !== core.NOOP) {
      destroy();
    }
  });
  return {
    stop: () => stop(),
    pause: () => pause(),
    proceed: () => proceed()
  };
}

exports.useClickOutside = useClickOutside;
