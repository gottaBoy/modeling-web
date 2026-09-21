import { IDashboardController, IPortletContainerController, IPortletController, IPortletProvider } from '@ibiz-template/runtime';
import { IDBPortletPart } from '@ibiz/model-core';

/**
 * @description 大屏数据看板适配器
 * @export
 * @class ScreenDashboardProvider
 * @implements {IPortletProvider}
 */
export declare class ScreenPortletProvider implements IPortletProvider {
    component: string;
    createController(portletModel: IDBPortletPart, dashboard: IDashboardController, parent?: IPortletContainerController): Promise<IPortletController>;
}
