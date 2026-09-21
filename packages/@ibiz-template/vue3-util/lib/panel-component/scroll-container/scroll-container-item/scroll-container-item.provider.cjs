'use strict';

var scrollContainerItem_controller = require('./scroll-container-item.controller.cjs');

"use strict";
class ScrollContainerItemProvider {
  constructor() {
    this.component = "IBizScrollContainerItem";
  }
  async createController(panelItem, panel, parent) {
    const c = new scrollContainerItem_controller.ScrollContainerItemController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.ScrollContainerItemProvider = ScrollContainerItemProvider;
