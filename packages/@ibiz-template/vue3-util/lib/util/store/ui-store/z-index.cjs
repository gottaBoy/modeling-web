'use strict';

var vue = require('vue');

"use strict";
function useZIndexStore() {
  const DEFAULT_INDEX = 500;
  const INCREMENT_VALUE = 1;
  const zIndex = vue.ref(DEFAULT_INDEX);
  function increment() {
    zIndex.value += INCREMENT_VALUE;
    return zIndex.value;
  }
  function decrement() {
    zIndex.value -= INCREMENT_VALUE;
  }
  return { zIndex, increment, decrement };
}

exports.useZIndexStore = useZIndexStore;
