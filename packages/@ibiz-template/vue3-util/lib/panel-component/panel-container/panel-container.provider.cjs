'use strict';

var panelContainer_controller = require('./panel-container.controller.cjs');

"use strict";
class PanelContainerProvider {
  constructor() {
    this.component = "IBizPanelContainer";
  }
  async createController(panelItem, panel, parent) {
    const c = new panelContainer_controller.PanelContainerController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.PanelContainerProvider = PanelContainerProvider;
