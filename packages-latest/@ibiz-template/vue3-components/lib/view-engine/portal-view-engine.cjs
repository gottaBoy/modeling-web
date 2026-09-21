'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class PortalViewEngine extends runtime.DEMainViewEngine {
  /**
   * 视图created生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof PortalViewEngine
   */
  async onCreated() {
    await super.onCreated();
    const { childNames } = this.view;
    childNames.push("dashboard");
  }
  /**
   * 数据看板部件
   *
   * @readonly
   * @memberof PortalViewEngine
   */
  get dashboard() {
    return this.view.getController("dashboard");
  }
  /**
   * 视图刷新
   *
   * @return {*}  {Promise<void>}
   * @memberof PortalViewEngine
   */
  async refresh() {
    await this.dashboard.refresh();
  }
  /**
   * 主数据
   *
   * @protected
   * @return {*}  {IData[]}
   * @memberof PortalViewEngine
   */
  getData() {
    return this.view.state.srfactiveviewdata ? [this.view.state.srfactiveviewdata] : [];
  }
  async call(key, args) {
    if (key === runtime.SysUIActionTag.REFRESH) {
      if (args.ctrl) {
        await args.ctrl.refresh();
      } else {
        await this.refresh();
      }
      return null;
    }
    return super.call(key, args);
  }
  async onMounted() {
    await super.onMounted();
    if (this.view.model.appDataEntityId) {
      const deName = runtime.calcDeCodeNameById(this.view.model.appDataEntityId);
      if (!this.view.context[deName]) {
        return;
      }
      await this.loadEntityData();
    }
  }
  /**
   * 执行标记数据行为
   *
   * @memberof PortalViewEngine
   */
  doMarkDataAction() {
    super.doMarkDataAction();
    if (this.doActions.includes("VIEW")) {
      this.view.evt.on("onDataChange", () => this.sendViewDataAction());
    }
    if (this.doActions.includes("EDIT")) {
      let isWait = false;
      this.dashboard.evt.on("onConfigChange", () => {
        const data = this.getData()[0];
        if (!(data == null ? void 0 : data.srfkey) || isWait) {
          return;
        }
        isWait = true;
        this.sendMarkDataAction("EDIT", data.srfkey);
        setTimeout(
          () => {
            isWait = false;
          },
          1e3 * 60 * 5
        );
      });
    }
    if (this.doActions.includes("UPDATE")) {
      this.dashboard.evt.on("onSavePortlet", () => {
        const data = this.getData()[0];
        if (data == null ? void 0 : data.srfkey) {
          this.sendMarkDataAction("UPDATE", data == null ? void 0 : data.srfkey);
        }
      });
    }
  }
}

exports.PortalViewEngine = PortalViewEngine;
