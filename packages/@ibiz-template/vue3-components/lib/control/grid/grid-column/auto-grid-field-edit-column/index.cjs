'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var autoGridFieldEditColumn = require('./auto-grid-field-edit-column.cjs');
var autoGridFieldEditColumn_provider = require('./auto-grid-field-edit-column.provider.cjs');

"use strict";
const IBizDynamicGridFieldEditColumn = vue3Util.withInstall(
  autoGridFieldEditColumn.AutoGridFieldEditColumn,
  function(v) {
    v.component(autoGridFieldEditColumn.AutoGridFieldEditColumn.name, autoGridFieldEditColumn.AutoGridFieldEditColumn);
    runtime.registerGridColumnProvider(
      "AUTO_DEFGRIDCOLUMN_EDIT",
      () => new autoGridFieldEditColumn_provider.AutoGridFieldEditColumnProvider()
    );
  }
);

exports.IBizDynamicGridFieldEditColumn = IBizDynamicGridFieldEditColumn;
exports.default = IBizDynamicGridFieldEditColumn;
