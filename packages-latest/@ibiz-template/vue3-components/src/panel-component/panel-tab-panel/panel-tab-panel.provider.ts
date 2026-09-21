import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { PanelTabPanelController } from './panel-tab-panel.controller';

/**
 * 面板分页面板适配器
 *
 * @export
 * @class PanelTabPanelController
 * @implements {IPanelItemProvider}
 */
export class PanelTabPanelProvider implements IPanelItemProvider {
  component: string = 'IBizPanelTabPanel';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelTabPanelController> {
    const c = new PanelTabPanelController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
