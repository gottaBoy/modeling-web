import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { PanelRawItemController } from './panel-rawitem.controller';

/**
 * 面板属性适配器
 *
 * @export
 * @class PanelRawItemProvider
 * @implements {IPanelItemProvider}
 */
export class PanelRawItemProvider implements IPanelItemProvider {
  component: string = 'IBizPanelRawItem';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelRawItemController> {
    const c = new PanelRawItemController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
