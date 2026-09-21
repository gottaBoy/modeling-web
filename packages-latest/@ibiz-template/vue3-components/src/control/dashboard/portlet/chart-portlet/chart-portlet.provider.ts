import {
  IDashboardController,
  IPortletContainerController,
  IPortletProvider,
  ChartPortletController,
} from '@ibiz-template/runtime';
import { IDBChartPortlet } from '@ibiz/model-core';

/**
 * 图表看板视图适配器
 *
 * @author zk
 * @date 2023-07-12 08:07:58
 * @export
 * @class ChartPortletProvider
 * @implements {IPortletProvider}
 */
export class ChartPortletProvider implements IPortletProvider {
  component: string = 'IBizChartPortlet';

  async createController(
    portletModel: IDBChartPortlet,
    dashboard: IDashboardController,
    parent?: IPortletContainerController,
  ): Promise<ChartPortletController> {
    const c = new ChartPortletController(portletModel, dashboard, parent);
    await c.init();
    return c;
  }
}
