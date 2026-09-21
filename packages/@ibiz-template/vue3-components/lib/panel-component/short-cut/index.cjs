'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var shortCut = require('./short-cut.cjs');
var shortCut_provider = require('./short-cut.provider.cjs');

"use strict";
const IBizShortCut = vue3Util.withInstall(shortCut.ShortCut, function(v) {
  v.component(shortCut.ShortCut.name, shortCut.ShortCut);
  runtime.registerPanelItemProvider("RAWITEM_SHORTCUT", () => new shortCut_provider.ShortCutProvider());
});

exports.IBizShortCut = IBizShortCut;
exports.default = IBizShortCut;
