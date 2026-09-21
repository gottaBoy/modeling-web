import { IPanelItem } from '@ibiz/model-core';
import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { RightSideMenuController } from './right-side-menu.controller';

export class RightSideMenuProvider implements IPanelItemProvider {
  component: string = 'IBizRightSideMenu';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<RightSideMenuController> {
    const c = new RightSideMenuController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
