import { IDashboardController, IPortletContainerController, IPortletProvider } from '@ibiz-template/runtime';
import { IDBToolbarPortlet } from '@ibiz/model-core';
import { CustomImageSearchBoxEditorController } from './custom-image-search-box.controller';

/**
 * 直接内容(活动)编辑器适配器
 *
 * @export
 * @class RawActivityEditorProvider
 * @implements {EditorProvider}
 */
export declare class CustomImageSearchBoxEditorProvider implements IPortletProvider {
    component: string;
    createController(portletModel: IDBToolbarPortlet, dashboard: IDashboardController, parent?: IPortletContainerController): Promise<CustomImageSearchBoxEditorController>;
}
