import { PanelItemController } from '@ibiz-template/runtime';
import { PanelRememberMeState } from './panel-remember-me.state.mjs';

"use strict";
class PanelRememberMeController extends PanelItemController {
  createState() {
    var _a;
    return new PanelRememberMeState((_a = this.parent) == null ? void 0 : _a.state);
  }
}

export { PanelRememberMeController };
