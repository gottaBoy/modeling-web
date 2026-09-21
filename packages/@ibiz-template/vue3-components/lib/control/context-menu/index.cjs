'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var contextMenu = require('./context-menu.cjs');
var contextMenu_provider = require('./context-menu.provider.cjs');

"use strict";
const IBizContextMenuControl = vue3Util.withInstall(
  contextMenu.ContextMenuControl,
  function(v) {
    v.component(contextMenu.ContextMenuControl.name, contextMenu.ContextMenuControl);
    runtime.registerControlProvider(
      runtime.ControlType.CONTEXT_MENU,
      () => new contextMenu_provider.ContextMenuProvider()
    );
  }
);

exports.IBizContextMenuControl = IBizContextMenuControl;
exports.default = IBizContextMenuControl;
