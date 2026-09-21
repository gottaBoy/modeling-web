import { IDashboard, IDBPortletPart } from '@ibiz/model-core';
import { IDashboardEvent } from '../../event';
import { IDashboardState } from '../../state';
import { IControlController } from './i-control.controller';
import { ICustomDesign } from '../../common';
import { IPortletController } from './portlet';
/**
 * 数据看板控制器
 * @author lxm
 * @date 2023-05-04 02:58:18
 * @export
 * @interface IDashboardController
 * @extends {IControlController}
 */
export interface IDashboardController extends IControlController<IDashboard, IDashboardState, IDashboardEvent> {
    /**
     * @description 门户控制器
     * @type {{ [key: string]: IPortletController }}
     * @memberof IDashboardController
     */
    portlets: {
        [key: string]: IPortletController;
    };
    /**
     * 设置自定义数据看板部件控制器
     *
     * @author tony001
     * @date 2024-07-26 14:07:21
     * @param {ICustomDesign} customDashboard
     */
    setCustomDashboard(customDashboard: ICustomDesign): void;
    /**
     * 自定义数据看板部件控制器
     *
     * @author tony001
     * @date 2024-07-26 21:07:52
     * @return {*}  {(ICustomDesign | undefined)}
     */
    getCustomDashboard(): ICustomDesign | undefined;
    /**
     * 通过指定标识加载门户部件
     *
     * @author tony001
     * @date 2024-07-23 19:07:31
     * @param {string} id
     * @return {*}  {(Promise<IDBPortletPart | undefined>)}
     */
    loadDynaPortletById(id: string): Promise<IDBPortletPart | undefined>;
    /**
     * 打开过滤器设计界面
     *
     * @author tony001
     * @date 2024-07-26 11:07:02
     * @param {{ id: string }} args 过滤部件设计界面参数
     * @return {*}  {Promise<void>}
     */
    openFilterDesignPage(args?: {
        id?: string;
    }): Promise<void>;
    /**
     * 刷新数据
     *
     * @author tony001
     * @date 2024-07-28 09:07:15
     * @return {*}  {Promise<void>}
     */
    refresh(): Promise<void>;
    /**
     * 通过门户部件标识获取参数
     *
     * @author tony001
     * @date 2024-07-28 12:07:58
     * @param {string} id
     * @return {*}  {IParams}
     */
    getExtendParamsById(id: string): IParams;
}
//# sourceMappingURL=i-dashboard.controller.d.ts.map