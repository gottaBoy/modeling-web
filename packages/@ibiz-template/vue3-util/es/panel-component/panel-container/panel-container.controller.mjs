import { PanelItemController } from '@ibiz-template/runtime';
import { PanelContainerState } from './panel-container.state.mjs';

"use strict";
class PanelContainerController extends PanelItemController {
  createState() {
    var _a;
    return new PanelContainerState((_a = this.parent) == null ? void 0 : _a.state);
  }
}

export { PanelContainerController };
