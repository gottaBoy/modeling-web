'use strict';

var overlayContainer = require('../overlay-container/overlay-container.cjs');

"use strict";
class OverlayPopoverContainer extends overlayContainer.OverlayContainer {
  present(target) {
    return this.modal.present(target);
  }
}

exports.OverlayPopoverContainer = OverlayPopoverContainer;
