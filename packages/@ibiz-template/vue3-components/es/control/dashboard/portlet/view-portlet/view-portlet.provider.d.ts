import { IDashboardController, IPortletContainerController, IPortletProvider, ViewPortletController } from '@ibiz-template/runtime';
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
export declare class ViewPortletProvider implements IPortletProvider {
    component: string;
    createController(portletModel: IDBPortletPart, dashboard: IDashboardController, parent?: IPortletContainerController): Promise<ViewPortletController>;
}
