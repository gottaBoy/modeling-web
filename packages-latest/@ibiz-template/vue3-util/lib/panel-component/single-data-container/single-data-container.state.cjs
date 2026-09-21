'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class SingleDataContainerState extends runtime.PanelContainerState {
  constructor() {
    super(...arguments);
    /**
     * @description 单项数据容器数据
     * @exposedoc
     * @type {IData}
     * @memberof SingleDataContainerState
     */
    this.data = {};
  }
}

exports.SingleDataContainerState = SingleDataContainerState;
