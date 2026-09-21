'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class PanelTabPageProvider {
  constructor() {
    this.component = "IBizPanelTabPage";
  }
  async createController(panelItem, panel, parent) {
    const c = new runtime.PanelContainerController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.PanelTabPageProvider = PanelTabPageProvider;
