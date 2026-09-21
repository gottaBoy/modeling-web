'use strict';

var runtime = require('@ibiz-template/runtime');
var panelContainer_state = require('./panel-container.state.cjs');

"use strict";
class PanelContainerController extends runtime.PanelItemController {
  createState() {
    var _a;
    return new panelContainer_state.PanelContainerState((_a = this.parent) == null ? void 0 : _a.state);
  }
}

exports.PanelContainerController = PanelContainerController;
