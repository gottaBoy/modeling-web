import { PanelItemController, getControl, getDeACMode, getAcItemProvider, calcDeCodeNameById, OpenAppViewCommand } from '@ibiz-template/runtime';
import { notNilEmpty, createUUID } from 'qx-util';
import { GlobalSearchState } from './global-search.state.mjs';

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class GlobalSearchController extends PanelItemController {
  constructor() {
    super(...arguments);
    /**
     * @description 主键属性名称
     * @exposedoc
     * @type {string}
     * @memberof GlobalSearchController
     */
    __publicField(this, "keyName", "srfkey");
    /**
     * @description 主文本属性名称
     * @exposedoc
     * @type {string}
     * @memberof GlobalSearchController
     */
    __publicField(this, "textName", "srfmajortext");
    /**
     * @description 自定义参数
     * @exposedoc
     * @public
     * @type {IData}
     * @memberof GlobalSearchController
     */
    __publicField(this, "rawItemParams", {});
    /**
     * @description 搜索历史缓存标识
     * @protected
     * @type {string}
     * @memberof GlobalSearchController
     */
    __publicField(this, "historyCacheKey", "global-search-history");
    /**
     * @description 最大历史记录，默认7条
     * @protected
     * @type {number}
     * @memberof GlobalSearchController
     */
    __publicField(this, "maxHistory", 7);
    /**
     * @description 单次查询最大数量，默认100条
     * @exposedoc
     * @type {number}
     * @memberof GlobalSearchController
     */
    __publicField(this, "size", 100);
  }
  /**
   * 创建全局搜索状态对象
   *
   * @protected
   * @return {*}  {GlobalSearchState}
   * @memberof GlobalSearchController
   */
  createState() {
    var _a;
    return new GlobalSearchState((_a = this.parent) == null ? void 0 : _a.state);
  }
  /**
   * 初始化
   *
   * @protected
   * @return {*}  {Promise<void>}
   * @memberof GlobalSearchController
   */
  async onInit() {
    await super.onInit();
    this.handleRawItemParams();
    this.initParams();
    this.initHistory();
    await this.initGlobalSearchItem();
  }
  /**
   * 处理直接内容项参数
   *
   * @protected
   * @memberof GlobalSearchController
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
   * 初始化参数
   *
   * @protected
   * @memberof GlobalSearchController
   */
  initParams() {
    if (this.rawItemParams.historycachekey)
      this.historyCacheKey += this.rawItemParams.historycachekey;
    if (this.rawItemParams.maxhistory)
      this.maxHistory = Number(this.rawItemParams.maxhistory);
    if (this.rawItemParams.size)
      this.size = Number(this.rawItemParams.size);
  }
  /**
   * 初始化历史记录
   *
   * @protected
   * @memberof GlobalSearchController
   */
  initHistory() {
    const cache = localStorage.getItem(this.historyCacheKey);
    if (cache)
      this.state.histories = JSON.parse(cache);
  }
  /**
   * @description 获取全局搜索应用功能
   * @param {IAppMenuItem[]} appMenuItems
   * @returns {*}  {Promise<IAppFunc[]>}
   * @memberof GlobalSearchController
   */
  async getSearchFunc(appMenuItems) {
    const result = [];
    const promises = appMenuItems.map(async (menuItem) => {
      try {
        if (menuItem.appMenuItems) {
          const subFuncs = await this.getSearchFunc(menuItem.appMenuItems);
          result.push(...subFuncs);
          return;
        }
        if (menuItem.appFuncId) {
          let app = ibiz.hub.getApp(menuItem.appId);
          if (!app) {
            app = await ibiz.hub.getAppAsync(menuItem.appId);
          }
          const appFunc = app.getAppFunc(menuItem.appFuncId);
          if (appFunc && appFunc.appFuncType === "SEARCH" && appFunc.appDEACModeId && appFunc.appDataEntityId) {
            result.push(appFunc);
          }
        }
      } catch (err) {
        console.error("\u8BA1\u7B97\u83DC\u5355\u5E94\u7528\u529F\u80FD\u5F02\u5E38: ".concat(menuItem.appFuncId), err);
      }
    });
    await Promise.all(promises);
    return result;
  }
  /**
   * 初始化全局搜索项
   *
   * @protected
   * @memberof GlobalSearchController
   */
  async initGlobalSearchItem() {
    const appMenu = getControl(
      this.panel.view.model,
      "appmenu"
    );
    if (!appMenu)
      return;
    const appMenuItems = appMenu.appMenuItems || [];
    const appFuncs = await this.getSearchFunc(appMenuItems);
    await Promise.all(
      appFuncs.map(async (func) => {
        const deACMode = await getDeACMode(
          func.appDEACModeId,
          func.appDataEntityId,
          func.appId
        );
        if (deACMode) {
          let acItemProvider;
          if (deACMode.itemSysPFPluginId) {
            acItemProvider = await getAcItemProvider(deACMode);
          }
          this.state.items.push({
            deACMode,
            acItemProvider,
            appDataEntityId: func.appDataEntityId
          });
        }
      })
    );
  }
  /**
   * 添加历史
   *
   * @protected
   * @param {string} query
   * @memberof GlobalSearchController
   */
  addToHistory(query) {
    const histories = this.state.histories.filter((history) => history !== query);
    histories.push(query);
    if (histories.length > this.maxHistory)
      histories.shift();
    this.state.histories = histories;
    localStorage.setItem(
      this.historyCacheKey,
      JSON.stringify(this.state.histories)
    );
  }
  /**
   * 获取查询参数
   *
   * @protected
   * @param {ISearchItem} item
   * @return {*}  {IParams}
   * @memberof GlobalSearchController
   */
  getFetchParams(item) {
    const { deACMode } = item;
    const { minorSortDir, minorSortAppDEFieldId } = deACMode;
    const params = {
      page: 0,
      size: this.size,
      query: this.state.query
    };
    if (minorSortDir && minorSortAppDEFieldId)
      Object.assign(params, {
        sort: "".concat(minorSortAppDEFieldId.toLowerCase(), ",").concat(minorSortDir.toLowerCase())
      });
    return params;
  }
  /**
   * 处理响应头
   *
   * @protected
   * @param {IHttpResponse} response
   * @return {*}  {{
   *     page: number;
   *     total: number;
   *   }}
   * @memberof GlobalSearchController
   */
  handleResponseHeader(response) {
    return {
      page: response.headers["x-page"] ? Number(response.headers["x-page"]) : 0,
      total: response.headers["x-total"] ? Number(response.headers["x-total"]) : 0
    };
  }
  /**
   * 通过AC模式加载数据
   *
   * @protected
   * @param {ISearchItem} item
   * @return {*}  {Promise<IData[]>}
   * @memberof GlobalSearchController
   */
  async loadByACMode(item) {
    let result = [];
    const { appDataEntityId, deACMode } = item;
    const { appDEDataSetId } = deACMode;
    if (!appDEDataSetId)
      return result;
    const params = this.getFetchParams(item);
    const app = ibiz.hub.getApp(deACMode.appId);
    const response = await app.deService.exec(
      appDataEntityId,
      appDEDataSetId,
      this.panel.context,
      params
    );
    if (response.ok && response.data) {
      const { page, total } = this.handleResponseHeader(response);
      const data = response.data;
      if ((page + 1) * this.size < total)
        data.push({
          [this.textName]: "".concat(ibiz.i18n.t(
            "panelComponent.globalSearch.moreTips",
            {
              total,
              size: this.size
            }
          )),
          [this.keyName]: createUUID()
        });
      result = data;
    }
    return result;
  }
  /**
   * @description 清除历史
   * @exposedoc
   * @memberof GlobalSearchController
   */
  clearHistory() {
    this.state.histories = [];
    localStorage.setItem(
      this.historyCacheKey,
      JSON.stringify(this.state.histories)
    );
  }
  /**
   * @description 搜索
   * @exposedoc
   * @return {*}  {Promise<void>}
   * @memberof GlobalSearchController
   */
  async search(value) {
    this.state.query = value;
    if (!this.state.query)
      return;
    this.state.list = [];
    this.state.loading = true;
    this.addToHistory(this.state.query);
    try {
      await Promise.all(
        this.state.items.map(async (item) => {
          const list = await this.loadByACMode(item);
          this.state.list.push(...list);
        })
      );
    } catch (error) {
      ibiz.log.error(error);
    } finally {
      this.state.loading = false;
    }
  }
  /**
   * 打开链接视图
   *
   * @param {IData} data 数据
   * @param {ISearchItem} item 搜索项
   * @return {*}  {void}
   * @memberof GlobalSearchController
   */
  openLinkView(data, item) {
    const { appDataEntityId, deACMode } = item;
    const { linkAppViewId } = deACMode;
    if (!linkAppViewId)
      return;
    const context = this.panel.context.clone();
    const deName = calcDeCodeNameById(appDataEntityId);
    Object.assign(context, { [deName]: data[this.keyName] });
    ibiz.commands.execute(OpenAppViewCommand.TAG, linkAppViewId, context, {
      noWaitRoute: true
    });
  }
  /**
   * 根据实体获取搜索项
   *
   * @param {string} [appDataEntityId] 实体标识
   * @return {*}  {(ISearchItem | undefined)}
   * @memberof GlobalSearchController
   */
  getSearchItemByEntity(appDataEntityId) {
    return this.state.items.find(
      (item) => calcDeCodeNameById(item.appDataEntityId) === (appDataEntityId == null ? void 0 : appDataEntityId.toLowerCase())
    );
  }
}

export { GlobalSearchController };
