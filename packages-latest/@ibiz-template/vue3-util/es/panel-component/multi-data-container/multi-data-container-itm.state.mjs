import { PanelItemState } from '@ibiz-template/runtime';

"use strict";
class MultiDataContainerItemState extends PanelItemState {
  constructor() {
    super(...arguments);
    /**
     * 多项数据容器数据
     * @author lxm
     * @date 2023-07-14 12:07:45
     * @type {(IData | IData[])}
     */
    this.data = {};
  }
}

export { MultiDataContainerItemState };
