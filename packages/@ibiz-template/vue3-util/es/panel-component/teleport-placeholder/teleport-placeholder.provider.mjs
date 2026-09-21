import { TeleportPlaceholderController } from './teleport-placeholder.controller.mjs';

"use strict";
class TeleportPlaceholderProvider {
  constructor() {
    this.component = "IBizTeleportPlaceholder";
  }
  async createController(panelItem, panel, parent) {
    const c = new TeleportPlaceholderController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

export { TeleportPlaceholderProvider };
