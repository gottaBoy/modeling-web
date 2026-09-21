'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var commonExtendMenu = require('./extend-menu-base/common-extend-menu/common-extend-menu.cjs');
var index = require('./left-side-menu/index.cjs');
var index$1 = require('./right-side-menu/index.cjs');
var index$2 = require('./bottom-side-menu/index.cjs');
var index$3 = require('./top-side-menu/index.cjs');

"use strict";
var IBizAppExtendMenu = {
  install(app) {
    app.component(commonExtendMenu.CommonExtendMenu.name, commonExtendMenu.CommonExtendMenu);
    app.use(index.default);
    app.use(index$1.default);
    app.use(index$2.default);
    app.use(index$3.default);
  }
};

exports.default = IBizAppExtendMenu;
