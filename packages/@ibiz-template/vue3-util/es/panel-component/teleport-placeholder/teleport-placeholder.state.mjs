import { PanelItemState } from '@ibiz-template/runtime';

"use strict";
class TeleportPlaceholderState extends PanelItemState {
  constructor() {
    super(...arguments);
    this.teleportTag = "";
  }
}

export { TeleportPlaceholderState };
