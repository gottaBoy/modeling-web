'use strict';

var navPos_controller = require('./nav-pos.controller.cjs');

"use strict";
class NavPosProvider {
  constructor() {
    this.component = "IBizNavPos";
  }
  /**
   * 创建控制器
   *
   * @param {IPanelItem} panelItem
   * @param {PanelController} panel
   * @param {(PanelItemController | undefined)} parent
   * @return {*}  {Promise<IPanelItemNavPosController>}
   * @memberof NavPosProvider
   */
  async createController(panelItem, panel, parent) {
    const c = new navPos_controller.NavPosController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.NavPosProvider = NavPosProvider;
