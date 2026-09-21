import {
  IDashboardController,
  IPortletContainerController,
  IPortletProvider,
  ActionBarPortletController,
} from '@ibiz-template/runtime';
import { IDBToolbarPortlet } from '@ibiz/model-core';

/**
 * 操作栏门户部件适配器
 *
 * @author zk
 * @date 2023-07-12 08:07:58
 * @export
 * @class ActionBarPortletProvider
 * @implements {IPortletProvider}
 */
export class ActionBarPortletProvider implements IPortletProvider {
  component: string = 'IBizActionBarPortlet';

  async createController(
    portletModel: IDBToolbarPortlet,
    dashboard: IDashboardController,
    parent?: IPortletContainerController,
  ): Promise<ActionBarPortletController> {
    const c = new ActionBarPortletController(portletModel, dashboard, parent);
    await c.init();
    return c;
  }
}
