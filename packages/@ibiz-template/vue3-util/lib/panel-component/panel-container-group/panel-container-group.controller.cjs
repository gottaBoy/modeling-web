'use strict';

var runtime = require('@ibiz-template/runtime');
var panelContainerGroup_state = require('./panel-container-group.state.cjs');

"use strict";
class PanelContainerGroupController extends runtime.PanelItemController {
  createState() {
    var _a;
    return new panelContainerGroup_state.PanelContainerGroupState((_a = this.parent) == null ? void 0 : _a.state);
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

exports.PanelContainerGroupController = PanelContainerGroupController;
