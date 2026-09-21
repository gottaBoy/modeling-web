import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { PanelAppTitleController } from './panel-app-title.controller';

/**
 * 面板应用标题适配器
 *
 * @export
 * @class PanelAppTitleProvider
 * @implements {IPanelItemProvider}
 */
export class PanelAppTitleProvider implements IPanelItemProvider {
  component: string = 'IBizPanelAppTitle';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelAppTitleController> {
    const c = new PanelAppTitleController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
