'use strict';

var multiDataContainerRaw_controller = require('./multi-data-container-raw.controller.cjs');

"use strict";
class MultiDataContainerRawProvider {
  constructor() {
    this.component = "IBizMultiDataContainerRaw";
  }
  async createController(panelItem, panel, parent) {
    const c = new multiDataContainerRaw_controller.MultiDataContainerRawController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.MultiDataContainerRawProvider = MultiDataContainerRawProvider;
