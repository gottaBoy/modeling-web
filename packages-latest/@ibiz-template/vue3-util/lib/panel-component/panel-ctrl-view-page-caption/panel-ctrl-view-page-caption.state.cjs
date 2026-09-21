'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class viewPageCaptionState extends runtime.PanelItemState {
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

exports.viewPageCaptionState = viewPageCaptionState;
