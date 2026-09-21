import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { SingleDataContainerController } from './single-data-container.controller';

/**
 * 单项数据容器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class SingleDataContainerProvider
 * @implements {EditorProvider}
 */
export class SingleDataContainerProvider implements IPanelItemProvider {
  component: string = 'IBizSingleDataContainer';

  async createController(
    panelItem: IPanelContainer,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelItemController> {
    const c = new SingleDataContainerController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
