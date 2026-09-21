'use strict';

var gridContainer_controller = require('./grid-container.controller.cjs');

"use strict";
class GridContainerProvider {
  constructor() {
    this.component = "IBizGridContainer";
  }
  async createController(panelItem, panel, parent) {
    const c = new gridContainer_controller.GridContainerController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.GridContainerProvider = GridContainerProvider;
