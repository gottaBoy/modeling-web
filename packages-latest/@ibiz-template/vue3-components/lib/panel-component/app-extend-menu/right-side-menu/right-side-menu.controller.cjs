'use strict';

var extendMenuBase_controller = require('../extend-menu-base/extend-menu-base.controller.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class RightSideMenuController extends extendMenuBase_controller.ExtendMenuBaseController {
  constructor() {
    super(...arguments);
    __publicField(this, "appMenuName", "rightsidemenu");
  }
}

exports.RightSideMenuController = RightSideMenuController;
