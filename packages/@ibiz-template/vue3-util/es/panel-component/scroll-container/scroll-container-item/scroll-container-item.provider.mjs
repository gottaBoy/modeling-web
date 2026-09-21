import { ScrollContainerItemController } from './scroll-container-item.controller.mjs';

"use strict";
class ScrollContainerItemProvider {
  constructor() {
    this.component = "IBizScrollContainerItem";
  }
  async createController(panelItem, panel, parent) {
    const c = new ScrollContainerItemController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { ScrollContainerItemProvider };
