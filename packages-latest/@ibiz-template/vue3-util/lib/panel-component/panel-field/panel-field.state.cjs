'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class PanelFieldState extends runtime.PanelItemState {
  constructor() {
    super(...arguments);
    /**
     * @exposedoc
     * @description 错误信息
     * @type {(string | null)}
     * @memberof PanelFieldState
     */
    this.error = null;
  }
}

exports.PanelFieldState = PanelFieldState;
