import { ScrollContainerController } from './scroll-container.controller.mjs';

"use strict";
class ScrollContainerProvider {
  constructor() {
    this.component = "IBizScrollContainer";
  }
  async createController(panelItem, panel, parent) {
    const c = new ScrollContainerController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { ScrollContainerProvider };
