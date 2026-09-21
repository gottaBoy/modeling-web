import { PanelItemController } from '@ibiz-template/runtime';
import { PanelContainerImageState } from './panel-container-image.state.mjs';

"use strict";
class PanelContainerImageController extends PanelItemController {
  createState() {
    var _a;
    return new PanelContainerImageState((_a = this.parent) == null ? void 0 : _a.state);
  }
}

export { PanelContainerImageController };
