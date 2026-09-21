'use strict';

var vue = require('vue');
var lodashEs = require('lodash-es');
var asyncActionPreview = require('../async-action-preview/async-action-preview.cjs');
var asyncActionResult = require('../async-action-result/async-action-result.cjs');
var asyncAction = require('./async-action.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AsyncActionProvider {
  constructor() {
    __publicField(this, "component", asyncAction.AsyncAction);
  }
  render(props) {
    return vue.h(this.component, {
      provider: this,
      ...props
    });
  }
  async onClick(asyncAction, _event) {
    if (lodashEs.isNil(asyncAction.actiontype)) {
      ibiz.overlay.modal(
        (modal) => {
          return vue.h(asyncActionResult.AsyncActionResult, {
            asyncAction,
            modal
          });
        },
        {},
        { width: "80%", height: "80%" }
      );
      return true;
    }
    if (lodashEs.isObject(asyncAction.actionresult)) {
      ibiz.overlay.modal(
        (modal) => {
          return vue.h(asyncActionPreview.AsyncActionPreview, {
            asyncAction,
            modal
          });
        },
        {},
        { width: "80%", height: "80%" }
      );
      return true;
    }
    return false;
  }
}

exports.AsyncActionProvider = AsyncActionProvider;
