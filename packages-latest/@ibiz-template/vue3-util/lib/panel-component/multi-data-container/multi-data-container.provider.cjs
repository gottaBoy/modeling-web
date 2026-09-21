'use strict';

var multiDataContainer_controller = require('./multi-data-container.controller.cjs');

"use strict";
class MultiDataContainerProvider {
  constructor() {
    this.component = "IBizMultiDataContainer";
  }
  async createController(panelItem, panel, parent) {
    const c = new multiDataContainer_controller.MultiDataContainerController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.MultiDataContainerProvider = MultiDataContainerProvider;
