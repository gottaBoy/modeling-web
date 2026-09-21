'use strict';

var mpickupViewEngine = require('./mpickup-view-engine.cjs');

"use strict";
class MPickupView2Engine extends mpickupViewEngine.MPickupViewEngine {
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
    this.view.slotProps.pickupviewpanel.noLoadDefault = true;
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
      this.view.slotProps.pickupviewpanel.params = event.navViewMsg.params;
    });
  }
}

exports.MPickupView2Engine = MPickupView2Engine;
