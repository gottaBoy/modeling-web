import { IBizContext } from '@ibiz-template/core';
import { parseViewProtocol, OpenAppViewCommand } from '@ibiz-template/runtime';
import { h } from 'vue';
import { useRouter } from 'vue-router';
import { InternalMessageDefault } from './internal-message-default.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class InternalMessageDefaultProvider {
  constructor() {
    __publicField(this, "component", InternalMessageDefault);
    __publicField(this, "router", useRouter());
  }
  render(props) {
    return h(this.component, {
      provider: this,
      ...props
    });
  }
  async onClick(message, _event) {
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
        const { viewId, context, params } = parseViewProtocol(redirectUrl);
        context.srfkeepnull = true;
        ibiz.commands.execute(
          OpenAppViewCommand.TAG,
          viewId,
          IBizContext.create(context),
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

export { InternalMessageDefaultProvider };
