'use strict';

var panelField_controller = require('./panel-field.controller.cjs');

"use strict";
class PanelFieldProvider {
  constructor() {
    this.component = "IBizPanelField";
  }
  async createController(panelItem, panel, parent) {
    const c = new panelField_controller.PanelFieldController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.PanelFieldProvider = PanelFieldProvider;
