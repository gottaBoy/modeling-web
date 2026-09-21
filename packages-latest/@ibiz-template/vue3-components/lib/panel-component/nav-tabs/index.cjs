'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var navTabs = require('./nav-tabs.cjs');
var navTabs_provider = require('./nav-tabs.provider.cjs');
var navTabs_controller = require('./nav-tabs.controller.cjs');
var navTabs_state = require('./nav-tabs.state.cjs');

"use strict";
const IBizNavTabs = vue3Util.withInstall(navTabs.NavTabs, function(v) {
  v.component(navTabs.NavTabs.name, navTabs.NavTabs);
  runtime.registerPanelItemProvider("RAWITEM_NAV_TABS", () => new navTabs_provider.NavTabsProvider());
});

exports.NavTabsController = navTabs_controller.NavTabsController;
exports.NavTabsState = navTabs_state.NavTabsState;
exports.IBizNavTabs = IBizNavTabs;
exports.default = IBizNavTabs;
