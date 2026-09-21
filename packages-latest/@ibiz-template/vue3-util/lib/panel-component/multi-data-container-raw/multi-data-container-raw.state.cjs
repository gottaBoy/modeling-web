'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class MultiDataContainerRawState extends runtime.PanelContainerState {
  constructor() {
    super(...arguments);
    /**
     * @description 多项数据容器数据
     * @exposedoc
     * @type {(IData | IData[])}
     */
    this.items = [];
  }
}

exports.MultiDataContainerRawState = MultiDataContainerRawState;
