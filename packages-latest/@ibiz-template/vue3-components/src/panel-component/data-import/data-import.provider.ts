import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';

/**
 * 用户信息适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class DataImportProvider
 * @implements {EditorProvider}
 */
export class DataImportProvider implements IPanelItemProvider {
  component: string = 'IBizDataImportShell';

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
