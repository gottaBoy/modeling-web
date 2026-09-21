import { IPanelItem } from '@ibiz/model-core';
import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { BottomSideMenuController } from './bottom-side-menu.controller';

export class BottomSideMenuProvider implements IPanelItemProvider {
  component: string = 'IBizBottomSideMenu';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<BottomSideMenuController> {
    const c = new BottomSideMenuController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
