'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue3Util = require('@ibiz-template/vue3-util');
var runtime = require('@ibiz-template/runtime');
var panelRememberMe = require('./panel-remember-me.cjs');
var panelRememberMe_provider = require('./panel-remember-me.provider.cjs');
var panelRememberMe_state = require('./panel-remember-me.state.cjs');
var panelRememberMe_controller = require('./panel-remember-me.controller.cjs');

"use strict";
const IBizPanelRememberMe = vue3Util.withInstall(
  panelRememberMe.PanelRememberMe,
  function(v) {
    v.component(panelRememberMe.PanelRememberMe.name, panelRememberMe.PanelRememberMe);
    runtime.registerPanelItemProvider(
      "CONTAINER_REMEMBER_ME",
      () => new panelRememberMe_provider.PanelRememberMeProvider()
    );
    runtime.registerPanelItemProvider(
      "FIELD_AUTH_REMEMBERME",
      () => new panelRememberMe_provider.PanelRememberMeProvider()
    );
  }
);

exports.PanelRememberMeState = panelRememberMe_state.PanelRememberMeState;
exports.PanelRememberMeController = panelRememberMe_controller.PanelRememberMeController;
exports.IBizPanelRememberMe = IBizPanelRememberMe;
exports.default = IBizPanelRememberMe;
