import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelCtrlPos } from '@ibiz/model-core';
import { TeleportPlaceholderController } from './teleport-placeholder.controller';

/**
 * 面板控件teleport占位适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class TeleportPlaceholderProvider
 * @implements {EditorProvider}
 */
export class TeleportPlaceholderProvider implements IPanelItemProvider {
  component: string = 'IBizTeleportPlaceholder';

  async createController(
    panelItem: IPanelCtrlPos,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<TeleportPlaceholderController> {
    const c = new TeleportPlaceholderController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
