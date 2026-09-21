'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var globalSearch_provider = require('./global-search.provider.cjs');
var globalSearch = require('./global-search.cjs');

"use strict";
const IBizGlobalSearch = vue3Util.withInstall(globalSearch.GlobalSearch, function(v) {
  v.component(globalSearch.GlobalSearch.name, globalSearch.GlobalSearch);
  runtime.registerPanelItemProvider(
    "RAWITEM_GLOBAL_SEARCH",
    () => new globalSearch_provider.GlobalSearchProvider()
  );
});

exports.IBizGlobalSearch = IBizGlobalSearch;
exports.default = IBizGlobalSearch;
