'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class PanelFieldState extends runtime.PanelItemState {
  constructor() {
    super(...arguments);
    /**
     * 错误信息
     *
     * @type {string}
     * @memberof PanelFieldState
     */
    this.error = null;
  }
}

exports.PanelFieldState = PanelFieldState;
