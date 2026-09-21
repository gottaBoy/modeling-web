'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var navPosIndex = require('./nav-pos-index.cjs');
var navPosIndex_provider = require('./nav-pos-index.provider.cjs');
var navPosIndex_state = require('./nav-pos-index.state.cjs');
var navPosIndex_controller = require('./nav-pos-index.controller.cjs');

"use strict";
const IBizNavPosIndex = vue3Util.withInstall(navPosIndex.NavPosIndex, function(v) {
  v.component(navPosIndex.NavPosIndex.name, navPosIndex.NavPosIndex);
  runtime.registerPanelItemProvider(
    "RAWITEM_NAV_POS_INDEX",
    () => new navPosIndex_provider.NavPosIndexProvider()
  );
});

exports.NavPosIndexState = navPosIndex_state.NavPosIndexState;
exports.NavPosIndexController = navPosIndex_controller.NavPosIndexController;
exports.IBizNavPosIndex = IBizNavPosIndex;
exports.default = IBizNavPosIndex;
