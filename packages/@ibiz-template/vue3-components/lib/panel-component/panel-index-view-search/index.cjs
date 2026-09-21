'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var panelIndexViewSearch = require('./panel-index-view-search.cjs');
var panelIndexViewSearch_provider = require('./panel-index-view-search.provider.cjs');

"use strict";
const IBizPanelIndexViewSearch = vue3Util.withInstall(
  panelIndexViewSearch.PanelIndexViewSearch,
  function(v) {
    v.component(panelIndexViewSearch.PanelIndexViewSearch.name, panelIndexViewSearch.PanelIndexViewSearch);
    runtime.registerPanelItemProvider(
      "RAWITEM_INDEX_VIEW_SEARCH",
      () => new panelIndexViewSearch_provider.PanelIndexViewSearchProvider()
    );
  }
);

exports.IBizPanelIndexViewSearch = IBizPanelIndexViewSearch;
exports.default = IBizPanelIndexViewSearch;
