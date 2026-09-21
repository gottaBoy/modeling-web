import { PanelContainerImageController } from './panel-container-image.controller.mjs';

"use strict";
class PanelContainerImageProvider {
  constructor() {
    this.component = "IBizPanelContainerImage";
  }
  async createController(panelItem, panel, parent) {
    const c = new PanelContainerImageController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { PanelContainerImageProvider };
