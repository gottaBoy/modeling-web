'use strict';

var scrollContainer_controller = require('./scroll-container.controller.cjs');

"use strict";
class ScrollContainerProvider {
  constructor() {
    this.component = "IBizScrollContainer";
  }
  async createController(panelItem, panel, parent) {
    const c = new scrollContainer_controller.ScrollContainerController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.ScrollContainerProvider = ScrollContainerProvider;
