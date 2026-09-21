'use strict';

var runtime = require('@ibiz-template/runtime');
var panelRememberMe_state = require('./panel-remember-me.state.cjs');

"use strict";
class PanelRememberMeController extends runtime.PanelItemController {
  createState() {
    var _a;
    return new panelRememberMe_state.PanelRememberMeState((_a = this.parent) == null ? void 0 : _a.state);
  }
}

exports.PanelRememberMeController = PanelRememberMeController;
