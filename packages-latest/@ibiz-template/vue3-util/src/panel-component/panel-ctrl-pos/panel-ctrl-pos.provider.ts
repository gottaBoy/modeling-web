import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelCtrlPos } from '@ibiz/model-core';
import { PanelCtrlPosController } from './panel-ctrl-pos.controller';

/**
 * 面板控件占位适配器
 *
 * @author lxm
 * @date 2022-09-19 22:09:03
 * @export
 * @class PanelCtrlPosProvider
 * @implements {EditorProvider}
 */
export class PanelCtrlPosProvider implements IPanelItemProvider {
  component: string = 'IBizPanelCtrlPos';

  async createController(
    panelItem: IPanelCtrlPos,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<PanelCtrlPosController> {
    const c = new PanelCtrlPosController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
