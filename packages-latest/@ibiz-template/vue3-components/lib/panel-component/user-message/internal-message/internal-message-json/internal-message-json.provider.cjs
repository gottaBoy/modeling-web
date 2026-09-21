'use strict';

var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');
var internalMessageJson = require('./internal-message-json.cjs');
require('../common/index.cjs');
var internalMessageDefault_provider = require('../common/internal-message-default/internal-message-default.provider.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class InternalMessageJSONtProvider extends internalMessageDefault_provider.InternalMessageDefaultProvider {
  constructor() {
    super(...arguments);
    __publicField(this, "component", internalMessageJson.InternalMessageJSON);
    // 待办
    __publicField(this, "PREKEY_WFINST", "WFINST__");
    // 已完成
    __publicField(this, "PREKEY_TODOHIS", "TODOHIS__");
    // 抄送
    __publicField(this, "PREKEY_CARBONCOPY", "CARBONCOPY__");
  }
  /**
   * 计算工作流参数
   * @param json
   * @returns
   */
  computeWFParams(json) {
    switch (json.todostate) {
      case "ACTIVE":
        return {
          preKey: "",
          subType: "Todo"
        };
      case "COMPLETED":
        return {
          preKey: this.PREKEY_TODOHIS,
          subType: "Done"
        };
      default:
        return {
          preKey: "",
          subType: ""
        };
    }
  }
  async onClick(message, event) {
    var _a;
    const result = await super.onClick(message, event);
    if (!result && message.content_type === "JSON" && message.content) {
      const json = JSON.parse(message.content);
      if (json.redirecturl) {
        this.openRedirectView(message, json.redirecturl);
        return true;
      }
      if (json.todoid && json.biztype) {
        if (ibiz.env.isPortalApp) {
          ibiz.log.error("\u95E8\u6237\u5E94\u7528\u6682\u4E0D\u652F\u6301\u8DF3\u8F6C\u5DE5\u4F5C\u6D41");
        } else {
          const mainApp = ibiz.hub.getApp();
          const { preKey, subType } = this.computeWFParams(json);
          const res = await ibiz.net.post(
            "/systodos/".concat(preKey).concat(json.todoid, "/getlinkurl"),
            {
              srfapptype: "pc",
              srfapp: mainApp.model.codeName,
              todosubtype: subType,
              todourltype: "RouterUrl"
            }
          );
          if (res.data && res.data.linkurl) {
            const context = core.IBizContext.create(((_a = ibiz.appData) == null ? void 0 : _a.context) || {});
            runtime.toLocalOpenWFRedirectView(context, res.data.linkurl);
          }
        }
      }
    }
    return true;
  }
}

exports.InternalMessageJSONtProvider = InternalMessageJSONtProvider;
