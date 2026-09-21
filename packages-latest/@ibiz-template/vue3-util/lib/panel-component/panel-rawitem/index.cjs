'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
require('../../util/index.cjs');
var panelRawitem = require('./panel-rawitem.cjs');
var panelRawitem_provider = require('./panel-rawitem.provider.cjs');
var panelRawitem_controller = require('./panel-rawitem.controller.cjs');
var install = require('../../util/install.cjs');

"use strict";
const IBizPanelRawItem = install.withInstall(panelRawitem.PanelRawItem, function(v) {
  v.component(panelRawitem.PanelRawItem.name, panelRawitem.PanelRawItem);
  runtime.registerPanelItemProvider("RAWITEM", () => new panelRawitem_provider.PanelRawItemProvider());
  runtime.registerPanelItemProvider(
    "RAWITEM_STATIC_IMAGE",
    () => new panelRawitem_provider.PanelRawItemProvider()
  );
  runtime.registerPanelItemProvider(
    "RAWITEM_STATIC_LABEL",
    () => new panelRawitem_provider.PanelRawItemProvider()
  );
  runtime.registerPanelItemProvider(
    "RAWITEM_STATIC_TEXT",
    () => new panelRawitem_provider.PanelRawItemProvider()
  );
});

exports.PanelRawItemController = panelRawitem_controller.PanelRawItemController;
exports.IBizPanelRawItem = IBizPanelRawItem;
exports.default = IBizPanelRawItem;
