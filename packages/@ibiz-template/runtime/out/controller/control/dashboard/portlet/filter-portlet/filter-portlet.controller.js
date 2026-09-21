import { PortletPartController } from '../portlet-part/portlet-part.controller';
import { filterNode2SearchCondEx, SearchCondEx2filterNode, } from '../../../search-bar';
import { filterPortletByConfig, filterPortletByID, generateCacheKy, getFilterSearchConds, } from '../../dashboard.util';
import { handleAllSettled } from '../../../../../utils';
export class FilterPortletController extends PortletPartController {
    constructor() {
        super(...arguments);
        /**
         * 过滤器配置
         *
         * @author tony001
         * @date 2024-07-26 21:07:13
         * @type {IData}
         */
        this.filterConfig = {};
        /**
         * jsonSchema属性组
         *
         * @author tony001
         * @date 2024-07-26 21:07:22
         * @type {IData[]}
         */
        this.jsonSchemaFields = [];
        /**
         * 条件缓存key
         *
         * @author tony001
         * @date 2024-07-28 10:07:24
         * @protected
         * @type {string}
         */
        this.searchCondCacheKey = '';
    }
    /**
     * 初始化
     *
     * @author tony001
     * @date 2024-07-26 21:07:31
     * @protected
     * @return {*}  {Promise<void>}
     */
    async onInit() {
        var _a, _b;
        await super.onInit();
        this.searchCondCacheKey = generateCacheKy(this.context, this.dashboard, this.model.id);
        const customDashboard = this.dashboard.getCustomDashboard();
        this.jsonSchemaFields = await ibiz.util.jsonSchema.getEntitySchemaFields(this.model.appDataEntityId, this.context, this.params);
        if (customDashboard) {
            this.filterConfig =
                ((_a = customDashboard.portletFilter[this.model.id]) === null || _a === void 0 ? void 0 : _a.config) || {};
            const cacheSearchConds = localStorage.getItem(this.searchCondCacheKey);
            this.searchConds = cacheSearchConds
                ? JSON.parse(cacheSearchConds)
                : (_b = customDashboard.portletFilter[this.model.id]) === null || _b === void 0 ? void 0 : _b.searchconds;
            if (this.searchConds) {
                this.state.filterNode = SearchCondEx2filterNode(this.searchConds);
            }
        }
    }
    /**
     * 获取搜索条件
     *
     * @author tony001
     * @date 2024-07-28 09:07:49
     * @return {*}  {(ISearchCondEx | undefined)}
     */
    getSearchConds() {
        return getFilterSearchConds(this.searchConds, this.model.filterDEDQConditions);
    }
    /**
     * 计算受影响的门户部件标识
     *
     * @author tony001
     * @date 2024-08-01 17:08:40
     * @protected
     * @return {*}  {string[]}
     */
    computeEffectivePortletIDs() {
        const items = [];
        Object.values(this.dashboard.portlets).forEach((portlet) => {
            if (portlet.model && portlet.model.portletType !== 'FILTER') {
                items.push(portlet.model);
            }
        });
        const allPortlets = filterPortletByID(this.model.id, this.context, items, this.dashboard.model.dashboardStyle === 'BIREPORTDASHBOARD' ||
            this.dashboard.model.dashboardStyle === 'BIREPORTDASHBOARD2');
        const effectivePortletIDs = filterPortletByConfig(this.filterConfig || {}, allPortlets.map(portlet => {
            return portlet.id;
        }));
        return effectivePortletIDs;
    }
    /**
     * 重置过滤器
     *
     * @author tony001
     * @date 2024-07-26 22:07:10
     * @return {*}  {Promise<boolean>}
     */
    async resetFilter() {
        var _a;
        // 清空缓存
        localStorage.removeItem(this.searchCondCacheKey);
        // 重置searchConds
        const customDashboard = this.dashboard.getCustomDashboard();
        this.searchConds =
            (_a = customDashboard.portletFilter[this.model.id]) === null || _a === void 0 ? void 0 : _a.searchconds;
        if (this.searchConds) {
            this.state.filterNode = SearchCondEx2filterNode(this.searchConds);
        }
        // 刷新数据
        const effectivePortletIDs = this.computeEffectivePortletIDs();
        await handleAllSettled(effectivePortletIDs.map(async (id) => {
            return this.dashboard.portlets[id].refresh();
        }));
        return true;
    }
    /**
     * 搜索
     *
     * @author tony001
     * @date 2024-07-26 22:07:14
     * @return {*}  {Promise<boolean>}
     */
    async search() {
        // 本地缓存条件
        if (!this.state.filterNode) {
            this.state.filterNode = {
                nodeType: 'GROUP',
                logicType: 'AND',
                children: [],
            };
        }
        this.searchConds = filterNode2SearchCondEx(this.state.filterNode);
        localStorage.setItem(this.searchCondCacheKey, JSON.stringify(this.searchConds));
        // 刷新数据
        const effectivePortletIDs = this.computeEffectivePortletIDs();
        await handleAllSettled(effectivePortletIDs.map(async (id) => {
            return this.dashboard.portlets[id].refresh();
        }));
        return true;
    }
    /**
     * 显示影响部件
     *
     * @author tony001
     * @date 2024-07-26 22:07:48
     * @return {*}  {Promise<void>}
     */
    async showEffectiveCtrl() {
        const effectivePortletIDs = this.computeEffectivePortletIDs();
        await handleAllSettled(effectivePortletIDs.map(async (id) => {
            return this.dashboard.portlets[id].hightLight();
        }));
    }
}
