import { IDashboardController, IPortletContainerController, IPortletProvider, HtmlPortletController } from '@ibiz-template/runtime';
import { IDBHtmlPortletPart } from '@ibiz/model-core';
/**
 * 网页门户部件适配器
 *
 * @author zk
 * @date 2023-07-12 08:07:58
 * @export
 * @class HtmlPortletProvider
 * @implements {IPortletProvider}
 */
export declare class HtmlPortletProvider implements IPortletProvider {
    component: string;
    createController(portletModel: IDBHtmlPortletPart, dashboard: IDashboardController, parent?: IPortletContainerController): Promise<HtmlPortletController>;
}
