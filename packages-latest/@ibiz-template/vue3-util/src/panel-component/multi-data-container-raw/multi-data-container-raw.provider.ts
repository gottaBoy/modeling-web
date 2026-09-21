import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { MultiDataContainerRawController } from './multi-data-container-raw.controller';

/**
 * 多项数据容器适配器
 *
 * @author zzq
 * @date 2024-09-09 16:04:27
 * @export
 * @class MultiDataContainerProvider
 * @implements {EditorProvider}
 */
export class MultiDataContainerRawProvider implements IPanelItemProvider {
  component: string = 'IBizMultiDataContainerRaw';

  async createController(
    panelItem: IPanelContainer,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelItemController> {
    const c = new MultiDataContainerRawController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
