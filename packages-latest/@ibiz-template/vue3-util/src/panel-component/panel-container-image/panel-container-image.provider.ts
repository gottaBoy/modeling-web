import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelContainer } from '@ibiz/model-core';
import { PanelContainerImageController } from './panel-container-image.controller';

/**
 * 面板图片容器适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class PanelContainerImageProvider
 * @implements {EditorProvider}
 */
export class PanelContainerImageProvider implements IPanelItemProvider {
  component: string = 'IBizPanelContainerImage';

  async createController(
    panelItem: IPanelContainer,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelItemController> {
    const c = new PanelContainerImageController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
