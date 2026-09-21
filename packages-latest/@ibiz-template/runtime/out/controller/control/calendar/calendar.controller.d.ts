import { ISysCalendar, ISysCalendarItem } from '@ibiz/model-core';
import { ICalendarState, ICalendarEvent, IUIActionResult, MDCtrlLoadParams, ICalendarItemData, ICalendarController } from '../../../interface';
import { MDControlController } from '../../common';
import { CalendarService, ILoadMoreItem } from './calendar.service';
import { ViewLogicScheduler } from '../../../logic-scheduler';
import { ContextMenuController } from '../context-menu';
/**
 * 日历部件控制器
 *
 * @author zk
 * @date 2023-08-09 11:08:46
 * @export
 * @class CalendarController
 * @extends {MDControlController<ISysCalendar, ICalendarState, ICalendarEvent>}
 * @implements {ICalendarController}
 */
export declare class CalendarController extends MDControlController<ISysCalendar, ICalendarState, ICalendarEvent> implements ICalendarController {
    /**
     * 多数据部件服务
     *
     * @author zk
     * @date 2023-08-08 01:08:56
     * @type {CalendarService}
     * @memberof CalendarController
     */
    service: CalendarService;
    /**
     * 视图逻辑触发器
     *
     * @type {ViewLogicScheduler}
     * @memberof CalendarService
     */
    viewScheduler?: ViewLogicScheduler;
    /**
     * 上下文菜单控制器
     * @author lxm
     * @date 2023-08-21 10:56:24
     * @type {{ [p: string]: ContextMenuController }}
     */
    contextMenus: {
        [p: string]: ContextMenuController;
    };
    /**
     * @description 时光轴时间戳格式化串
     * @type {string}
     * @memberof CalendarController
     */
    timelineCaptionFormat: string;
    /**
     * @description 获取加载更多信息数据
     * @readonly
     * @type {{
     *       [modelId: string]: ILoadMoreItem;
     *     }}
     * @memberof CalendarController
     */
    get loadMoreItems(): {
        [modelId: string]: ILoadMoreItem;
    };
    /**
     * @description 分组时间属性
     * @readonly
     * @type {('beginTime' | 'endTime')} 开始时间 | 结束时间
     * @memberof CalendarController
     */
    get groupTimeField(): 'beginTime' | 'endTime';
    /**
     * @description 时间范围模式
     * @readonly
     * @type {('custom' | 'quarter' | 'year' | 'halfYear')}
     * @memberof CalendarController
     */
    get timeRangeMode(): 'custom' | 'quarter' | 'year' | 'halfYear';
    /**
     * 初始化状态
     *
     * @author zk
     * @date 2023-08-09 11:08:05
     * @protected
     * @memberof CalendarController
     */
    protected initState(): void;
    /**
     * 生命周期-创建完成
     *
     * @author zk
     * @date 2023-08-09 11:08:13
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof CalendarController
     */
    protected onCreated(): Promise<void>;
    /**
     * @description 初始化时间范围
     * @protected
     * @memberof CalendarController
     */
    protected initTimeRange(): void;
    /**
     * @description 执行行为
     * @param {string} uiActionId
     * @param {ICalendarItemData} data
     * @param {MouseEvent} event
     * @param {string} appId
     * @returns {*}  {Promise<void>}
     * @memberof CalendarController
     */
    doUIAction(uiActionId: string, item: ICalendarItemData, event: MouseEvent, appId: string): Promise<void>;
    /**
     * 初始化日历图例
     *
     * @protected
     * @memberof CalendarController
     */
    protected initCalendarLegends(): void;
    /**
     * 初始化视图触发器
     *
     * @protected
     * @memberof CalendarService
     */
    protected initViewScheduler(): void;
    /**
     * 销毁
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof LightCalendarController
     */
    protected onDestroyed(): Promise<void>;
    /**
     * 设置激活数据
     *
     * @param {ICalendarItemData} item
     * @return {*}  {Promise<void>}
     * @memberof CalendarService
     */
    setActive(item: ICalendarItemData): Promise<void>;
    /**
     * @description 打开编辑数据视图
     * @param {IData} item
     * @param {MouseEvent} [event]
     * @returns {*}  {Promise<IUIActionResult>}
     * @memberof CalendarController
     */
    openData(item: IData, event?: MouseEvent): Promise<IUIActionResult>;
    /**
     * @description 打开新建编辑视图
     * @param {IData} item
     * @returns {*}  {Promise<IUIActionResult>}
     * @memberof CalendarController
     */
    newData(item: IData, event?: MouseEvent): Promise<IUIActionResult>;
    /**
     * 计算表格展示模式
     * @author fzh
     * @date 2024-05-29 19:18:42
     * @return {*}  {void}
     */
    calcShowMode(items: IData): void;
    /**
     * 日历加载
     *
     * @author zk
     * @date 2023-08-08 01:08:24
     * @param {MDCtrlLoadParams} [args={}]
     * @return {*}  {Promise<IData[][]>}
     * @memberof CalendarController
     */
    load(args?: MDCtrlLoadParams): Promise<ICalendarItemData[]>;
    /**
     * 部件加载后处理
     *
     * @param {MDCtrlLoadParams} args
     * @param {IData[]} items
     * @return {*}  {Promise<IData[]>}
     * @memberof CalendarController
     */
    afterLoad(args: MDCtrlLoadParams, items: IData[]): Promise<IData[]>;
    /**
     * 处理数据分组
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof CalendarController
     */
    protected handleDataGroup(): Promise<void>;
    /**
     * 日历项排序
     * - 默认开始时间倒序
     * @protected
     * @param {ICalendarItemData[]} items 日历项集合
     * @param {('beginTime' | 'endTime')} [sortField='beginTime']
     * @memberof CalendarController
     */
    protected sortItems(items: ICalendarItemData[], sortField?: 'beginTime' | 'endTime'): void;
    /**
     * 获取当前选中的日期
     *
     * @author zk
     * @date 2023-08-08 11:08:44
     * @protected
     * @param {IParams} param
     * @return {*}  {IData}
     * @memberof CalendarController
     */
    protected getCurSelectDate(param: IParams): IData;
    /**
     * 获取请求参数
     *
     * @author zk
     * @date 2023-08-09 11:08:35
     * @param {IParams} [extraParams={}]
     * @return {*}  {Promise<IParams>}
     * @memberof CalendarController
     */
    getFetchParams(extraParams?: IParams): Promise<IParams>;
    /**
     * 行单击事件
     *
     * @author zk
     * @date 2023-08-08 05:08:15
     * @param {ICalendarItemData} data
     * @return {*}  {Promise<void>}
     * @memberof CalendarController
     */
    onRowClick(_data: ICalendarItemData): Promise<void>;
    /**
     * 双击事件
     *
     * @param {ICalendarItemData} data
     * @return {*}  {Promise<void>}
     * @memberof CalendarController
     */
    onDbRowClick(_data: ICalendarItemData): Promise<void>;
    /**
     * 设置选中日期
     *
     * @author zk
     * @date 2023-08-08 11:08:08
     * @param {Date} date
     * @memberof CalendarController
     */
    setSelectDate(date: Date): void;
    /**
     * @description 根据数据主键获取日历项模型
     * @param {string} key
     * @returns {*}  {(ISysCalendarItem | undefined)}
     * @memberof CalendarController
     */
    getItemModelByKey(key: string): ISysCalendarItem | undefined;
    /**
     * @description 处理项删除
     * @param {ICalendarItemData} item 日历项
     * @param {IContext} context 上下文
     * @param {IParams} params 视图参数
     * @returns {*}  {Promise<boolean>}
     * @memberof CalendarController
     */
    handleItemRemove(item: IData, context: IContext, params: IParams): Promise<boolean>;
    /**
     * @description 跳转第一页
     * @returns {*}  {Promise<IData[]>}
     * @memberof CalendarController
     */
    goToFirstPage(): Promise<IData[]>;
    /**
     * @description 跳转上一页
     * @returns {*}  {Promise<IData[]>}
     * @memberof CalendarController
     */
    goToPreviousPage(): Promise<IData[]>;
    /**
     * @description 跳转下一页
     * @returns {*}  {Promise<IData[]>}
     * @memberof CalendarController
     */
    goToNextPage(): Promise<IData[]>;
    /**
     * @description 跳转最后一页
     * @returns {*}  {Promise<IData[]>}
     * @memberof CalendarController
     */
    goToLastPage(): Promise<IData[]>;
    /**
     * @description 转换各类多语言
     * @protected
     * @memberof CalendarController
     */
    protected convertMultipleLanguages(): void;
}
//# sourceMappingURL=calendar.controller.d.ts.map