import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { PanelContainerController } from '@ibiz-template/vue3-util';
import { IPanelContainer } from '@ibiz/model-core';

/**
 * 首页行为适配器
 *
 * @author lxm
 * @date 2023-10-18 03:55:02
 * @export
 * @class IndexActionsProvider
 * @implements {IPanelItemProvider}
 */
export class IndexActionsProvider implements IPanelItemProvider {
  component: string = 'IBizIndexActions';

  async createController(
    panelItem: IPanelContainer,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelItemController> {
    const c = new PanelContainerController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
