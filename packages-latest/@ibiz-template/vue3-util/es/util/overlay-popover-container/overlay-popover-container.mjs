import { OverlayContainer } from '../overlay-container/overlay-container.mjs';

"use strict";
class OverlayPopoverContainer extends OverlayContainer {
  present(target) {
    return this.modal.present(target);
  }
}

export { OverlayPopoverContainer };
