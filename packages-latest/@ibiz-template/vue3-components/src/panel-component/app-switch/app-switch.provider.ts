import { IPanelItem } from '@ibiz/model-core';
import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { AppSwitchController } from './app-switch.controller';

export class AppSwitchProvider implements IPanelItemProvider {
  component: string = 'IBizAppSwitch';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<AppSwitchController> {
    const c = new AppSwitchController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
