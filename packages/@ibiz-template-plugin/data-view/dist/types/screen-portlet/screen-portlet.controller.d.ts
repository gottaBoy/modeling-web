import { IAppPortlet, IDBPortletPart } from '@ibiz/model-core';
import { IDashboardController, IPortletContainerController, PortletPartController } from '@ibiz-template/runtime';

export declare class ScreenPortletController extends PortletPartController<IDBPortletPart> {
    /**
     * @description 控件参数
     * @type {IData}
     * @memberof ScreenPortletController
     */
    controlParam: IData;
    /**
     * @description 边框样式
     * @type {string}
     * @memberof ScreenPortletController
     */
    borderStyle: string;
    /**
     * @description 边框模式
     * @type {('full' | 'body')}
     * @memberof ScreenPortletController
     */
    borderMode: 'full' | 'body';
    /**
     * @description 图标类型
     * @type {('full' | 'icon')}
     * @memberof ScreenPortletController
     */
    iconType: 'full' | 'icon';
    appPortlets: IAppPortlet[];
    /**
     * @description 内容区背景图
     * @type {string}
     * @memberof ScreenPortletController
     */
    bodyBgUrl: string;
    /**
     * 重写
     * @param {T} model
     * @param {IDashboardController} dashboard
     * @param {IPortletContainerController} [parent]
     * @memberof ScreenPortletController
     */
    constructor(model: IDBPortletPart, dashboard: IDashboardController, parent?: IPortletContainerController);
    /**
     * @description 初始化控件参数
     * @memberof ScreenPortletController
     */
    initControlParams(): void;
}
