import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';

/**
 * 快捷方式组件适配器
 *
 * @class ShortCutProvider
 * @implements {EditorProvider}
 */
export class ShortCutProvider implements IPanelItemProvider {
  component: string = 'IBizShortCut';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelItemController> {
    const c = new PanelItemController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
