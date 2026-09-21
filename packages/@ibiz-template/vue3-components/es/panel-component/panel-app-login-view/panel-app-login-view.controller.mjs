import { PanelItemController } from '@ibiz-template/runtime';
import { PanelAppLoginViewState } from './panel-app-login-view.state.mjs';

"use strict";
class PanelAppLoginViewController extends PanelItemController {
  createState() {
    var _a;
    return new PanelAppLoginViewState((_a = this.parent) == null ? void 0 : _a.state);
  }
}

export { PanelAppLoginViewController };
