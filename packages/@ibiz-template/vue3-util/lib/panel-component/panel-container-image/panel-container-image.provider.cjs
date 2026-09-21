'use strict';

var panelContainerImage_controller = require('./panel-container-image.controller.cjs');

"use strict";
class PanelContainerImageProvider {
  constructor() {
    this.component = "IBizPanelContainerImage";
  }
  async createController(panelItem, panel, parent) {
    const c = new panelContainerImage_controller.PanelContainerImageController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.PanelContainerImageProvider = PanelContainerImageProvider;
