import {
  IDashboardController,
  IPortletContainerController,
  IPortletProvider,
  ViewPortletController,
} from '@ibiz-template/runtime';
import { IDBPortletPart } from '@ibiz/model-core';

/**
 * 数据看板视图适配器
 *
 * @author zk
 * @date 2023-07-12 08:07:58
 * @export
 * @class ViewPortletProvider
 * @implements {IPortletProvider}
 */
export class ViewPortletProvider implements IPortletProvider {
  component: string = 'IBizViewPortlet';

  async createController(
    portletModel: IDBPortletPart,
    dashboard: IDashboardController,
    parent?: IPortletContainerController,
  ): Promise<ViewPortletController> {
    const c = new ViewPortletController(portletModel, dashboard, parent);
    await c.init();
    return c;
  }
}
