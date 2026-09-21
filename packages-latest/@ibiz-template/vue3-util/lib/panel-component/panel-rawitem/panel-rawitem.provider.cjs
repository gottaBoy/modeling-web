'use strict';

var panelRawitem_controller = require('./panel-rawitem.controller.cjs');

"use strict";
class PanelRawItemProvider {
  constructor() {
    this.component = "IBizPanelRawItem";
  }
  async createController(panelItem, panel, parent) {
    const c = new panelRawitem_controller.PanelRawItemController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.PanelRawItemProvider = PanelRawItemProvider;
