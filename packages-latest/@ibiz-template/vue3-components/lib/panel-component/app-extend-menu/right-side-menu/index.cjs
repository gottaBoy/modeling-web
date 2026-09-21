'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var rightSideMenu = require('./right-side-menu.cjs');
var rightSideMenu_provider = require('./right-side-menu.provider.cjs');

"use strict";
var IBizRightSideMenu = {
  install(app) {
    app.component(rightSideMenu.RightSideMenu.name, rightSideMenu.RightSideMenu);
    runtime.registerPanelItemProvider(
      "RAWITEM_PREDEFINE_RIGHT_SIDE_MENU",
      () => new rightSideMenu_provider.RightSideMenuProvider()
    );
  }
};

exports.default = IBizRightSideMenu;
