'use strict';

var runtime = require('@ibiz-template/runtime');
var vue3Util = require('@ibiz-template/vue3-util');
var qxUtil = require('qx-util');
var navPosIndex_state = require('./nav-pos-index.state.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class NavPosIndexController extends runtime.PanelItemController {
  constructor() {
    super(...arguments);
    /**
     * 导航视图的modal
     * @author lxm
     * @date 2023-05-12 09:47:52
     * @type {{ [key: string]: IModal }}
     */
    __publicField(this, "viewModals", {});
    /**
     * router对象
     * @author lxm
     * @date 2023-05-25 08:02:43
     * @type {Router}
     */
    __publicField(this, "router");
    /**
     * 是否关闭后自动跳转上一个页面
     * @author lxm
     * @date 2023-05-25 08:43:49
     * @type {boolean}
     */
    __publicField(this, "autoGoLast", true);
    /**
     * 无缓存
     * @author lxm
     * @date 2024-04-22 04:12:41
     * @readonly
     * @type {boolean}
     */
    __publicField(this, "noCache", false);
    /**
     * 自定义补充参数
     *
     * @author zk
     * @date 2023-09-27 03:09:02
     * @type {IData}
     * @memberof NavPosController
     */
    __publicField(this, "rawItemParams", {});
    /**
     * @description 当前导航key
     * @type {string}
     * @memberof NavPosIndexController
     */
    __publicField(this, "currentKey", "");
  }
  createState() {
    var _a;
    return new navPosIndex_state.NavPosIndexState((_a = this.parent) == null ? void 0 : _a.state);
  }
  setRouter(router) {
    this.router = router;
  }
  /**
   * 当前视图的路由层级，非路由模式不存在。
   * @author lxm
   * @date 2023-05-09 12:46:26
   * @readonly
   */
  get routeDepth() {
    return this.panel.view.modal.routeDepth;
  }
  /**
   * 导航标签页控制器
   * @author lxm
   * @date 2023-05-10 08:41:54
   * @readonly
   * @type {(NavTabsController | undefined)}
   */
  get navTabs() {
    return this.panel.panelItems.nav_tabs;
  }
  /**
   * @description 面包屑控制器
   * @readonly
   * @type {(NavBreadcrumbController | undefined)}
   * @memberof NavPosIndexController
   */
  get navBreadcrumb() {
    return this.panel.panelItems.nav_breadcrumb;
  }
  /**
   * 应用菜单控制器
   * @author lxm
   * @date 2023-05-10 08:41:42
   * @readonly
   * @type {(IAppMenuController | undefined)}
   */
  get appmenu() {
    return this.panel.getController("appmenu");
  }
  async onInit() {
    await super.onInit();
    this.handleRawItemParams();
    this.noCache = this.rawItemParams.expcache === "NO_CACHE";
  }
  /**
   * 改变显示视图
   * @author lxm
   * @date 2023-05-25 01:28:49
   * @param {string} key
   */
  changeView(key) {
    var _a;
    const find = this.state.navViewMsgs[key];
    if (find == null ? void 0 : find.fullPath) {
      (_a = this.router) == null ? void 0 : _a.push(find.fullPath);
    }
  }
  /**
   * 路由变更,新视图进缓存并初始化，已有的就只切换。
   * @author lxm
   * @date 2023-05-25 03:07:07
   * @param {{ currentKey: string; fullPath: string }} { currentKey }
   * @return {*}
   */
  onRouteChange({
    currentKey,
    fullPath
  }) {
    const isCurrentKeyChange = this.state.currentKey !== currentKey;
    if (isCurrentKeyChange) {
      if (this.state.cacheKeys.includes(currentKey) && this.router && this.router.currentRoute.value.matched.length === this.routeDepth + 1) {
        const lastFullPath = this.state.navViewMsgs[currentKey].fullPath;
        if (lastFullPath !== fullPath) {
          setTimeout(() => {
            this.router.replace({ path: lastFullPath });
          }, 0);
          return;
        }
      }
      this.state.currentKey = currentKey;
      if (this.navTabs) {
        this.navTabs.state.currentKey = currentKey;
      }
    }
    if (currentKey === "") {
      return;
    }
    this.currentKey = currentKey;
    const index = this.state.operateSort.indexOf(currentKey);
    if (index !== -1) {
      this.state.operateSort.splice(index, 1);
    }
    this.state.operateSort.push(currentKey);
    if (!this.state.cacheKeys.includes(currentKey)) {
      this.state.cacheKeys.push(currentKey);
      if (this.routeDepth) {
        this.viewModals[currentKey] = new runtime.Modal({
          mode: runtime.ViewMode.ROUTE,
          viewUsage: 1,
          routeDepth: this.routeDepth + 1,
          dismiss: (modal) => {
            this.dismiss(currentKey, modal);
          }
        });
      }
    }
    if (this.state.navViewMsgs[currentKey]) {
      this.state.navViewMsgs[currentKey].fullPath = fullPath;
    } else {
      ibiz.log.debug("\u7EF4\u62A4\u5BFC\u822A\u89C6\u56FE\u4FE1\u606F", currentKey, fullPath);
      this.state.navViewMsgs[currentKey] = {
        key: currentKey,
        fullPath
      };
      vue3Util.routerCallback.active(currentKey);
    }
  }
  /**
   * 监听视图创建，获取并监听视图控制器
   * @author lxm
   * @date 2023-05-25 03:03:22
   * @param {EventBase} event
   */
  onViewCreated(event) {
    const { view } = event;
    const key = this.state.currentKey;
    if (this.navTabs) {
      this.navTabs.updateViewInfo(key, {
        caption: view.model.caption,
        sysImage: view.model.sysImage
      });
      view.evt.on("onViewInfoChange", ({ caption, dataInfo }) => {
        this.navTabs.updateViewInfo(key, { caption, dataInfo });
      });
    }
    if (this.navBreadcrumb) {
      this.navBreadcrumb.updateViewInfo(key, {
        viewName: view.model.codeName,
        caption: view.model.caption
      });
      view.evt.on("onViewInfoChange", ({ caption, dataInfo }) => {
        this.navBreadcrumb.updateViewInfo(key, {
          viewName: view.model.codeName,
          caption,
          dataInfo
        });
      });
      view.evt.on("onActivated", () => {
        const data = view.state.srfactiveviewdata;
        const info = {
          viewName: view.model.codeName,
          caption: view.model.caption
        };
        if (data && data.srfkey) {
          Object.assign(info, { dataInfo: data.srfmajortext || "" });
        }
        this.navBreadcrumb.updateViewInfo(key, info);
      });
    }
  }
  /**
   * 删除单个缓存
   * @author lxm
   * @date 2023-05-09 02:19:09
   * @param {string} key
   */
  removeCache(key) {
    const index = this.state.cacheKeys.indexOf(key);
    if (index !== -1) {
      this.state.cacheKeys.splice(index, 1);
      delete this.viewModals[key];
      delete this.state.navViewMsgs[key];
      const operateIndex = this.state.operateSort.indexOf(key);
      if (operateIndex !== -1) {
        this.state.operateSort.splice(operateIndex, 1);
      }
    }
  }
  /**
   * 清空缓存
   * @author lxm
   * @date 2023-05-09 02:19:55
   */
  clearCache() {
    this.state.cacheKeys = [this.currentKey];
    this.viewModals = {};
  }
  /**
   * 关闭视图
   * 走modal的dismiss,会走一遍视图内部的校验，不通过则不会关闭
   * @author lxm
   * @date 2023-05-25 03:10:23
   * @param {string} keys
   */
  async closeViewByKeys(keys) {
    this.autoGoLast = false;
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const modal = this.viewModals[key];
      await modal.dismiss();
    }
    this.goLast();
    this.autoGoLast = true;
  }
  /**
   * 自身的dismiss相关操作
   *
   * @author chitanda
   * @date 2023-07-12 22:07:09
   * @protected
   * @param {string} key
   * @param {IModalData} modal
   * @return {*}
   */
  dismiss(key, modal) {
    vue3Util.routerCallback.close(key, modal);
    if (this.navTabs) {
      this.navTabs.removeCache(key);
    }
    if (this.navBreadcrumb) {
      this.navBreadcrumb.removeCache(key);
    }
    this.removeCache(key);
    if (this.autoGoLast) {
      this.goLast();
    }
  }
  /**
   * 返回上一个页面或上一层空白路由
   * @author lxm
   * @date 2023-05-25 06:46:27
   * @protected
   */
  goLast() {
    const lastKey = this.state.operateSort.pop();
    if (lastKey) {
      if (this.state.currentKey === lastKey) {
        this.state.operateSort.push(lastKey);
        return;
      }
      const fullPath = this.state.navViewMsgs[lastKey].fullPath;
      this.router.push(fullPath);
    } else {
      const route = this.router.currentRoute.value;
      const { appContext } = route.params;
      let indexPath = "/".concat(appContext);
      for (let index = 1; index <= this.routeDepth; index++) {
        indexPath += "/".concat(route.params["view".concat(index)], "/").concat(ibiz.env.routePlaceholder);
      }
      this.router.push(indexPath);
      ibiz.util.setBrowserTitle("");
    }
  }
  /**
   * 处理自定义补充参数 [{key:'name',value:'data'}] => {name:'data'}
   *
   * @author zk
   * @date 2023-09-27 03:09:55
   * @protected
   * @memberof NavPosController
   */
  handleRawItemParams() {
    var _a;
    let params = {};
    const rawItemParams = (_a = this.model.rawItem) == null ? void 0 : _a.rawItemParams;
    if (qxUtil.notNilEmpty(rawItemParams)) {
      params = rawItemParams.reduce((param, item) => {
        param[item.key.toLowerCase()] = item.value;
        return param;
      }, {});
    }
    Object.assign(this.rawItemParams, params);
  }
}

exports.NavPosIndexController = NavPosIndexController;
