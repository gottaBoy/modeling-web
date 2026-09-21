'use strict';

var panelCtrlPos_controller = require('./panel-ctrl-pos.controller.cjs');

"use strict";
class PanelCtrlPosProvider {
  constructor() {
    this.component = "IBizPanelCtrlPos";
  }
  async createController(panelItem, panel, parent) {
    const c = new panelCtrlPos_controller.PanelCtrlPosController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.PanelCtrlPosProvider = PanelCtrlPosProvider;
