import { IDashboard, IDBPortletPart } from '@ibiz/model-core';
import { IDashboardState, IDashboardEvent, IDashboardController, IPortletProvider, IPortletController, IPortletContainerController, ISearchCond, IApiPortletTypeMapping } from '../../../interface';
import { ControlController } from '../../common';
import { CustomDashboardController } from './custom-dashboard.controller';
import { MobCustomDashboardController } from './mob-custom-dashboard.controller';
/**
 * 数据看板部件控制器
 * @author lxm
 * @date 2023-07-07 03:27:29
 * @export
 * @class DashboardController
 * @extends {ControlController<IDashboard, IDashboardState, IDashboardEvent>}
 * @implements {IDashboardController}
 */
export declare class DashboardController extends ControlController<IDashboard, IDashboardState, IDashboardEvent> implements IDashboardController {
    /**
     * 所有数据看板成员的适配器
     *
     * @author lxm
     * @date 2022-08-24 20:08:07
     * @type {{ [key: string]: IPortletProvider }}
     */
    providers: {
        [key: string]: IPortletProvider;
    };
    /**
     * 门户部件控制器
     *
     * @author lxm
     * @date 2022-10-20 22:10:26
     * @type {{ [key: string]: IPortletController }}
     */
    portlets: {
        [key: string]: IPortletController;
    };
    /**
     * 动态门户部件Map
     *
     * @author tony001
     * @date 2024-07-09 17:07:57
     * @type {Map<string, IData>}
     */
    dynaPortletMap: Map<string, IData>;
    /**
     * 自定义数据看板部件控制器
     *
     * @author tony001
     * @date 2024-07-26 14:07:38
     * @type {(CustomDashboardController | undefined)}
     */
    customDashboard: CustomDashboardController | undefined;
    /**
     * @description 移动端自定义数据看板部件控制器
     * @type {(MobCustomDashboardController | undefined)}
     * @memberof DashboardController
     */
    mobCustomDashboard: MobCustomDashboardController | undefined;
    enableAnchorCtrls: IData[];
    /**
     * 初始化状态
     *
     * @author tony001
     * @date 2024-07-26 14:07:19
     * @protected
     */
    protected initState(): void;
    protected onCreated(): Promise<void>;
    /**
     * 设置自定义数据看板部件控制器
     *
     * @author tony001
     * @date 2024-07-26 14:07:21
     * @param {CustomDashboardController} customDashboard
     */
    setCustomDashboard(customDashboard: CustomDashboardController): void;
    /**
     * 获取自定义数据看板部件控制器
     *
     * @author tony001
     * @date 2024-07-26 21:07:32
     * @return {*}  {(CustomDashboardController | undefined)}
     */
    getCustomDashboard(): CustomDashboardController | undefined;
    /**
     * @description 设置移动端自定义数据看板部件控制器
     * @param {MobCustomDashboardController} mobCustomDashboard
     * @memberof DashboardController
     */
    setMobCustomDashboard(mobCustomDashboard: MobCustomDashboardController): void;
    /**
     * @description 获取移动端自定义数据看板部件控制器
     * @returns {*}  {(MobCustomDashboardController | undefined)}
     * @memberof DashboardController
     */
    getMobCustomDashboard(): MobCustomDashboardController | undefined;
    /**
     * 初始化子门户部件
     *
     * @author lxm
     * @date 2022-10-21 03:10:49
     * @param {PortletPartModel[]} portletModels
     * @param {ContainerPortletController} [parent]
     * @returns {*}  {Promise<void>}
     */
    initPortlets(portletModels: IDBPortletPart[], parent?: IPortletContainerController): Promise<void>;
    /**
     * 初始化
     *
     * @param {IData} [config={}]
     * @return {*}  {Promise<void>}
     * @memberof DashboardController
     */
    initPortletsConfig(config?: IData): Promise<void>;
    /**
     * 重置门户
     *
     * @return {*}  {Promise<void>}
     * @memberof DashboardController
     */
    resetPortlets(): Promise<void>;
    /**
     * 加载动态
     *
     * @author tony001
     * @date 2024-06-27 16:06:21
     * @return {*}  {Promise<IData[]>}
     */
    loadAllDynaPortlet(): Promise<IData[]>;
    /**
     * 通过指定标识加载门户部件
     *
     * @author tony001
     * @date 2024-06-27 17:06:12
     * @param {string} id
     * @return {*}  {(Promise<IDBPortletPart | undefined>)}
     */
    loadDynaPortletById(id: string): Promise<IDBPortletPart | undefined>;
    /**
     * 通知所有表单成员表单操作过程中的数据变更
     *
     * @author lxm
     * @date 2022-09-20 18:09:40
     * @param {string[]} names
     */
    dataChangeNotify(data: IData): Promise<void>;
    /**
     * 打开过滤器设计界面
     *
     * @author tony001
     * @date 2024-07-26 11:07:02
     * @param {{ id: string }} { id } 过滤部件标识
     * @return {*}  {Promise<void>}
     */
    openFilterDesignPage(args?: {
        id: string;
    }): Promise<void>;
    /**
     * 保存过滤器数据
     *
     * @author tony001
     * @date 2024-07-26 16:07:01
     * @protected
     * @param {IModel} model
     * @param {IData} config
     * @param {boolean} isNewFilter
     */
    protected saveFilterData(model: IModel, config: IData, searchconds: ISearchCond, isNewFilter: boolean): Promise<void>;
    /**
     * 刷新数据
     *
     * @author tony001
     * @date 2024-07-28 09:07:21
     * @return {*}  {Promise<void>}
     */
    refresh(args?: IData): Promise<void>;
    /**
     * 通过门户部件标识获取参数
     *
     * @author tony001
     * @date 2024-07-28 12:07:41
     * @param {string} id
     * @return {*}  {IParams}
     */
    getExtendParamsById(id: string): IParams;
    /**
     * @description 获取门户部件
     * @template K
     * @param {K} type 门户部件类型
     * @param {string} id 门户部件标识
     * @returns {*}  {IApiPortletTypeMapping[K]}
     * @memberof IDashboardController
     */
    getPortlet<K extends keyof IApiPortletTypeMapping>(type: K, id: string): IApiPortletTypeMapping[K];
    /**
     * @description 转换各类多语言
     * @protected
     * @memberof IDashboardController
     */
    protected convertMultipleLanguages(): void;
}
//# sourceMappingURL=dashboard.controller.d.ts.map