import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { PanelRememberMeController } from './panel-remember-me.controller';

/**
 * 面板容器（记住我）适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class PanelRememberMeProvider
 * @implements {EditorProvider}
 */
export class PanelRememberMeProvider implements IPanelItemProvider {
  component: string = 'IBizPanelRememberMe';

  async createController(
    panelItem: IPanelContainer,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelItemController> {
    const c = new PanelRememberMeController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
