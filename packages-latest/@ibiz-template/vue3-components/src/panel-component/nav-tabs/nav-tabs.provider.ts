import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { NavTabsController } from './nav-tabs.controller';

/**
 * 导航标签页占位适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class NavTabsProvider
 * @implements {EditorProvider}
 */
export class NavTabsProvider implements IPanelItemProvider {
  component: string = 'IBizNavTabs';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<NavTabsController> {
    const c = new NavTabsController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
