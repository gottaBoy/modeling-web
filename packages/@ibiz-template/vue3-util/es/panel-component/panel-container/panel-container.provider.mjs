import { PanelContainerController } from './panel-container.controller.mjs';

"use strict";
class PanelContainerProvider {
  constructor() {
    this.component = "IBizPanelContainer";
  }
  async createController(panelItem, panel, parent) {
    const c = new PanelContainerController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { PanelContainerProvider };
