'use strict';

var runtime = require('@ibiz-template/runtime');
var panelAppLoginView_state = require('./panel-app-login-view.state.cjs');

"use strict";
class PanelAppLoginViewController extends runtime.PanelItemController {
  createState() {
    var _a;
    return new panelAppLoginView_state.PanelAppLoginViewState((_a = this.parent) == null ? void 0 : _a.state);
  }
}

exports.PanelAppLoginViewController = PanelAppLoginViewController;
