import {
  IPanelItemProvider,
  PanelController,
  PanelItemController,
} from '@ibiz-template/runtime';
import { IPanelItem } from '@ibiz/model-core';
import { NavBreadcrumbController } from './nav-breadcrumb.controller';

/**
 * @description 面包屑导航栏
 * @export
 * @class NavBreadcrumbProvider
 * @implements {IPanelItemProvider}
 */
export class NavBreadcrumbProvider implements IPanelItemProvider {
  component: string = 'IBizNavBreadcrumb';

  async createController(
    panelItem: IPanelItem,
    panel: PanelController,
    parent: PanelItemController | undefined,
  ): Promise<NavBreadcrumbController> {
    const c = new NavBreadcrumbController(panelItem, panel, parent);
    await c.init();
    return c;
  }
}
