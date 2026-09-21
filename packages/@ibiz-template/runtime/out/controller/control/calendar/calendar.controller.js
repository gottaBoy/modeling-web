import dayjs from 'dayjs';
import { RuntimeError, RuntimeModelError } from '@ibiz-template/core';
import { MDControlController } from '../../common';
import { CalendarService } from './calendar.service';
import { calcDeCodeNameById, getViewLogics } from '../../../model';
import { ContextMenuController } from '../context-menu';
import { UIActionUtil } from '../../../ui-action';
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
export class CalendarController extends MDControlController {
    constructor() {
        super(...arguments);
        /**
         * 上下文菜单控制器
         * @author lxm
         * @date 2023-08-21 10:56:24
         * @type {{ [p: string]: ContextMenuController }}
         */
        this.contextMenus = {};
    }
    /**
     * 初始化状态
     *
     * @author zk
     * @date 2023-08-09 11:08:05
     * @protected
     * @memberof CalendarController
     */
    initState() {
        var _a, _b;
        super.initState();
        this.state.selectedDate = new Date();
        this.state.size = 1000;
        this.state.legends = [];
        this.state.groups = [];
        this.state.calendarTitle = this.model.logicName || '';
        this.state.showDetail =
            ((_b = (_a = this.model.controlParam) === null || _a === void 0 ? void 0 : _a.ctrlParams) === null || _b === void 0 ? void 0 : _b.SHOWDETAIL) || false;
    }
    /**
     * 生命周期-创建完成
     *
     * @author zk
     * @date 2023-08-09 11:08:13
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof CalendarController
     */
    async onCreated() {
        var _a;
        await super.onCreated();
        this.service = new CalendarService(this.model);
        await this.service.init(this.context);
        this.initViewScheduler();
        this.initCalendarLegends();
        (_a = this.model.sysCalendarItems) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
            var _a, _b;
            if ((_b = (_a = item.decontextMenu) === null || _a === void 0 ? void 0 : _a.detoolbarItems) === null || _b === void 0 ? void 0 : _b.length) {
                this.contextMenus[item.decontextMenu.id] = new ContextMenuController(item.decontextMenu, this.context, this.params, this.ctx);
            }
        });
        // 上下文菜单控制器初始化
        await Promise.all(Object.values(this.contextMenus).map(menu => menu.created()));
    }
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
    async doUIAction(uiActionId, calendatData, event, appId) {
        const eventArgs = this.getEventArgs();
        const data = calendatData.deData;
        const { sysCalendarItems } = this.model;
        const targetCalendarItem = sysCalendarItems === null || sysCalendarItems === void 0 ? void 0 : sysCalendarItems.find((item) => {
            return item.id === calendatData.itemType;
        });
        if (targetCalendarItem &&
            targetCalendarItem.textAppDEFieldId &&
            !data.srfmajortext) {
            data.srfmajortext = data[targetCalendarItem.textAppDEFieldId];
        }
        const result = await UIActionUtil.exec(uiActionId, Object.assign(Object.assign({}, eventArgs), { data: [data], context: this.context.clone(), params: this.params, event }), appId);
        if (result.closeView) {
            this.view.closeView();
        }
        else if (result.refresh) {
            // 整个日历数据刷新
            this.refresh();
        }
    }
    /**
     * 初始化日历图例
     *
     * @protected
     * @memberof CalendarController
     */
    initCalendarLegends() {
        const { sysCalendarItems } = this.model;
        if (!sysCalendarItems) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.calendar.noFoundModel'));
        }
        sysCalendarItems.forEach((calendarItem) => {
            const { id, name, bkcolor, color } = calendarItem;
            this.state.legends.push({
                id,
                name,
                bkcolor,
                color,
            });
        });
    }
    /**
     * 初始化视图触发器
     *
     * @protected
     * @memberof CalendarService
     */
    initViewScheduler() {
        const viewLogics = getViewLogics(this.model);
        if (viewLogics.length !== 0) {
            this.viewScheduler = ibiz.scheduler.createViewScheduler(viewLogics);
            this.viewScheduler.defaultParamsCb = () => {
                return this.getEventArgs();
            };
            if (this.viewScheduler.hasViewEventTrigger) {
                // 监听视图事件触发视图事件触发器
                this.evt.onAll((_eventName, event) => {
                    this.viewScheduler.triggerViewEvent(event);
                });
            }
        }
    }
    /**
     * 销毁
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof LightCalendarController
     */
    async onDestroyed() {
        await super.onDestroyed();
        if (this.viewScheduler) {
            this.viewScheduler.destroy();
        }
    }
    /**
     * 设置激活数据
     *
     * @param {ICalendarItemData} item
     * @return {*}  {Promise<void>}
     * @memberof CalendarService
     */
    async setActive(item) {
        this._evt.emit('onActive', {
            data: item ? [item] : [],
        });
        if (!item) {
            return;
        }
        await this.openData(item);
    }
    /**
     * 打开编辑数据视图
     *
     * @param {ICalendarItemData} item
     * @memberof CalendarService
     */
    async openData(item) {
        var _a, _b, _c;
        // 添加选中数据的主键
        const context = this.context.clone();
        const deName = ((_b = (_a = item.deData) === null || _a === void 0 ? void 0 : _a.srfdecodename) === null || _b === void 0 ? void 0 : _b.toLowerCase()) ||
            calcDeCodeNameById(this.model.appDataEntityId);
        context[deName.toLowerCase()] = item.deData.srfkey;
        const result = await ((_c = this.viewScheduler) === null || _c === void 0 ? void 0 : _c.triggerCustom(`${item.itemType.toLowerCase()}_opendata`, {
            context,
            params: this.params,
            data: [item.deData],
            event: undefined,
            view: this.view,
            ctrl: this,
        }));
        if (result === -1) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.control.calendar.missingViewLogic', {
                itemType: item.itemType.toLowerCase(),
            }));
        }
        else {
            return {
                cancel: result ? result.ok : true,
            };
        }
    }
    /**
     * 计算表格展示模式
     * @author fzh
     * @date 2024-05-29 19:18:42
     * @return {*}  {void}
     */
    calcShowMode(items) {
        this.state.hideNoDataImage = false;
        // SHOWMODE = 'DEFAULT'|'ONLYDATA'|'MIXIN'
        // DEFAULT  默认逻辑
        const showmode = this.controlParams.showmode || 'DEFAULT';
        // ONLYDATA 无论有无数据 仅仅显示数据区域，表格头和分页栏都不要
        if (showmode === 'ONLYDATA') {
            if (items.length === 0) {
                this.state.hideNoDataImage = true;
            }
        }
        // MIXIN 无数据时，仅仅显示数据区域，表格头和分页栏都不要；有数据时，展示还是和默认一样
        if (showmode === 'MIXIN') {
            if (items.length === 0) {
                this.state.hideNoDataImage = true;
            }
        }
    }
    /**
     * 日历加载
     *
     * @author zk
     * @date 2023-08-08 01:08:24
     * @param {MDCtrlLoadParams} [args={}]
     * @return {*}  {Promise<IData[][]>}
     * @memberof CalendarController
     */
    async load(args = {}) {
        if (this.state.isSimple) {
            this.state.isLoaded = true;
            return [];
        }
        const isInitialLoad = args.isInitialLoad === true;
        // *查询参数处理
        const { context } = this.handlerAbilityParams(args);
        const params = await this.getFetchParams(args === null || args === void 0 ? void 0 : args.viewParam);
        const { calendarStyle } = this.model;
        if (calendarStyle === 'USER') {
            const { srfstartdate } = params;
            this.state.selectedDate = new Date(srfstartdate);
        }
        // *发起请求
        await this.startLoading();
        let items;
        try {
            items = await this.service.search(context, params);
        }
        finally {
            await this.endLoading();
        }
        this.state.items = items;
        await this.afterLoad(args, items);
        this.state.isLoaded = true;
        await this.evt.emit('onLoadSuccess', {
            isInitialLoad,
        });
        return items;
    }
    /**
     * 部件加载后处理
     *
     * @param {MDCtrlLoadParams} args
     * @param {IData[]} items
     * @return {*}  {Promise<IData[]>}
     * @memberof CalendarController
     */
    async afterLoad(args, items) {
        await super.afterLoad(args, items);
        this.sortItems(this.state.items);
        this.calcShowMode(this.state.items);
        await this.handleDataGroup();
        return items;
    }
    /**
     * 处理数据分组
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof CalendarController
     */
    async handleDataGroup() {
        const { enableGroup, groupMode, groupAppDEFieldId, groupCodeListId } = this.model;
        if (enableGroup && groupMode && groupAppDEFieldId) {
            const groupMap = new Map();
            let codeList = [];
            if (groupMode === 'CODELIST' && groupCodeListId) {
                const app = ibiz.hub.getApp(this.context.srfappid);
                codeList = await app.codeList.get(groupCodeListId, this.context, this.params);
                codeList.forEach(c => {
                    groupMap.set(c.value, []);
                });
            }
            this.state.items.forEach(item => {
                const value = item.deData[groupAppDEFieldId === null || groupAppDEFieldId === void 0 ? void 0 : groupAppDEFieldId.toLowerCase()];
                if (value) {
                    if (groupMode !== 'CODELIST' && !groupMap.has(value)) {
                        groupMap.set(value, []);
                    }
                    if (groupMap.has(value)) {
                        groupMap.get(value).push(item);
                    }
                }
            });
            groupMap.forEach((value, key) => {
                var _a;
                this.state.groups.push({
                    key: `${key}`,
                    caption: ((_a = codeList.find(c => c.value === key)) === null || _a === void 0 ? void 0 : _a.text) || `${key}`,
                    children: value,
                });
            });
        }
    }
    /**
     * 日历项排序
     * - 默认开始时间倒序
     * @protected
     * @param {ICalendarItemData[]} items 日历项集合
     * @param {('beginTime' | 'endTime')} [sortField='beginTime']
     * @memberof CalendarController
     */
    sortItems(items, sortField = 'beginTime') {
        items.sort((a, b) => {
            let result = 0;
            const x = a[sortField];
            const y = b[sortField];
            if (dayjs(x).isAfter(y)) {
                result = -1;
            }
            else if (dayjs(x).isBefore(y)) {
                result = 1;
            }
            return result;
        });
    }
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
    getCurSelectDate(param) {
        const { selectedDate } = this.state;
        const { calendarStyle } = this.model;
        let { srfstartdate, srfenddate } = param;
        if (!srfstartdate || !srfenddate) {
            switch (calendarStyle) {
                case 'DAY':
                    srfstartdate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
                    srfenddate = new Date(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1).getTime() - 1);
                    break;
                case 'WEEK':
                case 'USER':
                    // 获取当前日期是星期几（0表示星期日，1表示星期一，以此类推）
                    const currentDayOfWeek = selectedDate.getDay();
                    // 获取当前日期与当前周的第一天的偏移量（负数表示前面的日期，正数表示后面的日期）
                    const offset = currentDayOfWeek > 0 ? -currentDayOfWeek + 1 : -6;
                    // 获取当前周的起始时间
                    srfstartdate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + offset);
                    // 获取当前周的终止时间
                    srfenddate = new Date(new Date(srfstartdate.getFullYear(), srfstartdate.getMonth(), srfstartdate.getDate() + 7).getTime() - 1);
                    break;
                case 'MONTH':
                    // 获取当前月份的第一天
                    srfstartdate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
                    // 获取下个月的第一天，然后减去一天
                    srfenddate = new Date(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1).getTime() - 1);
                    break;
                default:
                    ibiz.log.warn(`日历${calendarStyle}样式暂未支持`);
                    break;
            }
            return {
                srfstartdate: dayjs(srfstartdate).format('YYYY-MM-DD HH:mm:ss'),
                srfenddate: dayjs(srfenddate).format('YYYY-MM-DD HH:mm:ss'),
            };
        }
        return { srfstartdate, srfenddate };
    }
    /**
     * 获取请求参数
     *
     * @author zk
     * @date 2023-08-09 11:08:35
     * @param {IParams} [extraParams={}]
     * @return {*}  {Promise<IParams>}
     * @memberof CalendarController
     */
    async getFetchParams(extraParams = {}) {
        const { curPage, size, sortQuery, noSort } = this.state;
        const resultParams = Object.assign({}, this.params);
        // 排序条件
        if (!noSort && sortQuery) {
            resultParams.sort = sortQuery;
        }
        // *请求参数处理
        await this._evt.emit('onBeforeLoad', undefined);
        // 合并搜索条件参数，这些参数在onBeforeLoad监听里由外部填入
        Object.assign(resultParams, Object.assign({}, this.state.searchParams));
        // 有size才给page和size。size默认值给0就不传分页和大小
        if (size) {
            resultParams.page = curPage - 1;
            resultParams.size = size;
        }
        // 额外附加参数
        if (extraParams) {
            Object.assign(resultParams, extraParams);
        }
        // 时间轴类型不需要开始结束时间参数
        if (this.model.calendarStyle !== 'TIMELINE') {
            const timeParam = this.getCurSelectDate(resultParams);
            Object.assign(resultParams, timeParam);
        }
        return resultParams;
    }
    /**
     * 行单击事件
     *
     * @author zk
     * @date 2023-08-08 05:08:15
     * @param {ICalendarItemData} data
     * @return {*}  {Promise<void>}
     * @memberof CalendarController
     */
    async onRowClick(_data) {
        const data = this.state.items.find(item => item.id === _data.id);
        if (!data) {
            this.setSelection([]);
            return;
        }
        // 选中相关处理
        const { selectedData } = this.state;
        // 选中里没有则添加，有则删除
        const filterArr = selectedData.filter(item => item.deData.srfkey !== data.deData.srfkey);
        if (filterArr.length === selectedData.length) {
            this.setSelection(this.state.singleSelect ? [data] : selectedData.concat([data]));
        }
        else {
            this.setSelection(filterArr);
        }
        // 设置导航数据
        this.setNavData(data);
        // 默认就走激活事件
        await this.setActive(data);
    }
    /**
     * 双击事件
     *
     * @param {ICalendarItemData} data
     * @return {*}  {Promise<void>}
     * @memberof CalendarController
     */
    async onDbRowClick(_data) {
        const data = this.state.items.find(item => item.id === _data.id);
        if (this.state.mdctrlActiveMode === 2 && data) {
            await this.setActive(data);
        }
    }
    /**
     * 设置选中日期
     *
     * @author zk
     * @date 2023-08-08 11:08:08
     * @param {Date} date
     * @memberof CalendarController
     */
    setSelectDate(date) {
        this.state.selectedDate = date;
    }
}
