import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { PanelFieldController } from './panel-field.controller';

/**
 * 面板属性适配器
 *
 * @export
 * @class PanelFieldProvider
 * @implements {IPanelItemProvider}
 */
export class PanelFieldProvider implements IPanelItemProvider {
  component: string = 'IBizPanelField';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelFieldController> {
    const c = new PanelFieldController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
