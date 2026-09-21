import { PanelItemController } from '@ibiz-template/runtime';

"use strict";
class PanelTabPageProvider {
  constructor() {
    this.component = "IBizPanelTabPage";
  }
  async createController(panelItem, panel, parent) {
    const c = new PanelItemController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { PanelTabPageProvider };
