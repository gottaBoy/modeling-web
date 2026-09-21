import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { CoopPosController } from './coop-pos.controller';

export class CoopPosProvider implements IPanelItemProvider {
  component: string = 'IBizCoopPos';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<CoopPosController> {
    const c = new CoopPosController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
