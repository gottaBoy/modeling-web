'use strict';

var pickupView_engine = require('./pickup-view.engine.cjs');

"use strict";
class PickupView2Engine extends pickupView_engine.PickupViewEngine {
  /**
   * 树导航栏
   *
   * @readonly
   * @memberof TreeExpViewEngine
   */
  get treeExpBar() {
    return this.view.getController("treeexpbar");
  }
  /**
   * 视图created生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof PickupView2Engine
   */
  async onCreated() {
    await super.onCreated();
    const { childNames } = this.view;
    childNames.push("treeexpbar");
    if (!this.view.slotProps.treeexpbar) {
      this.view.slotProps.treeexpbar = {};
    }
    this.view.slotProps.treeexpbar.noNeedNavView = true;
    if (!this.view.slotProps.pickupviewpanel) {
      this.view.slotProps.pickupviewpanel = {};
    }
    this.view.slotProps.pickupviewpanel.noLoadDefault = true;
    this.view.slotProps.pickupviewpanel.singleSelect = true;
  }
  /**
   * 视图mounted生命周期执行逻辑
   *
   * @return {*}  {Promise<void>}
   * @memberof PickupView2Engine
   */
  async onMounted() {
    await super.onMounted();
    this.treeExpBar.load();
    this.treeExpBar.evt.on("onNavViewChange", (event) => {
      this.view.slotProps.pickupviewpanel.context = event.navViewMsg.context;
      this.view.slotProps.pickupviewpanel.params = {
        ...this.view.params,
        ...event.navViewMsg.params
      };
    });
  }
}

exports.PickupView2Engine = PickupView2Engine;
