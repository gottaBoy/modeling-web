import { IPanelItem } from '@ibiz/model-core';
import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { TopSideMenuController } from './top-side-menu.controller';

export class TopSideMenuProvider implements IPanelItemProvider {
  component: string = 'IBizTopSideMenu';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<TopSideMenuController> {
    const c = new TopSideMenuController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
