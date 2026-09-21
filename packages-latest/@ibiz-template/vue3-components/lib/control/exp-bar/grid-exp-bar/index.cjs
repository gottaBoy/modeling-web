'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var gridExpBar = require('./grid-exp-bar.cjs');
var gridExpBar_provider = require('./grid-exp-bar.provider.cjs');

"use strict";
const IBizGridExpBarControl = vue3Util.withInstall(
  gridExpBar.GridExpBarControl,
  function(v) {
    v.component(gridExpBar.GridExpBarControl.name, gridExpBar.GridExpBarControl);
    runtime.registerControlProvider(
      runtime.ControlType.GRID_EXPBAR,
      () => new gridExpBar_provider.GridExpBarProvider()
    );
  }
);

exports.IBizGridExpBarControl = IBizGridExpBarControl;
exports.default = IBizGridExpBarControl;
