'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var panelButtonList = require('./panel-button-list.cjs');
var panelButtonList_provider = require('./panel-button-list.provider.cjs');
var panelButtonList_controller = require('./panel-button-list.controller.cjs');

"use strict";
const IBizPanelButtonList = vue3Util.withInstall(
  panelButtonList.PanelButtonList,
  function(v) {
    v.component(panelButtonList.PanelButtonList.name, panelButtonList.PanelButtonList);
    runtime.registerPanelItemProvider(
      "BUTTONLIST",
      () => new panelButtonList_provider.PanelButtonListProvider()
    );
  }
);

exports.PanelButtonListController = panelButtonList_controller.PanelButtonListController;
exports.IBizPanelButtonList = IBizPanelButtonList;
exports.default = IBizPanelButtonList;
