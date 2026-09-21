'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class ScrollContainerController extends runtime.PanelItemController {
  async onInit() {
    await super.onInit();
    this.state.layout.width = "100%";
    this.state.layout.height = "100%";
  }
}

exports.ScrollContainerController = ScrollContainerController;
