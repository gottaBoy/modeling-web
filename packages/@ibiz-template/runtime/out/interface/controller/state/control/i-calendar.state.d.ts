import { IMDControlState } from './i-md-control.state';
/**
 * 日历分组数据
 *
 * @export
 * @interface ICalendarGroup
 */
export interface ICalendarGroup {
    /**
     * 分组标题
     *
     * @type {string}
     * @memberof ICalendarGroup
     */
    caption: string;
    /**
     * 分组标识
     *
     * @type {string}
     * @memberof ICalendarGroup
     */
    key: string;
    /**
     * 日历项数据
     *
     * @type {ICalendarItemData[]}
     * @memberof ICalendarGroup
     */
    children: ICalendarItemData[];
}
/**
 * 日历部件状态
 * @author zk
 * @date 2023-05-22 02:18:43
 * @export
 * @interface ICalendarState
 * @extends {IMDControlState}
 */
export interface ICalendarState extends IMDControlState {
    /**
     * 日历项数据
     *
     * @author lxm
     * @date 2022-08-17 19:08:11
     * @type {IData[]}
     */
    items: ICalendarItemData[];
    /**
     * 日历分组数据
     *
     * @type {ICalendarGroup[]}
     * @memberof ICalendarState
     */
    groups: ICalendarGroup[];
    /**
     * 选中的日期
     *
     * @author zk
     * @date 2023-08-08 07:08:39
     * @type {Date}
     * @memberof ICalendarState
     */
    selectedDate: Date;
    /**
     * 图例
     *
     * @type {IData[]}
     * @memberof ICalendarStateEx
     */
    legends: IData[];
    /**
     * 日历名称
     *
     * @type {string}
     * @memberof ICalendarState
     */
    calendarTitle: string;
    /**
     * 是否弹框显示详情
     *
     * @type {boolean}
     * @memberof ICalendarState
     */
    showDetail: boolean;
}
/**
 * 日历项数据
 *
 * @author zk
 * @date 2023-08-08 01:08:52
 * @export
 * @interface ICalendarItemData
 */
export interface ICalendarItemData {
    /**
     * 背景色
     *
     * @author zk
     * @date 2023-08-08 01:08:17
     * @type {string}
     * @memberof ICalendarItemData
     */
    bkColor: string;
    /**
     * 开始时间
     *
     * @date 2023-08-08 01:08:46
     * @type {string}
     * @memberof ICalendarItemData
     */
    beginTime: string;
    /**
     * 颜色
     *
     * @date 2023-08-08 01:08:46
     * @type {string}
     * @memberof ICalendarItemData
     */
    color: string;
    /**
     * 内容
     *
     * @date 2023-08-08 01:08:46
     * @type {string}
     * @memberof ICalendarItemData
     */
    content: string;
    /**
     * 结束时间
     *
     * @date 2023-08-08 01:08:46
     * @type {string}
     * @memberof ICalendarItemData
     */
    endTime: string;
    /**
     * 图标
     *
     * @date 2023-08-08 01:08:46
     * @type {string}
     * @memberof ICalendarItemData
     */
    icon: string;
    /**
     * id标识
     *
     * @date 2023-08-08 01:08:46
     * @type {string}
     * @memberof ICalendarItemData
     */
    id: string;
    /**
     * 级别
     *
     * @date 2023-08-08 01:08:46
     * @type {string}
     * @memberof ICalendarItemData
     */
    level: string;
    /**
     * 标记2
     *
     * @date 2023-08-08 01:08:46
     * @type {string}
     * @memberof ICalendarItemData
     */
    tag2: string;
    /**
     * 标记1
     *
     * @date 2023-08-08 01:08:46
     * @type {string}
     * @memberof ICalendarItemData
     */
    tag: string;
    /**
     * 文本
     *
     * @date 2023-08-08 01:08:46
     * @type {string}
     * @memberof ICalendarItemData
     */
    text: string;
    /**
     * 提示
     *
     * @date 2023-08-08 01:08:46
     * @type {string}
     * @memberof ICalendarItemData
     */
    tips: string;
    /**
     * 实体数据
     *
     * @author zk
     * @date 2023-08-08 01:08:12
     * @type {IData}
     * @memberof ICalendarItemData
     */
    deData: IData;
    /**
     * 日历项名称
     *
     * @author zk
     * @date 2023-08-08 01:08:12
     * @type {IData}
     * @memberof ICalendarItemData
     */
    itemType: string;
    /**
     * 导航标识
     *
     * @author zk
     * @date 2023-08-08 04:08:25
     * @type {string}
     * @memberof ICalendarItemData
     */
    navId: string;
}
//# sourceMappingURL=i-calendar.state.d.ts.map