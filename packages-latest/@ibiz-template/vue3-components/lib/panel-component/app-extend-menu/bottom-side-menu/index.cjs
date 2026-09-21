'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var bottomSideMenu = require('./bottom-side-menu.cjs');
var bottomSideMenu_provider = require('./bottom-side-menu.provider.cjs');

"use strict";
var IBizBottomSideMenu = {
  install(app) {
    app.component(bottomSideMenu.BottomSideMenu.name, bottomSideMenu.BottomSideMenu);
    runtime.registerPanelItemProvider(
      "RAWITEM_PREDEFINE_BOTTOM_SIDE_MENU",
      () => new bottomSideMenu_provider.BottomSideMenuProvider()
    );
  }
};

exports.default = IBizBottomSideMenu;
