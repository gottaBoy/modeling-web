import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { PanelItemRenderController } from './panel-item-render.controller';

/**
 * 面板绘制器适配器
 *
 * @author zk
 * @date 2024-01-15 06:01:32
 * @export
 * @class PanelItemRenderProvider
 * @implements {IPanelItemProvider}
 */
export class PanelItemRenderProvider implements IPanelItemProvider {
  component: string = 'IBizPanelItemRender';

  async createController(
    panelItem: IPanelContainer,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelItemRenderController> {
    const c = new PanelItemRenderController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
