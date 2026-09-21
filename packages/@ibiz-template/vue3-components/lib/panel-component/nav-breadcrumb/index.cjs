'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var navBreadcrumb = require('./nav-breadcrumb.cjs');
var navBreadcrumb_provider = require('./nav-breadcrumb.provider.cjs');
var navBreadcrumb_controller = require('./nav-breadcrumb.controller.cjs');
var navBreadcrumb_state = require('./nav-breadcrumb.state.cjs');

"use strict";
const IBizNavBreadcrumb = vue3Util.withInstall(navBreadcrumb.NavBreadcrumb, function(v) {
  v.component(navBreadcrumb.NavBreadcrumb.name, navBreadcrumb.NavBreadcrumb);
  runtime.registerPanelItemProvider(
    "RAWITEM_NAV_BREADCRUMB",
    () => new navBreadcrumb_provider.NavBreadcrumbProvider()
  );
});

exports.NavBreadcrumbController = navBreadcrumb_controller.NavBreadcrumbController;
exports.NavBreadcrumbState = navBreadcrumb_state.NavBreadcrumbState;
exports.IBizNavBreadcrumb = IBizNavBreadcrumb;
exports.default = IBizNavBreadcrumb;
