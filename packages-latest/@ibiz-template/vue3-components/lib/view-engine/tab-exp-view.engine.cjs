'use strict';

var core = require('@ibiz-template/core');
var runtime = require('@ibiz-template/runtime');

"use strict";
class TabExpViewEngine extends runtime.ViewEngineBase {
  /**
   * 分页导航面板
   *
   * @readonly
   * @memberof TabExpViewEngine
   */
  get tabExpPanel() {
    return this.view.getController("tabexppanel");
  }
  /**
   * 视图created生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof TabExpViewEngine
   */
  async onCreated() {
    var _a;
    this.preprocessTabExpModelLayout();
    await super.onCreated();
    const { childNames, model } = this.view;
    childNames.push("tabexppanel");
    if (!this.view.slotProps.tabexppanel) {
      this.view.slotProps.tabexppanel = {};
    }
    const { appViewParams } = model;
    const srfdefaultnav = (_a = appViewParams == null ? void 0 : appViewParams.find(
      (item) => item.id === "srfdefaultnav"
    )) == null ? void 0 : _a.value;
    this.view.slotProps.tabexppanel.defaultTabName = this.view.state.srfnav || srfdefaultnav;
    this.view.slotProps.tabexppanel.hideEditItem = true;
  }
  /**
   * 分页导航视图刷新
   *
   * @author tony001
   * @date 2024-10-21 11:10:47
   * @return {*}  {Promise<void>}
   */
  async refresh() {
    await this.loadEntityData();
    this.tabExpPanel.refresh();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  async call(key, args) {
    if (key === runtime.SysUIActionTag.REFRESH) {
      await this.refresh();
      return null;
    }
    return super.call(key, args);
  }
  async onMounted() {
    await super.onMounted();
    await this.loadEntityData();
  }
  async loadEntityData() {
    const deName = runtime.calcDeCodeNameById(this.view.model.appDataEntityId);
    if (!this.view.context[deName]) {
      return;
    }
    return super.loadEntityData();
  }
  /**
   * 根据视图模型配置方向决定分页面板部件位置方向
   *
   * @author zk
   * @date 2023-09-20 05:09:37
   * @protected
   * @memberof TabExpViewEngine
   */
  preprocessTabExpModelLayout() {
    const findPanelItem = (name, items = this.view.model.viewLayoutPanel.rootPanelItems) => {
      if (items == null ? void 0 : items.length) {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.id === name) {
            return item;
          }
          const container = item;
          if (container.panelItems && container.panelItems.length > 0) {
            const result = findPanelItem(name, container.panelItems);
            if (result) {
              return result;
            }
          }
        }
      }
      return void 0;
    };
    const findPanelItemsAndDelete = (names, items = this.view.model.viewLayoutPanel.rootPanelItems) => {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (names.includes(item.id)) {
          items.splice(i, 1);
        }
        const container = item;
        if (container.panelItems && container.panelItems.length > 0) {
          findPanelItemsAndDelete(names, container.panelItems);
        }
      }
    };
    const setTabExpModelLayout = (name) => {
      const tabexppanel = findPanelItem("tabexppanel");
      if (!tabexppanel) {
        throw new core.ModelError(
          this.view.model.viewLayoutPanel,
          ibiz.i18n.t("viewEngine.noFoundLayoutOccupied")
        );
      }
      const layoutContainer = findPanelItem(name);
      if (!layoutContainer) {
        throw new core.ModelError(
          this.view.model.viewLayoutPanel,
          ibiz.i18n.t("viewEngine.noFoundLayoutContainer", { name })
        );
      }
      layoutContainer.panelItems = [tabexppanel];
    };
    const { tabLayout } = this.view.model;
    const deleteItems = [
      "view_tabexppanel",
      "view_tabexppanel_left",
      "view_tabexppanel_bottom",
      "view_tabexppanel_right"
    ];
    let containerName = "view_tabexppanel";
    switch (tabLayout) {
      case "LEFT":
        containerName = "view_tabexppanel_left";
        deleteItems.splice(1, 1);
        break;
      case "BOTTOM":
        containerName = "view_tabexppanel_bottom";
        deleteItems.splice(2, 1);
        break;
      case "RIGHT":
        containerName = "view_tabexppanel_right";
        deleteItems.splice(3, 1);
        break;
      case "TOP":
        deleteItems.splice(0, 1);
        break;
      case "FLOW":
      case "FLOW_NOHEADER":
        break;
      default:
        deleteItems.splice(0, 1);
        break;
    }
    if (tabLayout !== "FLOW" && tabLayout !== "FLOW_NOHEADER") {
      setTabExpModelLayout(containerName);
      findPanelItemsAndDelete(deleteItems);
    }
  }
  /**
   * 计算视图头部元素的显示与否
   * 所有部件容器名称均为：view_部件名称
   *
   * @author lxm
   * @date 2023-06-06 07:16:26
   * @protected
   */
  calcViewHeaderVisible() {
    let showHeader = super.calcViewHeaderVisible();
    const { tabLayout } = this.view.model;
    if (tabLayout === void 0 || ["TOP", "TOP_DROPDOWNLIST"].includes(tabLayout) && runtime.getControl(this.view.model, "tabexppanel")) {
      showHeader = true;
    }
    return showHeader;
  }
}

exports.TabExpViewEngine = TabExpViewEngine;
