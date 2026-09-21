import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelCtrlPos } from '@ibiz/model-core';
import { PanelCtrlViewPageCaptionController } from './panel-ctrl-view-page-caption.controller';

/**
 * 面板控件占位适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class PanelCtrlPosProvider
 * @implements {EditorProvider}
 */
export class PanelCtrlViewPageProvider implements IPanelItemProvider {
  component: string = 'IBizPanelCtrlViewPageCaption';

  async createController(
    panelItem: IPanelCtrlPos,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelCtrlViewPageCaptionController> {
    const c = new PanelCtrlViewPageCaptionController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
