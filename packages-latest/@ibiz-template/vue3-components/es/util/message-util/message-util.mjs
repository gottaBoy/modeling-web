import { useNamespace } from '@ibiz-template/vue3-util';
import { ElMessage } from 'element-plus';
import { mergeRight, isNil } from 'ramda';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class MessageUtil {
  constructor() {
    __publicField(this, "ns", useNamespace("message"));
  }
  info(msg, duration, closable) {
    ElMessage.info({
      message: msg,
      duration: duration ? duration * 1e3 : duration,
      showClose: closable
    });
  }
  success(msg, duration, closable) {
    ElMessage.success({
      message: msg,
      duration: duration ? duration * 1e3 : duration,
      showClose: closable
    });
  }
  warning(msg, duration, closable) {
    ElMessage.warning({
      message: msg,
      duration: duration ? duration * 1e3 : duration,
      showClose: closable
    });
  }
  error(msg, duration, closable) {
    ElMessage.error({
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
    const paramsWithDefault = mergeRight(
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
          if (!isNil(value)) {
            messageOpts.duration = value * 1e3;
          }
          break;
        case "styleType":
          if (!isNil(value)) {
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
    ElMessage(this.formatParams(params));
  }
}

export { MessageUtil };
