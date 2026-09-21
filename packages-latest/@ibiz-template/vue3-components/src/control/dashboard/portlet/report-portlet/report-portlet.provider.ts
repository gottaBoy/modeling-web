import {
  IDashboardController,
  IPortletContainerController,
  IPortletProvider,
  ReportPortletController,
} from '@ibiz-template/runtime';
import { IDBReportPortletPart } from '@ibiz/model-core';

/**
 * 报表门户部件适配器
 *
 * @author tony001
 * @date 2024-06-19 17:06:17
 * @export
 * @class ReportPortletProvider
 * @implements {IPortletProvider}
 */
export class ReportPortletProvider implements IPortletProvider {
  component: string = 'IBizReportPortlet';

  async createController(
    portletModel: IDBReportPortletPart,
    dashboard: IDashboardController,
    parent?: IPortletContainerController,
  ): Promise<ReportPortletController> {
    const c = new ReportPortletController(portletModel, dashboard, parent);
    await c.init();
    return c;
  }
}
