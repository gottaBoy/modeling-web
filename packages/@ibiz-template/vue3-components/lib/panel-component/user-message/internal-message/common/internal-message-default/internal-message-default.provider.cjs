'use strict';

var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');
var vue = require('vue');
var vueRouter = require('vue-router');
var internalMessageDefault = require('./internal-message-default.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class InternalMessageDefaultProvider {
  constructor() {
    __publicField(this, "component", internalMessageDefault.InternalMessageDefault);
    __publicField(this, "router", vueRouter.useRouter());
  }
  render(props) {
    return vue.h(this.component, {
      provider: this,
      ...props
    });
  }
  async onClick(message, _event) {
    await ibiz.hub.notice.internalMessage.markRead(message);
    const redirectUrl = ibiz.env.isMob ? message.mobile_url : message.url;
    return this.openViewByUrl(redirectUrl);
  }
  /**
   * 解析url并打开对应视图，打开视图前会先标记已读
   * @author lxm
   * @date 2024-02-02 11:56:07
   * @param {IInternalMessage} msg
   * @param {string} redirectUrl
   * @return {*}  {Promise<void>}
   */
  async openRedirectView(msg, redirectUrl) {
    await ibiz.hub.notice.internalMessage.markRead(msg);
    this.openViewByUrl(redirectUrl);
  }
  /**
   * 解析url并打开对应视图
   * @param {string} redirectUrl
   * @return {*}
   * @author: zhujiamin
   * @Date: 2024-03-04 11:16:40
   */
  openViewByUrl(redirectUrl) {
    if (redirectUrl) {
      if (redirectUrl.startsWith("view://")) {
        const { viewId, context, params } = runtime.parseViewProtocol(redirectUrl);
        ibiz.commands.execute(
          runtime.OpenAppViewCommand.TAG,
          viewId,
          core.IBizContext.create(context),
          params
        );
      } else if (redirectUrl.startsWith("route://")) {
        const routeUrl = "/".concat(redirectUrl.split("route://")[1]);
        this.router.push(routeUrl);
      }
      return true;
    }
    return false;
  }
}

exports.InternalMessageDefaultProvider = InternalMessageDefaultProvider;
