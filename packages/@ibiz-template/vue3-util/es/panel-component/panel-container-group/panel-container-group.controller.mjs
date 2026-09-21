import { PanelItemController } from '@ibiz-template/runtime';
import { PanelContainerGroupState } from './panel-container-group.state.mjs';

"use strict";
class PanelContainerGroupController extends PanelItemController {
  createState() {
    var _a;
    return new PanelContainerGroupState((_a = this.parent) == null ? void 0 : _a.state);
  }
  /**
   * 禁用关闭
   *
   * @author chitanda
   * @date 2022-09-14 14:09:51
   * @readonly
   * @type {boolean}
   */
  get disableClose() {
    const { titleBarCloseMode: mode } = this.model;
    return mode === 0 || mode === void 0;
  }
  /**
   * 是否默认展开分组
   *
   * @author chitanda
   * @date 2022-09-14 14:09:09
   * @readonly
   */
  get defaultExpansion() {
    const { titleBarCloseMode: mode } = this.model;
    return this.disableClose || mode === 1;
  }
}

export { PanelContainerGroupController };
