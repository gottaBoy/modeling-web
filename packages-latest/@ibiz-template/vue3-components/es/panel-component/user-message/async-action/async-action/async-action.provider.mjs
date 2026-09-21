import { h } from 'vue';
import { isNil, isObject } from 'lodash-es';
import { AsyncActionPreview } from '../async-action-preview/async-action-preview.mjs';
import { AsyncActionResult } from '../async-action-result/async-action-result.mjs';
import { AsyncDataExport } from '../async-data-export/async-data-export.mjs';
import { AsyncAction } from './async-action.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AsyncActionProvider {
  constructor() {
    __publicField(this, "component", AsyncAction);
  }
  render(props) {
    return h(this.component, {
      provider: this,
      ...props
    });
  }
  async onClick(asyncAction, _event) {
    if (isNil(asyncAction.actiontype)) {
      ibiz.overlay.modal(
        (modal) => {
          return h(AsyncActionResult, {
            asyncAction,
            modal
          });
        },
        {},
        { width: "80%", height: "80%" }
      );
      return true;
    }
    if (asyncAction.actiontype === "DEEXPORTDATA") {
      ibiz.overlay.modal(
        (modal) => {
          return h(AsyncDataExport, {
            asyncAction,
            modal
          });
        },
        {},
        { width: "80%", height: "80%" }
      );
      return true;
    }
    if (isObject(asyncAction.actionresult)) {
      ibiz.overlay.modal(
        (modal) => {
          return h(AsyncActionPreview, {
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

export { AsyncActionProvider };
