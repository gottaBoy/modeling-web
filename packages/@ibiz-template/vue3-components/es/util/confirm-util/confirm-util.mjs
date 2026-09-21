import { Namespace } from '@ibiz-template/core';
import { ElMessageBox } from 'element-plus';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ConfirmUtil {
  constructor() {
    __publicField(this, "ns", new Namespace("confirm"));
  }
  async info(params) {
    return new Promise((resolve) => {
      ElMessageBox.confirm(params.desc, params.title, {
        customClass: "".concat(this.ns.b(), " ").concat(this.ns.e("info")),
        type: "info",
        cancelButtonClass: "".concat(this.ns.b("cancel"), " el-button--info"),
        confirmButtonClass: "".concat(this.ns.b("ok")),
        ...params.options
      }).then(() => resolve(true)).catch(() => resolve(false));
    });
  }
  async success(params) {
    return new Promise((resolve) => {
      ElMessageBox.confirm(params.desc, params.title, {
        customClass: "".concat(this.ns.b(), " ").concat(this.ns.e("success")),
        cancelButtonClass: "".concat(this.ns.b("cancel"), " el-button--info"),
        confirmButtonClass: "".concat(this.ns.b("ok")),
        type: "success",
        ...params.options
      }).then(() => resolve(true)).catch(() => resolve(false));
    });
  }
  async warning(params) {
    return new Promise((resolve) => {
      ElMessageBox.confirm(params.desc, params.title, {
        customClass: "".concat(this.ns.b(), " ").concat(this.ns.e("warning")),
        cancelButtonClass: "".concat(this.ns.b("cancel"), " el-button--info"),
        confirmButtonClass: "".concat(this.ns.b("ok")),
        type: "warning",
        ...params.options
      }).then(() => resolve(true)).catch(() => resolve(false));
    });
  }
  async error(params) {
    return new Promise((resolve) => {
      ElMessageBox.confirm(params.desc, params.title, {
        customClass: "".concat(this.ns.b(), " ").concat(this.ns.e("error")),
        cancelButtonClass: "".concat(this.ns.b("cancel"), " el-button--info"),
        confirmButtonClass: "".concat(this.ns.b("ok")),
        type: "error",
        ...params.options
      }).then(() => resolve(true)).catch(() => resolve(false));
    });
  }
}

export { ConfirmUtil };
