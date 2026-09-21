'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var dataView = require('./data-view.cjs');
var dataView_provider = require('./data-view.provider.cjs');

"use strict";
const IBizDataViewControl = vue3Util.withInstall(
  dataView.DataViewControl,
  function(v) {
    v.component(dataView.DataViewControl.name, dataView.DataViewControl);
    runtime.registerControlProvider(
      runtime.ControlType.DATAVIEW,
      () => new dataView_provider.DataViewControlProvider()
    );
  }
);

exports.DataViewControlProvider = dataView_provider.DataViewControlProvider;
exports.IBizDataViewControl = IBizDataViewControl;
exports.default = IBizDataViewControl;
