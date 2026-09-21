import { IDashboardController, IPortletContainerController, IPortletProvider, ActionBarPortletController } from '@ibiz-template/runtime';
import { IDBToolbarPortlet } from '@ibiz/model-core';
/**
 * 操作栏门户部件适配器
 *
 * @author zk
 * @date 2023-07-12 08:07:58
 * @export
 * @class ActionBarPortletProvider
 * @implements {IPortletProvider}
 */
export declare class ActionBarPortletProvider implements IPortletProvider {
    component: string;
    createController(portletModel: IDBToolbarPortlet, dashboard: IDashboardController, parent?: IPortletContainerController): Promise<ActionBarPortletController>;
}
