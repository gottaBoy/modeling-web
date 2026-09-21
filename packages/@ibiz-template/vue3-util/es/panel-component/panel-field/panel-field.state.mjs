import { PanelItemState } from '@ibiz-template/runtime';

"use strict";
class PanelFieldState extends PanelItemState {
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

export { PanelFieldState };
