import { PanelItemController } from '@ibiz-template/runtime';
import { GridContainerState } from './grid-container.state.mjs';

"use strict";
class GridContainerController extends PanelItemController {
  createState() {
    var _a;
    return new GridContainerState((_a = this.parent) == null ? void 0 : _a.state);
  }
}

export { GridContainerController };
