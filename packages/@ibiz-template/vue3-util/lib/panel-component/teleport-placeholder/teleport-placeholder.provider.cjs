'use strict';

var teleportPlaceholder_controller = require('./teleport-placeholder.controller.cjs');

"use strict";
class TeleportPlaceholderProvider {
  constructor() {
    this.component = "IBizTeleportPlaceholder";
  }
  async createController(panelItem, panel, parent) {
    const c = new teleportPlaceholder_controller.TeleportPlaceholderController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}

exports.TeleportPlaceholderProvider = TeleportPlaceholderProvider;
