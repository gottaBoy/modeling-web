import { PanelContainerController } from '@ibiz-template/runtime';

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
