import { PanelContainerState } from '@ibiz-template/runtime';

"use strict";
class MultiDataContainerState extends PanelContainerState {
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

export { MultiDataContainerState };
