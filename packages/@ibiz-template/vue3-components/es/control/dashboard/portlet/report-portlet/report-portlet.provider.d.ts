import { IDashboardController, IPortletContainerController, IPortletProvider, ReportPortletController } from '@ibiz-template/runtime';
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
export declare class ReportPortletProvider implements IPortletProvider {
    component: string;
    createController(portletModel: IDBReportPortletPart, dashboard: IDashboardController, parent?: IPortletContainerController): Promise<ReportPortletController>;
}
