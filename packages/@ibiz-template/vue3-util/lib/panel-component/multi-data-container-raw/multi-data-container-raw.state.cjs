'use strict';

var runtime = require('@ibiz-template/runtime');

"use strict";
class MultiDataContainerRawState extends runtime.PanelItemState {
  constructor() {
    super(...arguments);
    /**
     * 多项数据容器数据
     * @author zzq
     * @date 2024-09-09 16:04:27
     * @type {(IData | IData[])}
     */
    this.items = [];
  }
}

exports.MultiDataContainerRawState = MultiDataContainerRawState;
