import { PanelContainerController } from '../panel-container/panel-container.controller.mjs';

"use strict";
class PanelContainerTabsProvider {
  constructor() {
    this.component = "IBizPanelContainerTabs";
  }
  async createController(panelItem, panel, parent) {
    const c = new PanelContainerController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { PanelContainerTabsProvider };
