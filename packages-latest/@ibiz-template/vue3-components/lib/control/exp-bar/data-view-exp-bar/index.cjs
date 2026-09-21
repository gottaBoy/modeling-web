'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var dataViewViewExpBar = require('./data-view-view-exp-bar.cjs');
var dataViewExpBar_provider = require('./data-view-exp-bar.provider.cjs');

"use strict";
const IBizDataViewExpBarControl = vue3Util.withInstall(
  dataViewViewExpBar.DataViewExpBarControl,
  function(v) {
    v.component(dataViewViewExpBar.DataViewExpBarControl.name, dataViewViewExpBar.DataViewExpBarControl);
    runtime.registerControlProvider(
      runtime.ControlType.DATA_VIEW_EXPBAR,
      () => new dataViewExpBar_provider.DataViewExpBarProvider()
    );
  }
);

exports.IBizDataViewExpBarControl = IBizDataViewExpBarControl;
exports.default = IBizDataViewExpBarControl;
