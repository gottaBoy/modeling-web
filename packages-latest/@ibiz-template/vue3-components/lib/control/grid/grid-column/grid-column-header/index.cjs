'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var gridColumnHeader = require('./grid-column-header.cjs');

"use strict";
const IBizGridColumnHeader = vue3Util.withInstall(
  gridColumnHeader.GridColumnHeader,
  function(v) {
    v.component(gridColumnHeader.GridColumnHeader.name, gridColumnHeader.GridColumnHeader);
  }
);

exports.IBizGridColumnHeader = IBizGridColumnHeader;
exports.default = IBizGridColumnHeader;
