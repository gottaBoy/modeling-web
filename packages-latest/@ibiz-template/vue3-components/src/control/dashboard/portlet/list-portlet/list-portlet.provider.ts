import {
  IDashboardController,
  IPortletContainerController,
  IPortletProvider,
  ListPortletController,
} from '@ibiz-template/runtime';
import { IDBListPortletPart } from '@ibiz/model-core';

/**
 * 列表门户部件适配器
 *
 * @author zk
 * @date 2023-07-12 08:07:58
 * @export
 * @class ListPortletProvider
 * @implements {IPortletProvider}
 */
export class ListPortletProvider implements IPortletProvider {
  component: string = 'IBizListPortlet';

  async createController(
    portletModel: IDBListPortletPart,
    dashboard: IDashboardController,
    parent?: IPortletContainerController,
  ): Promise<ListPortletController> {
    const c = new ListPortletController(portletModel, dashboard, parent);
    await c.init();
    return c;
  }
}
