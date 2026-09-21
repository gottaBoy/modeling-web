'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class ReportViewEngine extends runtime.ViewEngineBase {
  /**
   * 搜索表单控制器
   *
   * @readonly
   */
  get searchForm() {
    return this.view.getController("searchform");
  }
  /**
   * 搜索栏控制器
   *
   * @readonly
   */
  get searchBar() {
    return this.view.getController("searchbar");
  }
  /**
   * 报表部件
   *
   * @readonly
   */
  get reportpanel() {
    return this.view.getController("reportpanel");
  }
  /**
   * 初始化
   *
   * @return {*}  {Promise<void>}
   * @memberof ReportViewEngine
   */
  async onCreated() {
    await super.onCreated();
    const { childNames } = this.view;
    childNames.push("searchform", "searchbar", "reportpanel");
    if (!this.view.slotProps.reportpanel) {
      this.view.slotProps.reportpanel = {};
    }
  }
  /**
   * 挂载
   *
   * @return {*}  {Promise<void>}
   * @memberof ReportViewEngine
   */
  async onMounted() {
    await super.onMounted();
    const { model } = this.view;
    this.reportpanel.evt.on("onBeforeLoad", () => {
      this.reportpanel.state.searchParams = this.getSearchParams();
    });
    this.reportpanel.evt.on("onLoadSuccess", (event) => {
      this.view.evt.emit("onDataChange", { ...event, actionType: "LOAD" });
    });
    const controller = this.viewLayoutPanel.panelItems.view_searchform;
    if (controller) {
      const formExists = !!this.searchForm;
      controller.state.keepAlive = formExists;
      controller.state.visible = formExists && !!model.expandSearchForm;
    }
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
    if (!this.view.state.noLoadDefault && model.loadDefault) {
      this.load();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  async call(key, args) {
    if (key === runtime.SysUIActionTag.REFRESH) {
      await this.refresh();
      return null;
    }
    if (key === runtime.SysUIActionTag.SEARCH) {
      await this.searchForm.search();
      return null;
    }
    if (key === runtime.SysUIActionTag.RESET) {
      await this.searchForm.reset();
      return null;
    }
    return super.call(key, args);
  }
  /**
   * 获取数据
   *
   * @return {*}  {IData[]}
   * @memberof ReportViewEngine
   */
  getData() {
    return this.reportpanel.getData();
  }
  /**
   * 加载数据
   *
   * @return {*}  {Promise<IData>}
   * @memberof ReportViewEngine
   */
  async load() {
    return this.reportpanel.load();
  }
  /**
   * 视图重新加载
   *
   * @return {*}  {Promise<void>}
   */
  async reLoad() {
    await this.reportpanel.load({ isInitialLoad: true });
  }
  /**
   * 刷新
   *
   * @return {*}  {Promise<void>}
   * @memberof ReportViewEngine
   */
  async refresh() {
    this.reportpanel.doNextActive(() => this.load(), { key: "load" });
  }
  /**
   * 获取搜索相关的查询参数
   *
   * @return {*}  {IParams}
   */
  getSearchParams() {
    const params = {};
    if (this.searchForm) {
      Object.assign(params, this.searchForm.getFilterParams());
    }
    if (this.searchBar) {
      Object.assign(params, this.searchBar.getFilterParams());
    }
    return params;
  }
  /**
   *计算视图头部实现是否显示
   *
   * @protected
   * @return {*}  {boolean}
   * @memberof ReportViewEngine
   */
  calcViewHeaderVisible() {
    const showHeader = super.calcViewHeaderVisible();
    const visible = this.calcViewSearchBarVisible();
    return visible || showHeader;
  }
  /**
   * 计算搜索栏显示
   *
   * @author zk
   * @date 2024-01-29 05:01:36
   * @protected
   * @return {*}  {boolean}
   * @memberof MDViewEngine
   */
  calcViewSearchBarVisible() {
    const { model } = this.view;
    const has = this.isExistAndInLayout("searchbar");
    if (!has) {
      return has;
    }
    const searchBar = runtime.getControl(model, "searchbar");
    const visible = !!(searchBar.enableQuickSearch || searchBar.enableGroup || searchBar.enableFilter === true);
    return visible;
  }
  /**
   * 计算移除的模型名称
   *
   * @author zk
   * @date 2024-01-29 03:01:42
   * @return {*}  {string[]}
   * @memberof MDViewEngine
   */
  calcRemoveLayoutModel() {
    const names = super.calcRemoveLayoutModel();
    if (!this.calcViewSearchBarVisible()) {
      names.push("view_searchbar");
    }
    return names;
  }
  /**
   * 切换搜索表单的显示与否
   *
   * @protected
   */
  toggleFilter() {
    if (this.searchForm) {
      const searchformContainer = this.viewLayoutPanel.panelItems.view_searchform;
      if (searchformContainer) {
        searchformContainer.state.visible = !searchformContainer.state.visible;
      }
    }
  }
}

exports.ReportViewEngine = ReportViewEngine;
