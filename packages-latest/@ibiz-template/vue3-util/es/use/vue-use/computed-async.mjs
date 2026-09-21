import { NOOP } from '@ibiz-template/core';
import { isRef, shallowRef, ref, watchEffect, computed } from 'vue';

"use strict";
function computedAsync(evaluationCallback, initialState, optionsOrRef) {
  let options;
  if (isRef(optionsOrRef)) {
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
    onError = NOOP
  } = options;
  const started = shallowRef(!lazy);
  const current = shallow ? shallowRef(initialState) : ref(initialState);
  let counter = 0;
  watchEffect(
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
    return computed(() => {
      started.value = true;
      return current.value;
    });
  }
  return current;
}

export { computedAsync };
