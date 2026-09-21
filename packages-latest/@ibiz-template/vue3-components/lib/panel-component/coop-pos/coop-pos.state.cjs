'use strict';

var runtime = require('@ibiz-template/runtime');
var qxUtil = require('qx-util');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class CoopPosState extends runtime.PanelItemState {
  constructor() {
    super(...arguments);
    /**
     * @description alert标识
     * @exposedoc
     * @type {string}
     * @memberof CoopPosState
     */
    __publicField(this, "key", qxUtil.createUUID());
    /**
     * @description 消息模式，显示操作人员模式下使用
     * @exposedoc
     * @type {string[]}
     * @memberof CoopPosState
     */
    __publicField(this, "messageModes");
    /**
     * @description 消息map
     * @exposedoc
     * @type {Map<string, IData>}
     * @memberof CoopPosState
     */
    __publicField(this, "messageMap", /* @__PURE__ */ new Map());
    /**
     * 提示参数
     *
     * @author zhanghengfeng
     * @date 2024-04-03 17:04:55
     * @type {IAlertParams}
     */
    __publicField(this, "alertParams", {
      data: {
        action: "VIEW",
        entity: "",
        key: "",
        time: 0,
        username: ""
      }
    });
  }
}

exports.CoopPosState = CoopPosState;
