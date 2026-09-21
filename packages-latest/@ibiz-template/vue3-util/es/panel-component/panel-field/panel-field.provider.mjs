import { PanelFieldController } from './panel-field.controller.mjs';

"use strict";
class PanelFieldProvider {
  constructor() {
    this.component = "IBizPanelField";
  }
  async createController(panelItem, panel, parent) {
    const c = new PanelFieldController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { PanelFieldProvider };
