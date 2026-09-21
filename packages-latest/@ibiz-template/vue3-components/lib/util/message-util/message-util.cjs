'use strict';

var vue3Util = require('@ibiz-template/vue3-util');
var ElementPlus = require('element-plus');
var ramda = require('ramda');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class MessageUtil {
  constructor() {
    __publicField(this, "ns", vue3Util.useNamespace("message"));
  }
  info(msg, duration, closable) {
    ElementPlus.ElMessage.info({
      message: msg,
      duration: duration ? duration * 1e3 : duration,
      showClose: closable
    });
  }
  success(msg, duration, closable) {
    ElementPlus.ElMessage.success({
      message: msg,
      duration: duration ? duration * 1e3 : duration,
      showClose: closable
    });
  }
  warning(msg, duration, closable) {
    ElementPlus.ElMessage.warning({
      message: msg,
      duration: duration ? duration * 1e3 : duration,
      showClose: closable
    });
  }
  error(msg, duration, closable) {
    ElementPlus.ElMessage.error({
      message: msg,
      duration: duration ? duration * 1e3 : duration,
      showClose: closable
    });
  }
  /**
   * 格式化参数
   * @author lxm
   * @date 2024-03-21 02:22:27
   * @protected
   * @param {IMessageParams} params
   * @return {*}  {MessageOptions}
   */
  formatParams(params) {
    const paramsWithDefault = ramda.mergeRight(
      {
        type: "info"
      },
      params
    );
    const messageOpts = {};
    Object.keys(paramsWithDefault).forEach((key) => {
      const value = paramsWithDefault[key];
      switch (key) {
        case "duration":
          if (!ramda.isNil(value)) {
            messageOpts.duration = value * 1e3;
          }
          break;
        case "styleType":
          if (!ramda.isNil(value)) {
            messageOpts.customClass = this.ns.m(value);
          }
          break;
        default:
          messageOpts[key] = value;
          break;
      }
    });
    return messageOpts;
  }
  notice(params) {
    ElementPlus.ElMessage(this.formatParams(params));
  }
}

exports.MessageUtil = MessageUtil;
