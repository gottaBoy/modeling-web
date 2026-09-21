import { PanelItemState } from '@ibiz-template/runtime';
import { createUUID } from 'qx-util';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class CoopPosState extends PanelItemState {
  constructor() {
    super(...arguments);
    /**
     * alert标识
     *
     * @author zhanghengfeng
     * @date 2024-04-03 17:04:04
     * @type {string}
     */
    __publicField(this, "key", createUUID());
    /**
     * 消息模式
     * - 显示操作人员模式下使用
     * @type {string[]}
     * @memberof CoopPosState
     */
    __publicField(this, "messageModes");
    /**
     * 消息map
     *
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

export { CoopPosState };
