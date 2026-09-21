import {
  IPanelItemNavPosController,
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { NavPosController } from './nav-pos.controller';

/**
 * 导航占位适配器
 *
 * @export
 * @class NavPosProvider
 * @implements {IPanelItemProvider}
 */
export class NavPosProvider implements IPanelItemProvider {
  component: string = 'IBizNavPos';

  /**
   * 创建控制器
   *
   * @param {IPanelItem} panelItem
   * @param {PanelController} panel
   * @param {(PanelItemController | undefined)} parent
   * @return {*}  {Promise<IPanelItemNavPosController>}
   * @memberof NavPosProvider
   */
  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<IPanelItemNavPosController> {
    const c = new NavPosController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
