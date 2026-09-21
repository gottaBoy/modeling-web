import { PanelRawItemController } from './panel-rawitem.controller.mjs';

"use strict";
class PanelRawItemProvider {
  constructor() {
    this.component = "IBizPanelRawItem";
  }
  async createController(panelItem, panel, parent) {
    const c = new PanelRawItemController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { PanelRawItemProvider };
