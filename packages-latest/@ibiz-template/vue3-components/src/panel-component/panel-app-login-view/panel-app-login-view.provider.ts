import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { PanelAppLoginViewController } from './panel-app-login-view.controller';

/**
 * 面板容器（应用登录视图）适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class PanelAppLoginViewProvider
 * @implements {EditorProvider}
 */
export class PanelAppLoginViewProvider implements IPanelItemProvider {
  component: string = 'IBizPanelAppLoginView';

  async createController(
    panelItem: IPanelContainer,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelItemController> {
    const c = new PanelAppLoginViewController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
