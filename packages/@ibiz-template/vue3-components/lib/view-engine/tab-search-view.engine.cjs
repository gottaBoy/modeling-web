'use strict';

var runtime = require('@ibiz-template/runtime');
var tabExpView_engine = require('./tab-exp-view.engine.cjs');

"use strict";
class TabSearchViewEngine extends tabExpView_engine.TabExpViewEngine {
  /**
   * 搜索表单控制器
   * @author lxm
   * @date 2023-05-22 01:56:25
   * @readonly
   */
  get searchForm() {
    return this.view.getController("searchform");
  }
  /**
   * 搜索栏控制器
   * @author lxm
   * @date 2023-05-22 01:56:25
   * @readonly
   */
  get searchBar() {
    return this.view.getController("searchbar");
  }
  /**
   * 分页导航面板控制器
   * @author lxm
   * @date 2023-05-22 01:56:25
   * @readonly
   */
  get tabExpPanel() {
    return this.view.getController("tabexppanel");
  }
  preprocessTabExpModelLayout() {
  }
  async onCreated() {
    await super.onCreated();
    const { childNames } = this.view;
    childNames.push("searchform", "searchbar");
  }
  async onMounted() {
    await super.onMounted();
    const controller = this.viewLayoutPanel.panelItems.view_searchform;
    if (controller) {
      const formExists = !!this.searchForm;
      controller.state.keepAlive = formExists;
      controller.state.visible = formExists;
    }
    const searchbarC = this.viewLayoutPanel.panelItems.view_searchbar;
    if (searchbarC) {
      const visible = this.searchBar && !!(this.searchBar.model.enableQuickSearch || this.searchBar.model.enableGroup || this.searchBar.model.enableFilter === true);
      searchbarC.state.visible = visible;
    }
    if (this.searchForm) {
      this.searchForm.evt.on("onSearch", () => {
        this.calcViewParams();
      });
    }
    if (this.searchBar) {
      this.searchBar.evt.on("onSearch", () => {
        this.calcViewParams();
      });
    }
    if (this.tabExpPanel) {
      this.tabExpPanel.evt.on(
        "onTabChange",
        ({ tab }) => {
          this.calcViewParams();
          this.onQuickSearchPlaceHolder(tab);
        }
      );
      const { activeTabViewPanelModel } = this.tabExpPanel;
      if (activeTabViewPanelModel) {
        this.onQuickSearchPlaceHolder(activeTabViewPanelModel);
      }
    }
  }
  /**
   * 给快捷搜索赋默认提示值
   * @author ljx
   * @date 2024-11-12 10:56:25
   * @return {*}  {Promise<void>}
   * @memberof TabSearchViewEngine
   */
  async onQuickSearchPlaceHolder(tab) {
    let { caption } = tab;
    const viewConfig = await ibiz.hub.config.view.get(
      tab.embeddedAppDEViewId || ""
    );
    const appDataEntity = await ibiz.hub.getAppDataEntity(
      viewConfig.appDataEntityId,
      viewConfig.appId
    );
    if (appDataEntity) {
      const searchFields = appDataEntity.appDEFields.filter((field) => {
        return field.enableQuickSearch;
      });
      if (searchFields.length) {
        const placeHolders = [];
        searchFields.forEach((searchField) => {
          if (searchField.lnlanguageRes && searchField.lnlanguageRes.lanResTag) {
            placeHolders.push(
              ibiz.i18n.t(
                searchField.lnlanguageRes.lanResTag,
                searchField.logicName
              )
            );
          } else if (searchField.logicName) {
            placeHolders.push(searchField.logicName);
          }
        });
        if (placeHolders.length > 0) {
          caption = placeHolders.join("\u3001");
        }
      }
    }
    this.searchBar.placeHolder = caption || "";
    this.searchBar.state.quickSearchPlaceHolder = caption || "";
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  async call(key, args) {
    if (key === runtime.SysUIActionTag.SEARCH) {
      await this.searchForm.search();
      return null;
    }
    if (key === runtime.SysUIActionTag.RESET) {
      await this.searchForm.reset();
      return null;
    }
    if (key === runtime.SysUIActionTag.REFRESH) {
      await this.calcViewParams();
      return null;
    }
    return super.call(key, args);
  }
  /**
   * 获取搜索相关的查询参数
   * @author lxm
   * @date 2023-05-22 03:26:04
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
   * 计算视图头部元素的显示与否
   * 所有部件容器名称均为：view_部件名称
   * - 注意 分页导航和分页搜索的默认布局不一致
   *
   *   分页导航：分页导航栏在视图头中
   *
   *   分页搜索：分页导航栏不在视图头中
   * @protected
   */
  calcViewHeaderVisible() {
    let showHeader = false;
    const { model } = this.view;
    if (model.showCaptionBar) {
      showHeader = true;
    }
    if (ibiz.env.isMob) {
      if (this.isExistAndInLayout("lefttoolbar")) {
        showHeader = true;
      }
      if (this.isExistAndInLayout("righttoolbar")) {
        showHeader = true;
      }
    } else if (this.isExistAndInLayout("toolbar")) {
      showHeader = true;
    }
    return showHeader;
  }
  /**
   * 重新计算视图参数
   * @author lxm
   * @date 2024-03-18 05:00:02
   */
  calcViewParams() {
    this.tabExpPanel.state.expViewParams = this.getSearchParams();
    this.tabExpPanel.refresh();
  }
}

exports.TabSearchViewEngine = TabSearchViewEngine;
