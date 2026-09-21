import { PanelItemController } from '@ibiz-template/runtime';
import { reject, isNil } from 'ramda';
import { route2routePath, routePath2string } from '@ibiz-template/vue3-util';
import { notNilEmpty } from 'qx-util';
import { NavBreadcrumbState } from './nav-breadcrumb.state.mjs';
import { NavBreadcrumbService } from './nav-breadcrumb.service.mjs';
import { getCurViewName, getIndexBreadcrumb, getViewInfoByViewStack, getAppFuncByViewName, getMenuItemsByAppFunc } from './nav-breadcrumb.util.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class NavBreadcrumbController extends PanelItemController {
  constructor() {
    super(...arguments);
    /**
     * @description 面包屑分割符
     * @type {string}
     * @memberof NavBreadcrumbController
     */
    __publicField(this, "separator", "/");
    /**
     * @description 导航模式（路由、菜单、缓存）
     * @type {('router' | 'menu' | 'store')}
     * @memberof NavBreadcrumbController
     */
    __publicField(this, "navMode", "router");
    /**
     * @description 是否显示应用标题
     * @type {boolean}
     * @memberof NavBreadcrumbController
     */
    __publicField(this, "showHome", true);
    /**
     * @description 面包屑服务
     * @type {NavBreadcrumbService}
     * @memberof NavBreadcrumbController
     */
    __publicField(this, "service");
    /**
     * @description 自定义补充参数
     * @type {IData}
     * @memberof NavBreadcrumbController
     */
    __publicField(this, "rawItemParams", {});
  }
  createState() {
    var _a;
    return new NavBreadcrumbState((_a = this.parent) == null ? void 0 : _a.state);
  }
  /**
   * @description 应用菜单控制器
   * @readonly
   * @type {(IAppMenuController | undefined)}
   * @memberof NavBreadcrumbController
   */
  get appmenu() {
    return this.panel.view.getController("appmenu");
  }
  /**
   * @description 首页导航栏
   * @readonly
   * @type {(NavPosIndexController | undefined)}
   * @memberof NavBreadcrumbController
   */
  get navPos() {
    return this.panel.panelItems.nav_pos_index;
  }
  async onInit() {
    await super.onInit();
    this.handleRawItemParams();
    this.navMode = this.rawItemParams.navmode || "router";
    this.separator = this.rawItemParams.separator || "/";
    this.showHome = this.rawItemParams.showhome === "true";
    this.service = new NavBreadcrumbService(this.navMode, this.panel.context);
  }
  /**
   * @description 初始化
   * @param {Router} router
   * @memberof NavBreadcrumbController
   */
  onCreated(router) {
    if (this.navMode === "menu") {
      this.setBreadcrumbByMenu(router);
    }
    if (this.navMode === "store") {
      this.setBreadcrumbByStore(router);
    }
  }
  /**
   * @description 路由改变
   * @param {Router} router
   * @memberof NavBreadcrumbController
   */
  onRouteChange(router) {
    if (this.navMode === "router") {
      this.setBreadcrumbByRouter(router);
      return;
    }
    if (this.navMode === "store") {
      const { currentRoute } = router;
      const fullPath = currentRoute.value.fullPath;
      const viewName = getCurViewName(router);
      const chacheItem = this.service.getItem({ fullPath, viewName });
      if (chacheItem) {
        if (chacheItem.viewName === ibiz.hub.defaultAppIndexViewName) {
          this.service.setChache([
            { ...getIndexBreadcrumb(this.panel.context), fullPath }
          ]);
          this.resetBreadcrumbs();
          return;
        }
        this.service.removeAfter(fullPath);
        this.resetBreadcrumbs();
      }
    }
  }
  /**
   * @description 重置面包屑数据
   * @memberof NavBreadcrumbController
   */
  resetBreadcrumbs() {
    this.state.breadcrumbItems = this.service.getChache();
  }
  /**
   * 更新视图信息
   * @author lxm
   * @date 2023-05-09 01:40:34
   * @param {string} key
   * @param {{ caption?: string; dataInfo?: string }} info
   */
  updateViewInfo(fullPath, info) {
    if (this.navMode === "menu") {
      return;
    }
    this.service.updateOrAdd({ fullPath, ...info });
    this.resetBreadcrumbs();
  }
  /**
   * @description 删除缓存数据
   * @param {string} fullPath
   * @memberof NavBreadcrumbController
   */
  removeCache(fullPath) {
    this.service.remove(fullPath);
  }
  /**
   * @description 根据路由计算面包屑数据
   * @param {Router} router
   * @memberof NavBreadcrumbController
   */
  setBreadcrumbByRouter(router) {
    const { currentRoute } = router;
    const routePath = route2routePath(currentRoute.value);
    const items = routePath.pathNodes.map(
      (node, index) => {
        const { appContext, pathNodes } = routePath;
        const fullPath = routePath2string({
          appContext,
          pathNodes: pathNodes.slice(0, index + 1)
        });
        const result = {
          viewName: node.viewName,
          fullPath
        };
        const chacheItem = this.service.getItem({ viewName: node.viewName });
        if (chacheItem) {
          if (!chacheItem.fullPath) {
            chacheItem.fullPath = fullPath;
          }
          Object.assign(result, chacheItem);
        }
        const viewInfo = getViewInfoByViewStack(node.viewName);
        if (viewInfo) {
          Object.assign(result, reject(isNil, viewInfo));
        }
        return result;
      }
    );
    this.service.setChache(items);
    this.resetBreadcrumbs();
  }
  /**
   * @description 根据路由设置菜单面包屑导航数据
   * @param {Router} router
   * @memberof NavBreadcrumbController
   */
  setBreadcrumbByMenu(router) {
    const { currentRoute } = router;
    const routePath = route2routePath(currentRoute.value);
    let appFunc;
    routePath.pathNodes.some((item, index) => {
      if (index === 0) {
        return false;
      }
      const { viewName } = item;
      const func = getAppFuncByViewName(viewName, this.panel.context.srfappid);
      if (func) {
        appFunc = func;
      }
      return appFunc;
    });
    if (this.appmenu) {
      if (appFunc) {
        const menuItems = getMenuItemsByAppFunc(
          appFunc,
          this.appmenu.model.appMenuItems || []
        );
        const items = menuItems.map((item) => {
          return {
            caption: item.caption,
            fullPath: "",
            viewName: item.id
          };
        });
        items.unshift(getIndexBreadcrumb(this.panel.context));
        this.service.setChache(items);
        this.resetBreadcrumbs();
      } else {
        this.service.setChache([getIndexBreadcrumb(this.panel.context)]);
        this.resetBreadcrumbs();
      }
      this.appmenu.evt.on("onClick", (data) => {
        const { event } = data;
        const items = event.map((key) => {
          const item = this.appmenu.allAppMenuItems.find((x) => x.id === key);
          if (item) {
            return {
              caption: item.caption,
              fullPath: "",
              viewName: item.id
            };
          }
        });
        items.unshift(getIndexBreadcrumb(this.panel.context));
        this.service.setChache(items);
        this.resetBreadcrumbs();
      });
    }
  }
  /**
   * @description 设置缓存模式面包屑数据
   * @param {Router} router
   * @memberof NavBreadcrumbController
   */
  setBreadcrumbByStore(router) {
    const chache = this.service.getChache();
    if (chache.length === 0) {
      this.setBreadcrumbByRouter(router);
    } else {
      this.resetBreadcrumbs();
    }
    if (this.appmenu) {
      this.appmenu.evt.on("onClick", async (data) => {
        var _a;
        const { eventArg } = data;
        const menuItem = this.appmenu.allAppMenuItems.find(
          (x) => x.id === eventArg
        );
        if (menuItem) {
          const app = ibiz.hub.getApp(this.panel.context.srfappid);
          const appFunc = app.getAppFunc(menuItem.appFuncId);
          const viewName = ((_a = appFunc.appViewId) == null ? void 0 : _a.split(".").pop()) || "";
          const viewConfig = await ibiz.hub.config.view.get(viewName);
          if (appFunc.openMode !== "INDEXVIEWTAB" || viewConfig && viewConfig.openMode && viewConfig.openMode !== "INDEXVIEWTAB") {
            return;
          }
          const chacheItem = this.service.getItem({ viewName });
          const items = [];
          if (chacheItem) {
            items.push(chacheItem);
          } else {
            items.push({
              viewName,
              fullPath: ""
            });
          }
          items.unshift(getIndexBreadcrumb(this.panel.context));
          this.service.setChache(items);
          this.resetBreadcrumbs();
        }
      });
    }
  }
  /**
   * @description 处理自定义补充参数
   * @protected
   * @memberof NavBreadcrumbController
   */
  handleRawItemParams() {
    var _a;
    let params = {};
    const rawItemParams = (_a = this.model.rawItem) == null ? void 0 : _a.rawItemParams;
    if (notNilEmpty(rawItemParams)) {
      params = rawItemParams.reduce((param, item) => {
        param[item.key.toLowerCase()] = item.value;
        return param;
      }, {});
    }
    Object.assign(this.rawItemParams, params);
  }
}

export { NavBreadcrumbController };
