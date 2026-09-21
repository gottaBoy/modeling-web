import { IDBToolbarPortlet } from '@ibiz/model-core';
import { IDashboardController, IPortletContainerController, IPortletProvider } from '@ibiz-template/runtime';
import { ScreenPortletRealTimeController } from './screen-portlet-real-time.controller';

/**
 * @description 实时时间
 * @export
 * @class DigitalFlopProvider
 * @implements {IEditorProvider}
 */
export declare class ScreenPortletRealTimeProvider implements IPortletProvider {
    component: string;
    createController(portletModel: IDBToolbarPortlet, dashboard: IDashboardController, parent?: IPortletContainerController): Promise<ScreenPortletRealTimeController>;
}
