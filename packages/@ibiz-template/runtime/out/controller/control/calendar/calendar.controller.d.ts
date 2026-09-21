import { ISysCalendar } from '@ibiz/model-core';
import { ICalendarState, ICalendarEvent, ICalendarController, MDCtrlLoadParams, ICalendarItemData, IUIActionResult } from '../../../interface';
import { MDControlController } from '../../common';
import { CalendarService } from './calendar.service';
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
     * 执行行为
     *
     * @param {string} uiActionId
     * @param {ICalendarItemData} calendatData
     * @param {MouseEvent} event
     * @param {string} appId
     * @return {*}  {Promise<void>}
     * @memberof CalendarController
     */
    doUIAction(uiActionId: string, calendatData: ICalendarItemData, event: MouseEvent, appId: string): Promise<void>;
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
     * 打开编辑数据视图
     *
     * @param {ICalendarItemData} item
     * @memberof CalendarService
     */
    openData(item: ICalendarItemData): Promise<IUIActionResult>;
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
}
//# sourceMappingURL=calendar.controller.d.ts.map