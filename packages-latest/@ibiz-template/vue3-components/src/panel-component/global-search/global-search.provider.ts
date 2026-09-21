import { IPanelItem } from '@ibiz/model-core';
import {
  PanelController,
  IPanelItemProvider,
  PanelItemController,
} from '@ibiz-template/runtime';
import { GlobalSearchController } from './global-search.controller';

/**
 * 全局搜索适配器
 *
 * @export
 * @class GlobalSearchProvider
 * @implements {IPanelItemProvider}
 */
export class GlobalSearchProvider implements IPanelItemProvider {
  component: string = 'IBizGlobalSearch';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<GlobalSearchController> {
    const c = new GlobalSearchController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
