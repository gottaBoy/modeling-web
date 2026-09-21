import { PanelItemState } from '@ibiz-template/runtime';

"use strict";
class PanelFieldState extends PanelItemState {
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

export { PanelFieldState };
