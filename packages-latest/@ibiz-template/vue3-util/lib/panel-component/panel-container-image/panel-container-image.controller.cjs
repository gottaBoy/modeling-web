'use strict';

var runtime = require('@ibiz-template/runtime');
var panelContainerImage_state = require('./panel-container-image.state.cjs');

"use strict";
class PanelContainerImageController extends runtime.PanelContainerController {
  createState() {
    var _a;
    return new panelContainerImage_state.PanelContainerImageState((_a = this.parent) == null ? void 0 : _a.state);
  }
}

exports.PanelContainerImageController = PanelContainerImageController;
