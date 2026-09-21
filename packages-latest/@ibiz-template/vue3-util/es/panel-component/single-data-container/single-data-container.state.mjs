import { PanelContainerState } from '@ibiz-template/runtime';

"use strict";
class SingleDataContainerState extends PanelContainerState {
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

export { SingleDataContainerState };
