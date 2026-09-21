'use strict';

var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');
var lodashEs = require('lodash-es');

"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class MDCustomViewEngine extends runtime.ViewEngineBase {
  constructor() {
    super(...arguments);
    /**
     * 部件集合
     *
     * @type {IControl[]}
     * @memberof MDCustomViewEngine
     */
    __publicField(this, "controls", []);
  }
  /**
   * @description 获取分页搜索视图上移的搜索栏控制器
   * @readonly
   * @protected
   * @type {ISearchBarController}
   * @memberof MDCustomViewEngine
   */
  get tabSearchBar() {
    return this.view.getController("tabsearchbar");
  }
  /**
   * 视图created生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof MDCustomViewEngine
   */
  async onCreated() {
    await super.onCreated();
    this.controls = runtime.getControlsByView(this.view.model);
    this.initMDCtrlActiveMode();
  }
  /**
   * 视图mounted生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof MDCustomViewEngine
   */
  async onMounted() {
    await super.onMounted();
    this.calcToolbarState = this.calcToolbarState.bind(this);
    if (this.searchForm) {
      this.searchForm.evt.on("onSearch", () => {
        this.reLoad();
      });
    }
    if (this.searchBar) {
      this.searchBar.evt.on("onSearch", () => {
        this.reLoad();
      });
    }
    if (this.tabSearchForm) {
      this.tabSearchForm.evt.on("onSearch", () => {
        this.reLoad();
      });
    }
    if (this.tabSearchBar) {
      this.tabSearchBar.evt.on("onSearch", () => {
        this.reLoad();
      });
    }
    this.controls.forEach((ctrl) => {
      const control = this.view.getController(
        ctrl.name
      );
      control == null ? void 0 : control.evt.on(
        "onLoadSuccess",
        (evt) => this.calcToolbarButtonState(ctrl, void 0, evt)
      );
      control == null ? void 0 : control.evt.on(
        "onSelectionChange",
        (evt) => this.calcToolbarButtonState(ctrl, evt.data[0], evt)
      );
      control == null ? void 0 : control.evt.on(
        "onRefreshSuccess",
        (evt) => this.calcToolbarButtonState(ctrl, evt.data[0], evt)
      );
      control == null ? void 0 : control.evt.on("onBeforeLoad", () => {
        control.state.searchParams = this.getSearchParams();
      });
    });
  }
  /**
   * @description 获取搜索相关的查询参数
   * @protected
   * @returns {*}  {IParams}
   * @memberof MDCustomViewEngine
   */
  getSearchParams() {
    const params = {};
    if (this.searchForm) {
      Object.assign(params, this.searchForm.getFilterParams());
    }
    if (this.searchBar) {
      Object.assign(params, this.searchBar.getFilterParams());
    }
    if (this.tabSearchForm) {
      Object.assign(params, this.tabSearchForm.getFilterParams());
    }
    if (this.tabSearchBar) {
      Object.assign(params, this.tabSearchBar.getFilterParams());
    }
    return params;
  }
  /**
   * @description 初始化部件激活模式
   * @memberof MDCustomViewEngine
   */
  initMDCtrlActiveMode() {
    const { model } = this.view;
    this.controls.forEach((ctrl) => {
      const name = ctrl.name || ctrl.id;
      if (!this.view.slotProps[name]) {
        this.view.slotProps[name] = {};
      }
      this.view.slotProps[name].mdctrlActiveMode = model.mdctrlActiveMode;
    });
  }
  /**
   * 计算工具栏按钮状态
   *
   * @param {IMDControl} control 数据部件模型
   * @param {(IData | undefined)} data 数据
   * @memberof MDCustomViewEngine
   */
  calcToolbarButtonState(control, data, _params) {
    const model = this.controls.find(
      (ctrl) => {
        var _a;
        return ctrl.controlType === "TOOLBAR" && ((_a = ctrl.xdataControlName) == null ? void 0 : _a.toLowerCase()) === control.name;
      }
    );
    if (model) {
      const toolbar = this.view.getController(
        model.name
      );
      toolbar == null ? void 0 : toolbar.calcButtonState(data, control.appDataEntityId, _params);
    }
  }
  async call(key, args) {
    if (key === runtime.SysUIActionTag.REFRESH) {
      await this.refresh();
      return null;
    }
    if (key === runtime.SysUIActionTag.EDIT || key === runtime.SysUIActionTag.VIEW) {
      return this.openData(args);
    }
    if (key === runtime.SysUIActionTag.NEW) {
      return this.newData(args);
    }
    return super.call(key, args);
  }
  /**
   * @description 视图重新加载
   * @protected
   * @returns {*}  {Promise<void>}
   * @memberof MDCustomViewEngine
   */
  async reLoad() {
    if (this.view.state.xdatacontrolname) {
      const xDataCtrl = this.view.getController(
        this.view.state.xdatacontrolname
      );
      await (xDataCtrl == null ? void 0 : xDataCtrl.load({ isInitialLoad: true }));
    }
  }
  /**
   * @description 刷新数据
   * @returns {*}  {Promise<void>}
   * @memberof MDCustomViewEngine
   */
  async refresh() {
    if (this.view.state.xdatacontrolname) {
      const xDataCtrl = this.view.getController(
        this.view.state.xdatacontrolname
      );
      await (xDataCtrl == null ? void 0 : xDataCtrl.refresh());
    }
  }
  /**
   * @description 打开编辑数据视图
   * @protected
   * @param {{
   *     data: IData[];
   *     event?: MouseEvent;
   *     context?: IContext;
   *     params?: IParams;
   *   }} args
   * @returns {*}  {Promise<IUIActionResult>}
   * @memberof MDCustomViewEngine
   */
  async openData(args) {
    var _a, _b;
    const { data, ctrl, event } = args;
    const context = (args.context || this.view.context).clone();
    let deName = (_a = data[0].srfdecodename) == null ? void 0 : _a.toLowerCase();
    if (ctrl) {
      context.srfnavctrlid = ctrl.ctrlId;
      if (!deName) {
        deName = runtime.calcDeCodeNameById(ctrl.model.appDataEntityId);
      }
    }
    const params = args.params || this.view.params;
    context[deName.toLowerCase()] = data[0].srfkey;
    const result = await ((_b = this.view.scheduler) == null ? void 0 : _b.triggerCustom("opendata", {
      context,
      params,
      data,
      event,
      view: this.view
    }));
    if (result === -1) {
      throw new core.RuntimeModelError(
        this.view.model,
        ibiz.i18n.t("runtime.engine.logicOpendata")
      );
    } else {
      return {
        cancel: result ? !result.ok : true
      };
    }
  }
  /**
   * 打开编辑数据视图
   *
   * @author lxm
   * @date 2022-09-01 18:09:19
   * @param {IData} data
   * @param {MouseEvent} [event]
   * @returns {*}
   */
  async newData(args) {
    var _a, _b, _c;
    const { data, event, copyMode } = args;
    const openAppViewLogic = (_b = (_a = this.view.model.viewLayoutPanel) == null ? void 0 : _a.appViewLogics) == null ? void 0 : _b.find(
      (item) => item.id === "newdata"
    );
    if (!openAppViewLogic) {
      throw new core.RuntimeModelError(
        this.view.model,
        ibiz.i18n.t("runtime.engine.logicNewdata")
      );
    }
    const params = lodashEs.clone(this.view.params);
    if (copyMode) {
      params.srfcopymode = copyMode;
    }
    const result = await ((_c = this.view.scheduler) == null ? void 0 : _c.triggerCustom("newdata", {
      context: this.view.context,
      params,
      data,
      event,
      view: this.view
    }));
    if (result === -1) {
      throw new core.RuntimeModelError(
        this.view.model,
        ibiz.i18n.t("runtime.engine.logicNewdata")
      );
    } else {
      return {
        cancel: result ? !result.ok : true
      };
    }
  }
}

exports.MDCustomViewEngine = MDCustomViewEngine;
