'use strict';

var panelCtrlViewPageCaption_controller = require('./panel-ctrl-view-page-caption.controller.cjs');

"use strict";
class PanelCtrlViewPageProvider {
  constructor() {
    this.component = "IBizPanelCtrlViewPageCaption";
  }
  async createController(panelItem, panel, parent) {
    const c = new panelCtrlViewPageCaption_controller.PanelCtrlViewPageCaptionController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.PanelCtrlViewPageProvider = PanelCtrlViewPageProvider;
