import { NavPosController } from './nav-pos.controller.mjs';

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
    const c = new NavPosController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { NavPosProvider };
