'use strict';

var panelItemRender_controller = require('./panel-item-render.controller.cjs');

"use strict";
class PanelItemRenderProvider {
  constructor() {
    this.component = "IBizPanelItemRender";
  }
  async createController(panelItem, panel, parent) {
    const c = new panelItemRender_controller.PanelItemRenderController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.PanelItemRenderProvider = PanelItemRenderProvider;
