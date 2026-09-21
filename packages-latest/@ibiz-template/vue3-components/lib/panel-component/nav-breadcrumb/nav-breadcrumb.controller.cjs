'use strict';

var runtime = require('@ibiz-template/runtime');
var ramda = require('ramda');
var vue3Util = require('@ibiz-template/vue3-util');
var qxUtil = require('qx-util');
var navBreadcrumb_state = require('./nav-breadcrumb.state.cjs');
var navBreadcrumb_service = require('./nav-breadcrumb.service.cjs');
var navBreadcrumb_util = require('./nav-breadcrumb.util.cjs');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class NavBreadcrumbController extends runtime.PanelItemController {
  constructor() {
    super(...arguments);
    /**
     * @description 面包屑分割符
     * @exposedoc
     * @type {string}
     * @memberof NavBreadcrumbController
     */
    __publicField(this, "separator", "/");
    /**
     * @description 导航模式，路由模式：根据路由计算导航数据，菜单模式：根据菜单模型计算导航数据，缓存模式：根据缓存计算导航数据
     * @exposedoc
     * @type {('router' | 'menu' | 'store')}
     * @memberof NavBreadcrumbController
     */
    __publicField(this, "navMode", "router");
    /**
     * @description 是否显示应用标题
     * @exposedoc
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
     * @exposedoc
     * @type {IData}
     * @memberof NavBreadcrumbController
     */
    __publicField(this, "rawItemParams", {});
  }
  createState() {
    var _a;
    return new navBreadcrumb_state.NavBreadcrumbState((_a = this.parent) == null ? void 0 : _a.state);
  }
  /**
   * @description 应用菜单控制器
   * @exposedoc
   * @readonly
   * @type {(IAppMenuController | undefined)}
   * @memberof NavBreadcrumbController
   */
  get appmenu() {
    return this.panel.view.getController("appmenu");
  }
  /**
   * @description 首页导航占位控制器
   * @readonly
   * @exposedoc
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
    this.service = new navBreadcrumb_service.NavBreadcrumbService(this.navMode, this.panel.context);
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
      const routePath = vue3Util.route2routePath(currentRoute.value);
      const fullPath = currentRoute.value.fullPath;
      const viewName = navBreadcrumb_util.getCurViewName(router);
      const menuTag = navBreadcrumb_util.getMenuTag(routePath.pathNodes);
      const chacheItem = this.service.getItem({ fullPath, viewName });
      const indexViewName = navBreadcrumb_util.getAppIndexViewName(this.panel.context);
      if (chacheItem) {
        if (chacheItem.viewName === indexViewName) {
          this.service.setChache([
            { ...navBreadcrumb_util.getIndexBreadcrumb(this.panel.context), fullPath }
          ]);
          this.resetBreadcrumbs();
          return;
        }
        this.service.update({ ...chacheItem, fullPath });
        const removeItems = this.service.removeAfter(fullPath);
        removeItems.forEach((item) => {
          var _a;
          (_a = this.navPos) == null ? void 0 : _a.removeCache(item.fullPath);
        });
        this.resetBreadcrumbs();
      } else if (this.state.menuTag !== menuTag) {
        this.setBreadcrumbByRouter(router);
      } else {
        this.service.add({ viewName, fullPath, type: "default" });
      }
      this.state.menuTag = menuTag;
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
   * @description 更新视图信息
   * @param {string} fullPath
   * @param {{ viewName: string; caption?: string; dataInfo?: string }} info
   * @return {*}  {void}
   * @memberof NavBreadcrumbController
   */
  updateViewInfo(fullPath, info) {
    if (this.navMode === "menu") {
      return;
    }
    this.service.update({ fullPath, type: "default", ...info });
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
  async setBreadcrumbByRouter(router) {
    const { currentRoute } = router;
    const routePath = vue3Util.route2routePath(currentRoute.value);
    const { appContext = {}, pathNodes } = routePath;
    const menuTag = navBreadcrumb_util.getMenuTag(pathNodes);
    let hasMenuItem = false;
    const menuData = await navBreadcrumb_util.getMenuItemByTag(
      menuTag,
      this.appmenu,
      this.panel.context
    );
    const calcPathNodes = routePath.pathNodes.map(
      async (node, index) => {
        if (this.appmenu && menuData && menuData.viewName === node.viewName) {
          hasMenuItem = true;
        }
        const fullPath = vue3Util.routePath2string({
          appContext,
          pathNodes: pathNodes.slice(0, index + 1)
        });
        const result = {
          viewName: node.viewName,
          fullPath,
          type: "default"
        };
        const chacheItem = this.service.getItem({ viewName: node.viewName });
        if (chacheItem) {
          if (!chacheItem.fullPath) {
            chacheItem.fullPath = fullPath;
          }
          Object.assign(result, chacheItem);
        }
        const viewInfo = navBreadcrumb_util.getViewInfoByViewStack(
          node.viewName,
          this.panel.context
        );
        if (viewInfo) {
          Object.assign(result, ramda.reject(ramda.isNil, viewInfo));
        }
        return result;
      }
    );
    const items = await Promise.all(calcPathNodes);
    if (!hasMenuItem && menuData) {
      this.state.menuTag = menuData.tag;
      const item = {
        viewName: menuData.viewName,
        caption: menuData.menuItem.caption,
        fullPath: "",
        type: "menuItem",
        menuTag: menuData.tag
      };
      items.splice(1, 0, item);
    }
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
    const routePath = vue3Util.route2routePath(currentRoute.value);
    let appFunc;
    routePath.pathNodes.some((item, index) => {
      if (index === 0) {
        return false;
      }
      const { viewName } = item;
      const func = navBreadcrumb_util.getAppFuncByViewName(viewName, this.panel.context.srfappid);
      if (func) {
        appFunc = func;
      }
      return appFunc;
    });
    if (this.appmenu) {
      if (appFunc) {
        const menuItems = navBreadcrumb_util.getMenuItemsByAppFunc(
          appFunc,
          this.appmenu.model.appMenuItems || []
        );
        const items = menuItems.map((item) => {
          return {
            caption: item.caption,
            fullPath: "",
            type: "default",
            viewName: item.id
          };
        });
        items.unshift(navBreadcrumb_util.getIndexBreadcrumb(this.panel.context));
        this.service.setChache(items);
        this.resetBreadcrumbs();
      } else {
        this.service.setChache([navBreadcrumb_util.getIndexBreadcrumb(this.panel.context)]);
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
        items.unshift(navBreadcrumb_util.getIndexBreadcrumb(this.panel.context));
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
        const { eventArg } = data;
        const menuData = await navBreadcrumb_util.getMenuItemByTag(
          eventArg,
          this.appmenu,
          this.panel.context
        );
        if (menuData) {
          const { viewName, appFunc, viewConfig } = menuData;
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
              fullPath: "",
              type: "default"
            });
          }
          items.unshift(navBreadcrumb_util.getIndexBreadcrumb(this.panel.context));
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
    if (qxUtil.notNilEmpty(rawItemParams)) {
      params = rawItemParams.reduce((param, item) => {
        param[item.key.toLowerCase()] = item.value;
        return param;
      }, {});
    }
    Object.assign(this.rawItemParams, params);
  }
  /**
   * @description 打开菜单项视图
   * @param {IData} item
   * @param {MouseEvent} event
   * @memberof NavBreadcrumbController
   */
  openMenuItemView(item, event) {
    if (this.appmenu) {
      this.appmenu.onClickMenuItem(item.menuTag, event);
    }
  }
}

exports.NavBreadcrumbController = NavBreadcrumbController;
