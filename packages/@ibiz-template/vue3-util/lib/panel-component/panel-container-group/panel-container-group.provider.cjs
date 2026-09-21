'use strict';

var panelContainerGroup_controller = require('./panel-container-group.controller.cjs');

"use strict";
class PanelContainerGroupProvider {
  constructor() {
    this.component = "IBizPanelContainerGroup";
  }
  async createController(panelItem, panel, parent) {
    const c = new panelContainerGroup_controller.PanelContainerGroupController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.PanelContainerGroupProvider = PanelContainerGroupProvider;
