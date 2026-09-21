import { IPortalMessage } from '@ibiz-template/core';
import { IMDControl, IAppDataEntity } from '@ibiz/model-core';
import { EventBase, IMDControlEvent, IMDControlState, MDCtrlLoadParams, IApiMDGroupParams, MDCtrlRemoveParams, IToolbarController, IMDControlController, IApiExportParams } from '../../../interface';
import { MDControlService } from '../../../service';
import { ControllerEvent } from '../../utils';
import { ControlController } from './control.controller';
/**
 * 多数据部件控制器
 *
 * @author chitanda
 * @date 2022-08-01 18:08:13
 * @export
 * @class MDControlController
 * @extends {ControlController<T>}
 * @template T
 */
export declare class MDControlController<T extends IMDControl = IMDControl, S extends IMDControlState = IMDControlState, E extends IMDControlEvent = IMDControlEvent> extends ControlController<T, S, E> implements IMDControlController<T, S, E> {
    /**
     * 多数据部件服务
     *
     * @author lxm
     * @date 2022-08-19 13:08:51
     * @type {EntityService}
     */
    service: MDControlService;
    /**
     * 是否设置过排序条件，比如searchBars默认点击分组时设置了
     * @return {*}
     * @author: zhujiamin
     * @Date: 2024-02-22 16:10:23
     */
    isSetSort: boolean;
    /**
     * 是否允许加载数据
     *
     * @author ljx
     * @date 2024-11-15 15:08:51
     * @type {boolean}
     */
    enableLoad: boolean;
    /**
     * @description 分组日期格式化
     * @protected
     * @type {(('year' | 'quarter' | 'month' | 'week' | 'day')[])}
     * @memberof MDControlController
     */
    protected groupDateFormat: ('year' | 'quarter' | 'month' | 'week' | 'day')[];
    /**
     * 刷新模式
     *
     * @readonly
     * @type {('nocache' | 'cache')}
     * @memberof MDControlController
     */
    get refreshMode(): 'nocache' | 'cache';
    /**
     * 批操作工具栏显示模式
     *
     * @readonly
     * @type {('default' | 'multiple')}
     * @memberof MDControlController
     */
    get batchToolbarMode(): 'default' | 'multiple';
    /**
     * @description 是否显示批操作工具栏
     * @readonly
     * @type {boolean}
     * @memberof MDControlController
     */
    get showBatchToolbar(): boolean;
    /**
     * @description 分页显示模式，default：显示完整分页栏，simple：只显示总条数，上一页，页码栏，下一页
     * @readonly
     * @type {('default' | 'simple')}
     * @memberof MDControlController
     */
    get paginationMode(): 'default' | 'simple';
    protected get _evt(): ControllerEvent<IMDControlEvent>;
    /**
     * 获取部件通用的事件参数
     *
     * @return {*}  {Omit<EventBase, 'eventName'>}
     * @memberof MDControlController
     */
    getEventArgs(): Omit<EventBase, 'eventName'>;
    protected initState(): void;
    /**
     * 实体属性映射，key是id，value是name
     * @author lxm
     * @date 2023-09-07 03:16:56
     * @protected
     */
    protected fieldIdNameMap: Map<string, string>;
    /**
     * 当前多数据部件对应的应用实体对象
     *
     * @author chitanda
     * @date 2023-09-13 17:09:32
     * @protected
     * @type {IAppDataEntity}
     */
    protected dataEntity: IAppDataEntity;
    /**
     * 批操作工具栏
     *
     * @author zk
     * @date 2023-08-02 06:08:34
     * @readonly
     * @type {(IToolbarController | undefined)}
     * @memberof ListController
     */
    protected get batchToolbarController(): IToolbarController | undefined;
    /**
     * 快速工具栏
     *
     * @author zk
     * @date 2023-08-02 06:08:34
     * @readonly
     * @type {(IToolbarController | undefined)}
     * @memberof ListController
     */
    protected get quickToolbarController(): IToolbarController | undefined;
    protected onCreated(): Promise<void>;
    protected onMounted(): Promise<void>;
    /**
     * @description 初始化界面行为组
     * @protected
     * @memberof MDControlController
     */
    protected initUIActions(): Promise<void>;
    /**
     * @description 执行多数据分组
     * - 子类实现
     * @param {IApiMDGroupParams[]} [_arg] 分组参数集合（多层分组暂未支持）
     * @param {IParams} [_params] 额外参数
     * @returns {*}  {Promise<void>}
     * @memberof MDControlController
     */
    execGroup(_arg: IApiMDGroupParams[], _params?: IParams): Promise<void>;
    /**
     * 获取部件默认排序模型
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-28 18:43:27
     */
    getSortModel(): {
        minorSortAppDEFieldId: string | undefined;
        minorSortDir: string | undefined;
    };
    /**
     * 显示内置导航视图变化
     *
     * @memberof MDControlController
     */
    onShowNavViewChange(): void;
    /**
     * 打开内置导航视图
     * - 默认为当前激活数据
     * @param {IData} [data]
     * @memberof MDControlController
     */
    openNavView(data?: IData): void;
    /**
     * 设置排序
     * 无参数时设置的是默认排序。
     *
     * @author lxm
     * @date 2022-09-28 13:09:44
     * @param {string} key 排序字段
     * @param {string} order 排序顺序
     */
    setSort(key?: string, order?: 'asc' | 'desc'): void;
    /**
     * 获取请求过滤参数（整合了视图参数，各种过滤条件，排序，分页）
     * @author lxm
     * @date 2023-05-23 03:20:40
     * @param {IParams} [extraParams] 额外视图参数，附加在最后
     * @return {*}  {Promise<IParams>}
     */
    getFetchParams(extraParams?: IParams): Promise<IParams>;
    /**
     * 加载更多
     *
     * @author zhanghengfeng
     * @date 2024-06-11 19:06:15
     * @return {*}  {Promise<void>}
     */
    loadMore(): Promise<void>;
    /**
     * 部件加载数据行为
     *
     * @author lxm
     * @date 2022-08-19 14:08:50
     */
    load(args?: MDCtrlLoadParams): Promise<IData[]>;
    /**
     * @description 根据选中标识计算选中数据
     * @protected
     * @memberof MDControlController
     */
    protected calcSelectDataBySelectKey(): void;
    /**
     * @description 处理刷新模式
     * @protected
     * @param {MDCtrlLoadParams} args
     * @memberof MDControlController
     */
    protected handleRefreshMode(args: MDCtrlLoadParams): void;
    /**
     * 部件加载后处理
     *
     * @author chitanda
     * @date 2023-06-21 15:06:44
     * @param {MDCtrlLoadParams} args 本次请求参数
     * @param {IData[]} items 上游处理的数据（默认是后台数据）
     * @return {*}  {Promise<IData[]>} 返回给后续处理的数据
     */
    afterLoad(args: MDCtrlLoadParams, items: IData[]): Promise<IData[]>;
    /**
     * 部件刷新，走初始加载(规避预置后续刷新和通知刷新同时进行)
     *
     * @author tony001
     * @date 2024-03-28 18:03:00
     * @return {*}  {Promise<void>}
     */
    refresh(): Promise<void>;
    /**
     * 删除选中的数据
     *
     * @author lxm
     * @date 2022-09-06 19:09:48
     * @returns {*}  {Promise<void>}
     */
    remove(args?: MDCtrlRemoveParams): Promise<void>;
    /**
     * @description 处理项删除
     * @param {IData} item
     * @param {IContext} context
     * @param {IParams} params
     * @returns {*}  {Promise<boolean>}
     * @memberof MDControlController
     */
    handleItemRemove(item: IData, context: IContext, params: IParams): Promise<boolean>;
    /**
     * 后台删除结束后界面删除逻辑
     *
     * @author lxm
     * @date 2022-09-06 19:09:10
     * @param {IData} data
     */
    afterRemove(data: IData): void;
    /**
     * 获取多数据部件的选中数据集合
     *
     * @author lxm
     * @date 2022-08-30 18:08:00
     * @returns {*}  {IData[]}
     */
    getData(): IData[];
    /**
     * @description 设置选中数据
     * @param {IData[]} items
     * @memberof MDControlController
     */
    setSelectedData(items: IData[]): void;
    /**
     * 设置导航数据
     *
     * @param {IData} item
     * @memberof MDControlController
     */
    setNavData(item: IData): void;
    setActive(item: IData, event?: MouseEvent): Promise<void>;
    setSelection(selection: IData[], isEmit?: boolean): void;
    /**
     * 行单击事件
     *
     * @author lxm
     * @date 2022-08-18 22:08:16
     * @param {IData} data 选中的单条数据
     * @param {MouseEvent} event
     */
    onRowClick(_data: IData, event?: MouseEvent): Promise<void>;
    /**
     * 行双击事件
     *
     * @author lxm
     * @date 2022-08-18 22:08:16
     * @param {IData} data 选中的单条数据
     */
    onDbRowClick(_data: IData): Promise<void>;
    /**
     * 数据导入
     *
     * @author lxm
     * @date 2022-11-08 15:11:54
     * @returns {*}  {Promise<void>}
     */
    importData(): Promise<void>;
    /**
     * 数据导出
     *
     * @param {{ event?: MouseEvent; params?: IApiExportParams }} _args 导出参数
     * @returns {*}  {Promise<void>}
     * @memberof MDControlController
     */
    exportData(_args: {
        event?: MouseEvent;
        params?: IApiExportParams;
    }): Promise<void>;
    /**
     * 检测实体数据变更
     *
     * @author tony001
     * @date 2024-03-28 18:03:30
     * @protected
     * @param {IPortalMessage} msg
     * @return {*}  {void}
     */
    protected onDEDataChange(msg: IPortalMessage): void;
    /**
     * 跳转第一页
     *
     * @author tony001
     * @date 2024-07-15 14:07:03
     * @return {*}  {Promise<IData[]>}
     */
    goToFirstPage(): Promise<IData[]>;
    /**
     * 跳转上一页
     *
     * @author tony001
     * @date 2024-07-15 14:07:28
     * @return {*}  {Promise<IData[]>}
     */
    goToPreviousPage(): Promise<IData[]>;
    /**
     * 跳转下一页
     *
     * @author tony001
     * @date 2024-07-15 14:07:34
     * @return {*}  {Promise<IData[]>}
     */
    goToNextPage(): Promise<IData[]>;
    /**
     * 跳转最后一页
     *
     * @author tony001
     * @date 2024-07-15 14:07:44
     * @return {*}  {Promise<IData[]>}
     */
    goToLastPage(): Promise<IData[]>;
    /**
     * @description 选中全部数据
     * @param {boolean} [state]
     * @returns {*}  {void}
     * @memberof MDControlController
     */
    selectAll(state?: boolean): void;
    /**
     * @description 计算导航参数
     * @param {IData} data
     * @returns {*}  {{ context: IContext; params: IParams }}
     * @memberof MDControlController
     */
    calcNavParams(data: IData): {
        context: IContext;
        params: IParams;
    };
    /**
     * @description 新建行
     * - 子类实现
     * @param {MDCtrlLoadParams} [args={}]
     * @returns {*}  {Promise<void>}
     * @memberof MDControlController
     */
    newRow(args?: MDCtrlLoadParams): Promise<void>;
}
//# sourceMappingURL=md-control.controller.d.ts.map