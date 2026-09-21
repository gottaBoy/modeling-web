import { MultiDataContainerController } from './multi-data-container.controller.mjs';

"use strict";
class MultiDataContainerProvider {
  constructor() {
    this.component = "IBizMultiDataContainer";
  }
  async createController(panelItem, panel, parent) {
    const c = new MultiDataContainerController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { MultiDataContainerProvider };
