import { SingleDataContainerController } from './single-data-container.controller.mjs';

"use strict";
class SingleDataContainerProvider {
  constructor() {
    this.component = "IBizSingleDataContainer";
  }
  async createController(panelItem, panel, parent) {
    const c = new SingleDataContainerController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { SingleDataContainerProvider };
