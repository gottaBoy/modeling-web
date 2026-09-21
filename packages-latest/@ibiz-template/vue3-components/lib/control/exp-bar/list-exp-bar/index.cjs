'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var listExpBar = require('./list-exp-bar.cjs');
var listExpBar_provider = require('./list-exp-bar.provider.cjs');

"use strict";
const IBizListExpBarControl = vue3Util.withInstall(
  listExpBar.ListExpBarControl,
  function(v) {
    v.component(listExpBar.ListExpBarControl.name, listExpBar.ListExpBarControl);
    runtime.registerControlProvider(
      runtime.ControlType.LIST_EXPBAR,
      () => new listExpBar_provider.ListExpBarProvider()
    );
  }
);

exports.IBizListExpBarControl = IBizListExpBarControl;
exports.default = IBizListExpBarControl;
