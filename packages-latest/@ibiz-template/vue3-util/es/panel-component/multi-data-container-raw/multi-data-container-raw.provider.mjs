import { MultiDataContainerRawController } from './multi-data-container-raw.controller.mjs';

"use strict";
class MultiDataContainerRawProvider {
  constructor() {
    this.component = "IBizMultiDataContainerRaw";
  }
  async createController(panelItem, panel, parent) {
    const c = new MultiDataContainerRawController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { MultiDataContainerRawProvider };
