'use strict';

var vue3Util = require('@ibiz-template/vue3-util');
var core = require('@ibiz-template/core');

"use strict";
class OpenViewUtil {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(router) {
    this.router = router;
  }
  push(path) {
    return vue3Util.routerCallback.open(this.router, path);
  }
  async root(appViewId, context, params, modalOptions) {
    const appView = await ibiz.hub.config.view.get(appViewId);
    const { path } = await vue3Util.generateRoutePath(
      appView,
      this.router.currentRoute.value,
      context,
      params
    );
    if (modalOptions && modalOptions.replace === true) {
      this.router.replace({ path });
    } else {
      this.router.push({ path });
    }
    return { ok: false };
  }
  async rootByModal(appViewId, context, params) {
    const appView = await ibiz.hub.config.view.get(appViewId);
    const { path } = await vue3Util.generateRoutePathByModal(
      appView,
      this.router.currentRoute.value,
      context,
      params
    );
    return this.push(path);
  }
  /**
   * 模态打开视图
   *
   * @author lxm
   * @date 2022-09-12 01:09:06
   * @param {string} appViewId
   * @param {(IContext)} [context]
   * @param {(IParams)} [params]
   * @returns {*}  {Promise<IModalData>}
   */
  async modal(appViewId, context, params) {
    const appView = await ibiz.hub.config.view.get(appViewId);
    const modalOption = JSON.parse(ibiz.config.common.modalOption || "{}");
    const opts = {
      width: appView.width || "80%",
      height: appView.height || "80%",
      footerHide: true,
      ...modalOption,
      ...appView.modalOption
    };
    return vue3Util.openViewModal(
      {
        context,
        params,
        viewId: appView.id
      },
      opts
    );
  }
  async popover(appViewId, event, context, params, options = {}) {
    const appView = await ibiz.hub.config.view.get(appViewId);
    const opts = {
      width: appView.width,
      height: appView.height,
      autoClose: true,
      placement: "bottom",
      ...options,
      ...appView.modalOption
    };
    return vue3Util.openViewPopover(
      event,
      {
        context,
        params,
        viewId: appView.id
      },
      opts
    );
  }
  /**
   * 抽屉打开视图
   *
   * @author lxm
   * @date 2022-09-15 15:09:50
   * @param {string} appViewId
   * @param {(IContext)} [context]
   * @param {(IParams)} [params]
   * @returns {*}  {Promise<IModalData>}
   */
  async drawer(appViewId, context, params) {
    const appView = await ibiz.hub.config.view.get(appViewId);
    const placement = vue3Util.getDrawerPlacement(appView.openMode);
    const drawerOption = JSON.parse(ibiz.config.common.drawerOption || "{}");
    const opts = {
      width: appView.width,
      height: appView.height,
      placement,
      ...drawerOption,
      ...appView.modalOption
    };
    return vue3Util.openViewDrawer(
      {
        context,
        params,
        viewId: appView.id
      },
      opts
    );
  }
  async custom(appViewId, context, params) {
    const appView = await ibiz.hub.config.view.get(appViewId);
    ibiz.log.warn("openUserCustom", appView, context, params);
    throw new Error();
  }
  /**
   * 抽屉打开视图
   *
   * @author lxm
   * @date 2022-09-15 15:09:50
   * @param {string} appViewId
   * @param {(IContext)} [context]
   * @param {(IParams)} [params]
   * @returns {*}  {Promise<IModalData>}
   */
  async popupApp(appViewId, context, params) {
    const appView = await ibiz.hub.config.view.get(appViewId);
    const { path } = await vue3Util.generateRoutePath(
      appView,
      this.router.currentRoute.value,
      context,
      params
    );
    window.open("".concat(core.UrlHelper.routeBase).concat(path), "_blank", "popup");
  }
}

exports.OpenViewUtil = OpenViewUtil;
