import { notNilEmpty } from 'qx-util';
import { PanelItemController, calcDynamicMenu, getControl, getAppMenuItemProvider, AppFuncCommand } from '@ibiz-template/runtime';
import { RuntimeModelError, recursiveIterate } from '@ibiz-template/core';
import { ExtendMenuBase } from './extend-menu-base.state.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ExtendMenuBaseController extends PanelItemController {
  constructor() {
    super(...arguments);
    /**
     * @description 自定义补充参数
     * @type {IData}
     * @memberof ExtendMenuBaseController
     */
    __publicField(this, "rawItemParams", { rendermode: "BUTTON" });
    /**
     * @description 当前菜单名称
     * @protected
     * @type {string}
     * @memberof ExtendMenuBaseController
     */
    __publicField(this, "appMenuName", "");
    /**
     * @description 菜单模型
     * @protected
     * @type {(IAppMenu | undefined)}
     * @memberof ExtendMenuBaseController
     */
    __publicField(this, "appMenu");
    /**
     * @description 当前应用
     * @protected
     * @type {IAppService}
     * @memberof ExtendMenuBaseController
     */
    __publicField(this, "app");
    /**
     * @description 菜单项适配器集合
     * @type {{ [key: string]: IAppMenuItemProvider }}
     * @memberof ExtendMenuBaseController
     */
    __publicField(this, "itemProviders", {});
    /**
     * @description 所有菜单项，平铺开
     * @type {IAppMenuItem[]}
     * @memberof ExtendMenuBaseController
     */
    __publicField(this, "allAppMenuItems", []);
  }
  /**
   * @description 获取当前视图
   * @readonly
   * @type {IViewController}
   * @memberof ExtendMenuBaseController
   */
  get view() {
    return this.panel.view;
  }
  /**
   * @description 视图层级
   * @readonly
   * @type {(number | undefined)}
   * @memberof ExtendMenuBaseController
   */
  get routeDepth() {
    return this.view.modal.routeDepth;
  }
  /**
   * @description 上下文对象
   * @readonly
   * @type {IContext}
   * @memberof ExtendMenuBaseController
   */
  get context() {
    return this.panel.context;
  }
  /**
   * @description 视图参数
   * @readonly
   * @type {IParams}
   * @memberof ExtendMenuBaseController
   */
  get params() {
    return this.panel.params;
  }
  /**
   * @description 创建状态对象
   * @protected
   * @returns {*}  {ExtendMenuBase}
   * @memberof ExtendMenuBaseController
   */
  createState() {
    var _a;
    return new ExtendMenuBase((_a = this.parent) == null ? void 0 : _a.state);
  }
  /**
   * @description 初始化
   * @protected
   * @returns {*}  {Promise<void>}
   * @memberof ExtendMenuBaseController
   */
  async onInit() {
    await super.onInit();
    this.handleRawItemParams();
    this.app = await ibiz.hub.getApp(this.context.srfappid);
    this.appMenu = this.computeAppMenu();
    if (this.appMenu)
      await calcDynamicMenu(
        this.appMenu,
        this.panel.context,
        this.panel.params
      );
    this.convertMultipleLanguages();
    this.state.items = this.appMenu && this.appMenu.appMenuItems ? this.appMenu.appMenuItems : [];
    this.flattenAllItems();
    await this.initAppMenuItemProviders();
    this.state.items.forEach((item) => {
      this.initMenuItemState(item);
    });
  }
  /**
   * @description 计算当前菜单模型
   * @protected
   * @returns {*}  {(IAppMenu | undefined)}
   * @memberof ExtendMenuBaseController
   */
  computeAppMenu() {
    return getControl(this.view.model, this.appMenuName);
  }
  /**
   * @description 平铺所有菜单项
   * @protected
   * @returns {*}  {void}
   * @memberof ExtendMenuBaseController
   */
  flattenAllItems() {
    if (!this.appMenu)
      return;
    const result = [];
    const flattenMenus = (menuItems) => {
      menuItems.forEach((item) => {
        result.push(item);
        if (item.appMenuItems && item.appMenuItems.length > 0) {
          flattenMenus(item.appMenuItems);
        }
      });
    };
    flattenMenus(this.appMenu.appMenuItems || []);
    this.allAppMenuItems = result;
  }
  /**
   * @description 初始化菜单项的适配器
   * @protected
   * @returns {*}  {Promise<void>}
   * @memberof ExtendMenuBaseController
   */
  async initAppMenuItemProviders() {
    if (this.allAppMenuItems.length === 0)
      return;
    await Promise.all(
      this.allAppMenuItems.map(async (item) => {
        const provider = await getAppMenuItemProvider(item, this.appMenu);
        if (provider) {
          this.itemProviders[item.id] = provider;
        }
      })
    );
  }
  /**
   * @description 初始化菜单项状态
   * @param {IAppMenuItem} menu
   * @returns {*}  {{
   *     visible: boolean;
   *     permitted: boolean;
   *   }}
   * @memberof ExtendMenuBaseController
   */
  initMenuItemState(menu) {
    var _a;
    const result = { permitted: true, visible: true };
    if (menu.hidden) {
      result.visible = false;
    } else {
      let permitted = true;
      if (menu.accessKey) {
        permitted = this.app.authority.calcByResCode(menu.accessKey);
      }
      let visible = permitted;
      if ((_a = menu.appMenuItems) == null ? void 0 : _a.length) {
        const childrenState = menu.appMenuItems.map((child) => {
          return this.initMenuItemState(child).visible;
        });
        visible = visible && childrenState.includes(true);
      }
      result.permitted = permitted;
      result.visible = visible;
    }
    this.state.menuItemsState[menu.id] = result;
    return result;
  }
  /**
   * @description 处理菜单项点击，触发对应的应用功能
   * @param {IAppMenuItem} menuItem
   * @param {MouseEvent} event
   * @param {boolean} [useDepth=true]
   * @returns {*}  {Promise<void>}
   * @memberof ExtendMenuBaseController
   */
  async handleClickMenuItem(menuItem, event, useDepth = true) {
    if (!menuItem) {
      return;
    }
    const provider = this.itemProviders[menuItem.id];
    if (provider && provider.onClick) {
      return provider.onClick(menuItem, event);
    }
    if (!menuItem.appFuncId) {
      throw new RuntimeModelError(
        menuItem,
        ibiz.i18n.t("runtime.controller.control.menu.noConfigured")
      );
    }
    const tempContext = this.context.clone();
    tempContext.srfappid = menuItem.appId || ibiz.env.appId;
    if (this.routeDepth && useDepth) {
      Object.assign(tempContext, {
        toRouteDepth: this.routeDepth + 1
      });
    }
    const param = { ...this.params };
    await ibiz.commands.execute(
      AppFuncCommand.TAG,
      menuItem.appFuncId,
      tempContext,
      param,
      { view: this.view }
    );
  }
  /**
   * @description 处理自定义补充参数
   * @protected
   * @memberof ExtendMenuBaseController
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
  /**
   * @description 转换各类多语言
   * @protected
   * @memberof ExtendMenuBaseController
   */
  convertMultipleLanguages() {
    recursiveIterate(
      this.appMenu || {},
      (item) => {
        var _a, _b;
        if ((_a = item.capLanguageRes) == null ? void 0 : _a.lanResTag)
          item.caption = ibiz.i18n.t(
            item.capLanguageRes.lanResTag,
            item.caption
          );
        if ((_b = item.tooltipLanguageRes) == null ? void 0 : _b.lanResTag)
          item.tooltip = ibiz.i18n.t(
            item.tooltipLanguageRes.lanResTag,
            item.tooltip
          );
      },
      {
        childrenFields: ["appMenuItems"]
      }
    );
  }
}

export { ExtendMenuBaseController };
