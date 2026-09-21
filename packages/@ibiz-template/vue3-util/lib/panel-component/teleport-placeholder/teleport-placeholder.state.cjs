'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class TeleportPlaceholderState extends runtime.PanelItemState {
  constructor() {
    super(...arguments);
    this.teleportTag = "";
  }
}

exports.TeleportPlaceholderState = TeleportPlaceholderState;
