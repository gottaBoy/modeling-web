'use strict';

var singleDataContainer_controller = require('./single-data-container.controller.cjs');

"use strict";
class SingleDataContainerProvider {
  constructor() {
    this.component = "IBizSingleDataContainer";
  }
  async createController(panelItem, panel, parent) {
    const c = new singleDataContainer_controller.SingleDataContainerController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.SingleDataContainerProvider = SingleDataContainerProvider;
