import { PanelCtrlPosController } from './panel-ctrl-pos.controller.mjs';

"use strict";
class PanelCtrlPosProvider {
  constructor() {
    this.component = "IBizPanelCtrlPos";
  }
  async createController(panelItem, panel, parent) {
    const c = new PanelCtrlPosController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { PanelCtrlPosProvider };
