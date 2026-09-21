'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var topSideMenu = require('./top-side-menu.cjs');
var topSideMenu_provider = require('./top-side-menu.provider.cjs');

"use strict";
var IBizTopSideMenu = {
  install(app) {
    app.component(topSideMenu.TopSideMenu.name, topSideMenu.TopSideMenu);
    runtime.registerPanelItemProvider(
      "RAWITEM_PREDEFINE_TOP_SIDE_MENU",
      () => new topSideMenu_provider.TopSideMenuProvider()
    );
  }
};

exports.default = IBizTopSideMenu;
