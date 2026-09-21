import { PanelItemState } from '@ibiz-template/runtime';

"use strict";
class viewPageCaptionState extends PanelItemState {
  constructor() {
    super(...arguments);
    /**
     * @description 标题
     * @exposedoc
     * @type {string}
     * @memberof viewPageCaptionState
     */
    this.caption = "";
  }
}

export { viewPageCaptionState };
