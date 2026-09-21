import { ContainerPortletController, IDashboardController, IPortletContainerController, IPortletProvider } from '@ibiz-template/runtime';
import { IDBPortletPart } from '@ibiz/model-core';
/**
 * 数据看板容器适配器
 *
 * @author lxm
 * @date 2022-10-19 15:10:44
 * @export
 * @class ListPortletProvider
 */
export declare class ContainerPortletProvider implements IPortletProvider {
    component: string;
    createController(portletModel: IDBPortletPart, dashboard: IDashboardController, parent?: IPortletContainerController): Promise<ContainerPortletController>;
}
