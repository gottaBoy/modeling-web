import { PanelContainerController } from '@ibiz-template/runtime';

"use strict";
class ScrollContainerController extends PanelContainerController {
  async onInit() {
    await super.onInit();
    this.state.layout.width = "100%";
    this.state.layout.height = "100%";
  }
}

export { ScrollContainerController };
