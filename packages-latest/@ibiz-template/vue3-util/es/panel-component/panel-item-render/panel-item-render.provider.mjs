import { PanelItemRenderController } from './panel-item-render.controller.mjs';

"use strict";
class PanelItemRenderProvider {
  constructor() {
    this.component = "IBizPanelItemRender";
  }
  async createController(panelItem, panel, parent) {
    const c = new PanelItemRenderController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { PanelItemRenderProvider };
