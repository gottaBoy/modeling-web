'use strict';

var runtime = require('@ibiz-template/runtime');
var ElementPlus = require('element-plus');
var vue = require('vue');
var vue3Util = require('@ibiz-template/vue3-util');
require('../../common/index.cjs');
require('../../panel-component/user-message/addin-changed/index.cjs');
var doingNotice = require('../../common/doing-notice/doing-notice.cjs');
var addinChanged = require('../../panel-component/user-message/addin-changed/addin-changed.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class NoticeUtil {
  constructor() {
    __publicField(this, "doingNotice");
  }
  async showAsyncAction(asyncAction) {
    const ns = vue3Util.useNamespace("async-action-notice");
    const porvider = await runtime.getAsyncActionProvider(asyncAction);
    if (porvider.render) {
      const ins = ElementPlus.ElNotification({
        customClass: ns.b(),
        message: porvider.render({
          action: asyncAction,
          onClose: () => {
            ins.close();
          }
        }),
        position: "bottom-right",
        duration: 0
      });
    }
  }
  showDoingNotice(info) {
    if (!this.doingNotice) {
      const reactiveInfo = vue.reactive(info);
      const ins = ElementPlus.ElNotification({
        message: vue.h(doingNotice.DoingNotice, {
          info: reactiveInfo
        }),
        onClose: () => {
          this.closeDoingNotice();
        },
        position: "bottom-right",
        duration: 0
      });
      this.doingNotice = { info: reactiveInfo, close: () => ins.close() };
    } else {
      Object.assign(this.doingNotice.info, info);
    }
  }
  closeDoingNotice() {
    if (this.doingNotice) {
      this.doingNotice.close();
      this.doingNotice = void 0;
    }
  }
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  showAddInChangedNotice(msg) {
    const ns = vue3Util.useNamespace("addin-changed-notice");
    const ins = ElementPlus.ElNotification({
      customClass: ns.b(),
      message: vue.h(addinChanged.AddinChanged),
      onClose: () => {
        ins.close();
      },
      position: "bottom-right"
    });
  }
}

exports.NoticeUtil = NoticeUtil;
