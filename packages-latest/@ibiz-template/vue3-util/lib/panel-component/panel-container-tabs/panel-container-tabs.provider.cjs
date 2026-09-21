'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class PanelContainerTabsProvider {
  constructor() {
    this.component = "IBizPanelContainerTabs";
  }
  async createController(panelItem, panel, parent) {
    const c = new runtime.PanelContainerController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.PanelContainerTabsProvider = PanelContainerTabsProvider;
