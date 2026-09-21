'use strict';

var runtime = require('@ibiz-template/runtime');
var gridContainer_state = require('./grid-container.state.cjs');

"use strict";
class GridContainerController extends runtime.PanelContainerController {
  createState() {
    var _a;
    return new gridContainer_state.GridContainerState((_a = this.parent) == null ? void 0 : _a.state);
  }
}

exports.GridContainerController = GridContainerController;
