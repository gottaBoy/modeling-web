'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var leftSideMenu = require('./left-side-menu.cjs');
var leftSideMenu_provider = require('./left-side-menu.provider.cjs');

"use strict";
var IBizLeftSideMenu = {
  install(app) {
    app.component(leftSideMenu.LeftSideMenu.name, leftSideMenu.LeftSideMenu);
    runtime.registerPanelItemProvider(
      "RAWITEM_PREDEFINE_LEFT_SIDE_MENU",
      () => new leftSideMenu_provider.LeftSideMenuProvider()
    );
  }
};

exports.default = IBizLeftSideMenu;
