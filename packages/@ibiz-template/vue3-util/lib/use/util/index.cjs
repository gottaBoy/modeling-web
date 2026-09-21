'use strict';

var vue = require('vue');

"use strict";
function useCtx() {
  return vue.inject("ctx");
}
function useMobCtx() {
  return vue.inject("ctx");
}

exports.useCtx = useCtx;
exports.useMobCtx = useMobCtx;
