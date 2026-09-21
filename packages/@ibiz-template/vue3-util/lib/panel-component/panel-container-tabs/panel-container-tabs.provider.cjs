'use strict';

var panelContainer_controller = require('../panel-container/panel-container.controller.cjs');

"use strict";
class PanelContainerTabsProvider {
  constructor() {
    this.component = "IBizPanelContainerTabs";
  }
  async createController(panelItem, panel, parent) {
    const c = new panelContainer_controller.PanelContainerController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.PanelContainerTabsProvider = PanelContainerTabsProvider;
