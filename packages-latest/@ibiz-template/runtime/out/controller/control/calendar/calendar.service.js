import { RuntimeError } from '@ibiz-template/core';
import { clone } from 'ramda';
import { CalendarItemData } from '../../../service';
import { MDControlService } from '../../../service/service/control/md-control.service';
/**
 * 日历部件服务
 *
 * @author zk
 * @date 2023-08-08 10:08:54
 * @export
 * @class CalendarService
 * @extends {MDControlService<ISysCalendar>}
 */
export class CalendarService extends MDControlService {
    constructor() {
        super(...arguments);
        /**
         * @description 加载更多信息数据
         * @type {{
         *     [modelId: string]: ILoadMoreItem;
         *   }}
         * @memberof CalendarService
         */
        this.loadMore = {};
    }
    /**
     * @description 删除单条数据
     * @param {string} appDataEntityId 实体标识
     * @param {IContext} context 上下文
     * @param {IParams} [params={}] 视图参数
     * @param {string} [removeAppDEActionId='remove'] 删除实体行为标识
     * @returns {*}  {Promise<IHttpResponse>}
     * @memberof CalendarService
     */
    async removeItem(appDataEntityId, context, params = {}, removeAppDEActionId = 'remove') {
        const res = await this.app.deService.exec(appDataEntityId, removeAppDEActionId, context, undefined, params);
        return res;
    }
    /**
     * 执行查询多条数据的方法
     *
     * @author zk
     * @date 2023-08-08 10:08:47
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  Promise<ICalendarItemData[]>
     * @memberof CalendarService
     */
    async search(context, params, opts) {
        const { sysCalendarItems } = this.model;
        if (!sysCalendarItems)
            return [];
        const promises = sysCalendarItems.map(async (item) => {
            const fetchAction = item.appDEDataSetId || 'fetchdefault';
            const tempContext = context.clone();
            const tempParams = this.handleRequestParams(item, params, opts);
            return this.exec2(fetchAction, tempContext, tempParams, undefined, item.appDataEntityId);
        });
        const resArray = await Promise.all(promises);
        // 二维数组
        const twoDimensionalArray = resArray.map((res, index) => {
            var _a;
            return this.setCalendarConfigData(res.data, index, Number((_a = res.headers) === null || _a === void 0 ? void 0 : _a['x-total-pages']) || 0, opts === null || opts === void 0 ? void 0 : opts.isLoadMore);
        });
        return twoDimensionalArray.flat();
    }
    /**
     * @description 设置日历项配置
     * @private
     * @param {IData[]} items
     * @param {number} index
     * @param {number} totalPage
     * @param {boolean} [isLoadMore=false]
     * @returns {*}  {ICalendarItemData[]}
     * @memberof CalendarService
     */
    setCalendarConfigData(items, index, totalPage, isLoadMore = false) {
        var _a;
        var _b;
        const { sysCalendarItems } = this.model;
        if (!sysCalendarItems) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.calendar.noFoundModel'));
        }
        const calendarItem = sysCalendarItems[index];
        if (!calendarItem) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.calendar.noFoundModel'));
        }
        const itemType = calendarItem.itemType;
        (_a = (_b = this.loadMore)[itemType]) !== null && _a !== void 0 ? _a : (_b[itemType] = {
            curPage: 0,
            totalPage: 0,
            items: [],
        });
        const moreData = this.loadMore[itemType];
        moreData.totalPage = totalPage;
        const data = items.map(item => {
            return new CalendarItemData(calendarItem, item);
        });
        if (isLoadMore) {
            moreData.curPage += 1;
            moreData.items.push(...data);
        }
        else {
            moreData.items = [...data];
        }
        return [...moreData.items];
    }
    /**
     * 执行方法实体方法（通过实体id和方法名）
     *
     * @author zk
     * @date 2023-08-08 06:08:49
     * @param {string} methodName
     * @param {IContext} context
     * @param {IData} [data={}]
     * @param {IParams} [params={}]
     * @param {string} [appDataEntityId=this.model.appDataEntityId!]
     * @return {*}  {Promise<IHttpResponse>}
     * @memberof CalendarService
     */
    async exec2(methodName, context, data = {}, params = {}, appDataEntityId = this.model.appDataEntityId) {
        const res = await this.app.deService.exec(appDataEntityId, methodName, context, data, params);
        return res;
    }
    /**
     * 获取查询条件参数
     *
     * @private
     * @param {ISysCalendarItem} item
     * @param {IParams} params
     * @return {*}  {IParams[]}
     * @memberof CalendarService
     */
    getSearchConds(item, params) {
        const { srfstartdate, srfenddate } = params;
        return [
            {
                condop: 'OR',
                condtype: 'GROUP',
                searchconds: [
                    {
                        condop: 'AND',
                        condtype: 'GROUP',
                        searchconds: [
                            {
                                condtype: 'DEFIELD',
                                fieldname: item.beginTimeAppDEFieldId,
                                value: srfstartdate,
                                condop: 'GTANDEQ',
                            },
                            {
                                condtype: 'DEFIELD',
                                fieldname: item.beginTimeAppDEFieldId,
                                value: srfenddate,
                                condop: 'LTANDEQ',
                            },
                        ],
                    },
                    {
                        condop: 'AND',
                        condtype: 'GROUP',
                        searchconds: [
                            {
                                condtype: 'DEFIELD',
                                fieldname: item.endTimeAppDEFieldId,
                                value: srfstartdate,
                                condop: 'GTANDEQ',
                            },
                            {
                                condtype: 'DEFIELD',
                                fieldname: item.endTimeAppDEFieldId,
                                value: srfenddate,
                                condop: 'LTANDEQ',
                            },
                        ],
                    },
                    {
                        condop: 'AND',
                        condtype: 'GROUP',
                        searchconds: [
                            {
                                condtype: 'DEFIELD',
                                fieldname: item.beginTimeAppDEFieldId,
                                value: srfstartdate,
                                condop: 'LT',
                            },
                            {
                                condtype: 'DEFIELD',
                                fieldname: item.endTimeAppDEFieldId,
                                value: srfenddate,
                                condop: 'GT',
                            },
                        ],
                    },
                ],
            },
        ];
    }
    /**
     * @description 处理请求参数
     * @private
     * @param {ISysCalendarItem} item
     * @param {IParams} params
     * @param {CalendarFetchOpts} [opts]
     * @returns {*}  {IParams}
     * @memberof CalendarService
     */
    handleRequestParams(item, params, opts) {
        var _a;
        var _b, _c;
        const tempParams = clone(params);
        const { srfstartdate, srfenddate } = tempParams;
        if (srfstartdate && srfenddate) {
            Object.assign(tempParams, {
                searchconds: this.getSearchConds(item, params),
            });
        }
        const { maxSize, itemType, endTimeAppDEFieldId, beginTimeAppDEFieldId } = item;
        delete tempParams.srfstartdate;
        delete tempParams.srfenddate;
        tempParams.size = maxSize || 1000;
        if (opts) {
            const { isLoadMore, sortField } = opts;
            if (isLoadMore) {
                (_a = (_b = this.loadMore)[_c = itemType]) !== null && _a !== void 0 ? _a : (_b[_c] = {
                    curPage: 0,
                    totalPage: 0,
                    items: [],
                });
                tempParams.page = this.loadMore[itemType].curPage;
            }
            tempParams.sort = `${sortField === 'beginTime' ? beginTimeAppDEFieldId === null || beginTimeAppDEFieldId === void 0 ? void 0 : beginTimeAppDEFieldId.toLowerCase() : endTimeAppDEFieldId === null || endTimeAppDEFieldId === void 0 ? void 0 : endTimeAppDEFieldId.toLowerCase()},desc`;
        }
        return tempParams;
    }
}
