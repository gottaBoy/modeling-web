import { PanelCtrlViewPageCaptionController } from './panel-ctrl-view-page-caption.controller.mjs';

"use strict";
class PanelCtrlViewPageProvider {
  constructor() {
    this.component = "IBizPanelCtrlViewPageCaption";
  }
  async createController(panelItem, panel, parent) {
    const c = new PanelCtrlViewPageCaptionController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { PanelCtrlViewPageProvider };
