import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { MultiDataContainerController } from './multi-data-container.controller';

/**
 * 多项数据容器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class MultiDataContainerProvider
 * @implements {EditorProvider}
 */
export class MultiDataContainerProvider implements IPanelItemProvider {
  component: string = 'IBizMultiDataContainer';

  async createController(
    panelItem: IPanelContainer,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelItemController> {
    const c = new MultiDataContainerController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
