import { GridContainerController } from './grid-container.controller.mjs';

"use strict";
class GridContainerProvider {
  constructor() {
    this.component = "IBizGridContainer";
  }
  async createController(panelItem, panel, parent) {
    const c = new GridContainerController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { GridContainerProvider };
