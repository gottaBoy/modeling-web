import {
  IDashboardController,
  IPortletContainerController,
  IPortletProvider,
  RawItemPortletController,
} from '@ibiz-template/runtime';
import { IDBRawItemPortletPart } from '@ibiz/model-core';

/**
 * 直接内容门户部件适配器
 *
 * @author zk
 * @date 2023-07-12 08:07:58
 * @export
 * @class RawItemPortletProvider
 * @implements {IPortletProvider}
 */
export class RawItemPortletProvider implements IPortletProvider {
  component: string = 'IBizRawItemPortlet';

  async createController(
    portletModel: IDBRawItemPortletPart,
    dashboard: IDashboardController,
    parent?: IPortletContainerController,
  ): Promise<RawItemPortletController> {
    const c = new RawItemPortletController(portletModel, dashboard, parent);
    await c.init();
    return c;
  }
}
