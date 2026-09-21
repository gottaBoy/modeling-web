'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var map = require('./map.cjs');
var map_provider = require('./map.provider.cjs');

"use strict";
const IBizMapControl = {
  install(v) {
    v.component(map.default.name, map.default);
    runtime.registerControlProvider(runtime.ControlType.MAP, () => new map_provider.MapProvider());
  }
};

exports.IBizMapControl = IBizMapControl;
exports.default = IBizMapControl;
