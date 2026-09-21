'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var panelAppLoginView = require('./panel-app-login-view.cjs');
var panelAppLoginView_provider = require('./panel-app-login-view.provider.cjs');
var panelAppLoginView_state = require('./panel-app-login-view.state.cjs');
var panelAppLoginView_controller = require('./panel-app-login-view.controller.cjs');

"use strict";
const IBizPanelAppLoginView = vue3Util.withInstall(
  panelAppLoginView.PanelAppLoginView,
  function(v) {
    v.component(panelAppLoginView.PanelAppLoginView.name, panelAppLoginView.PanelAppLoginView);
    runtime.registerPanelItemProvider(
      "CONTAINER_APPLOGINVIEW",
      () => new panelAppLoginView_provider.PanelAppLoginViewProvider()
    );
  }
);

exports.PanelAppLoginViewState = panelAppLoginView_state.PanelAppLoginViewState;
exports.PanelAppLoginViewController = panelAppLoginView_controller.PanelAppLoginViewController;
exports.IBizPanelAppLoginView = IBizPanelAppLoginView;
exports.default = IBizPanelAppLoginView;
