import { recursiveIterate } from '@ibiz-template/core';
import { MDViewEngine, getControl } from '@ibiz-template/runtime';

"use strict";
class ExpViewEngine extends MDViewEngine {
  /**
   * 导航栏部件名称
   *
   * @author zk
   * @date 2023-05-30 06:05:34
   * @readonly
   * @type {string}
   * @memberof ExpViewEngine
   */
  get expBarName() {
    throw Error(ibiz.i18n.t("viewEngine.subclassAchieve"));
  }
  /**
   * 表格导航栏部件控制器
   *
   * @author zk
   * @date 2023-05-29 04:05:32
   * @readonly
   * @memberof GridExpViewEngine
   */
  get expBar() {
    return this.view.getController(this.expBarName);
  }
  /**
   * 数据部件控制器（多数据）
   * @author lxm
   * @date 2023-05-22 01:56:35
   * @readonly
   * @type {IMDControlController}
   */
  get xdataControl() {
    return this.expBar.xDataController;
  }
  constructor(view) {
    var _a, _b;
    const modelData = (_b = (_a = view.model.viewLayoutPanel) == null ? void 0 : _a.controls) == null ? void 0 : _b.find(
      (item) => item.id === "searchbar"
    );
    if (modelData && !modelData.name) {
      modelData.name = "searchbar";
    }
    super(view);
  }
  /**
   * 组件创建
   *
   * @author zk
   * @date 2023-05-29 04:05:56
   * @memberof GridExpViewEngine
   */
  async onCreated() {
    super.onCreated();
    this.modifySplitContainer();
    const { childNames } = this.view;
    childNames.push(this.expBarName);
    if (!this.view.slotProps[this.expBarName]) {
      this.view.slotProps[this.expBarName] = {};
    }
    this.view.slotProps[this.expBarName].loadDefault = false;
    this.view.slotProps[this.expBarName].srfnav = this.view.state.srfnav;
  }
  /**
   * 修改导航容器的模型（适配导航栏上配置的高宽）
   * @author lxm
   * @date 2023-08-31 03:35:44
   * @protected
   */
  modifySplitContainer() {
    const expBarModel = getControl(this.view.model, this.expBarName);
    const { width, height } = expBarModel;
    if (!width && !height) {
      return;
    }
    recursiveIterate(
      this.view.model.viewLayoutPanel,
      (container) => {
        if (container.id === "view_exp_split") {
          if (width) {
            container.panelItems[0].layoutPos.width = width;
          }
          if (height) {
            container.panelItems[0].layoutPos.height = height;
          }
        }
      },
      {
        childrenFields: ["rootPanelItems", "panelItems", "panelTabPages"]
      }
    );
  }
  async onXDataActive(_event) {
  }
  getSearchParams() {
    const params = super.getSearchParams();
    if (this.expBar.state.query) {
      params.query = this.expBar.state.query;
    }
    return params;
  }
  async load(_args) {
    await this.expBar.load();
  }
}

export { ExpViewEngine };
