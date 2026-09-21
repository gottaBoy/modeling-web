import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';

/**
 * 消息通知适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class UserMessageProvider
 * @implements {EditorProvider}
 */
export class UserMessageProvider implements IPanelItemProvider {
  component: string = 'IBizUserMessage';

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
