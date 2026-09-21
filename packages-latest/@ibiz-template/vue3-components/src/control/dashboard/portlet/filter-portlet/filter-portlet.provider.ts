import {
  IDashboardController,
  IPortletContainerController,
  IPortletProvider,
  FilterPortletController,
} from '@ibiz-template/runtime';
import { IDBHtmlPortletPart } from '@ibiz/model-core';

/**
 * 过滤器门户部件适配器
 *
 * @author zzq
 * @date 2024-07-24 14:07:58
 * @export
 * @class FilterPortletProvider
 * @implements {IPortletProvider}
 */
export class FilterPortletProvider implements IPortletProvider {
  component: string = 'IBizFilterPortlet';

  async createController(
    portletModel: IDBHtmlPortletPart,
    dashboard: IDashboardController,
    parent?: IPortletContainerController,
  ): Promise<FilterPortletController> {
    const c = new FilterPortletController(portletModel, dashboard, parent);
    await c.init();
    return c;
  }
}
