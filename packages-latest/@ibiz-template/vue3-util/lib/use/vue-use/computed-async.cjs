'use strict';

var core = require('@ibiz-template/core');
var vue = require('vue');

"use strict";
function computedAsync(evaluationCallback, initialState, optionsOrRef) {
  let options;
  if (vue.isRef(optionsOrRef)) {
    options = {
      evaluating: optionsOrRef
    };
  } else {
    options = optionsOrRef || {};
  }
  const {
    lazy = false,
    flush = "pre",
    evaluating = void 0,
    shallow = true,
    onError = core.NOOP
  } = options;
  const started = vue.shallowRef(!lazy);
  const current = shallow ? vue.shallowRef(initialState) : vue.ref(initialState);
  let counter = 0;
  vue.watchEffect(
    async (onInvalidate) => {
      if (!started.value)
        return;
      counter++;
      const counterAtBeginning = counter;
      let hasFinished = false;
      if (evaluating) {
        Promise.resolve().then(() => {
          evaluating.value = true;
        });
      }
      try {
        const result = await evaluationCallback((cancelCallback) => {
          onInvalidate(() => {
            if (evaluating)
              evaluating.value = false;
            if (!hasFinished)
              cancelCallback();
          });
        });
        if (counterAtBeginning === counter)
          current.value = result;
      } catch (e) {
        onError(e);
      } finally {
        if (evaluating && counterAtBeginning === counter)
          evaluating.value = false;
        hasFinished = true;
      }
    },
    { flush }
  );
  if (lazy) {
    return vue.computed(() => {
      started.value = true;
      return current.value;
    });
  }
  return current;
}

exports.computedAsync = computedAsync;
