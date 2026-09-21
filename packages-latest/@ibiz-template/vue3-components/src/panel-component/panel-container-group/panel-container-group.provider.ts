import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { PanelContainerGroupController } from './panel-container-group.controller';

/**
 * @description 面板分组容器适配器
 * @export
 * @class PanelContainerGroupProvider
 * @implements {IPanelItemProvider}
 */
export class PanelContainerGroupProvider implements IPanelItemProvider {
  component: string = 'IBizPanelContainerGroup';

  async createController(
    panelItem: IPanelContainer,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelItemController> {
    const c = new PanelContainerGroupController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
