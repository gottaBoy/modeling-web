import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { GridContainerController } from './grid-container.controller';

/**
 * 面板容器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class GridContainerProvider
 * @implements {EditorProvider}
 */
export class GridContainerProvider implements IPanelItemProvider {
  component: string = 'IBizGridContainer';

  async createController(
    panelItem: IPanelContainer,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelItemController> {
    const c = new GridContainerController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
