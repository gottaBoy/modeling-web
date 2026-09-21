import { PanelContainerGroupController } from './panel-container-group.controller.mjs';

"use strict";
class PanelContainerGroupProvider {
  constructor() {
    this.component = "IBizPanelContainerGroup";
  }
  async createController(panelItem, panel, parent) {
    const c = new PanelContainerGroupController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { PanelContainerGroupProvider };
