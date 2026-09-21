import { mergeInLeft, recursiveIterate } from '@ibiz-template/core';
import { clone } from 'ramda';
import { isString } from 'lodash-es';
import { convertNavData, ScriptFactory } from '../../../utils';
import { ControlController } from '../../common';
import { SearchBarFilterController } from './search-bar-filter.controller';
import { SearchBarService } from './search-bar.service';
import { getEntitySchema } from '../../utils';
import { calcFilterModelBySchema } from './entity-schema';
import { SearchBarFilterItemsController } from './search-bar-filter-items.controller';
import { calcSearchConds, calcSearchCondExs, getOriginFilterNodes, SearchCondEx2filterNode, } from './interface-util';
import { ItemsValueOPs, isSimpleItems } from './util';
import { SearchBarFilterSimpleItemsController } from './search-bar-filter-simple-items.controller';
import { findFieldById } from '../../../model';
import { CounterService } from '../../../service';
const ScriptValueRegex = /\$\{[^}]*\}/; // 匹配${xxx}格式字符串
/**
 * 搜索栏控制器
 *
 * @author chitanda
 * @date 2022-07-24 15:07:07
 * @export
 * @class SearchBarController
 * @extends {ControlController}
 */
export class SearchBarController extends ControlController {
    constructor() {
        super(...arguments);
        /**
         * 快速搜索占位符（根据属性计算出来的快速搜索占位符）
         * @return {*}
         * @author: zhujiamin
         * @Date: 2023-08-11 14:13:10
         */
        this.placeHolder = '';
        /**
         * 过滤项控制器集合
         * @author lxm
         * @date 2023-10-13 03:31:26
         * @type {SearchBarFilterController[]}
         */
        this.filterControllers = [];
        /**
         * 当前编辑的分组
         * @return {*}
         * @author: zhujiamin
         * @Date: 2023-12-20 18:06:37
         */
        this.currentEditGroup = null;
        /**
         * 是否为后台分组
         * @return {*}
         * @author: zhujiamin
         * @Date: 2023-12-21 10:17:43
         */
        this.isBackendSearchGroup = this.model.searchBarStyle === 'SEARCHBAR2';
        /**
         * 是否有默认选中
         * @return {*}
         * @author: zhujiamin
         * @Date: 2023-12-21 10:17:43
         */
        this.hasDefaultSelect = false;
        /**
         * 是否启用根据实体的JSON Schema生成过滤项
         * @author lxm
         * @date 2024-01-05 10:10:37
         */
        this.addSchemaFilters = false;
        /**
         * jsonschema参数
         *
         * @author zhanghengfeng
         * @date 2024-07-05 15:07:47
         * @type {IParams}
         */
        this.jsonSchemaParams = {};
        /**
         * schema实体映射map
         *
         * @author zhanghengfeng
         * @date 2024-07-22 16:07:55
         */
        this.schemaEntityMap = new Map();
        /**
         * 是否启用存储
         *
         * @author zhanghengfeng
         * @date 2024-05-29 20:05:47
         * @type {boolean}
         */
        this.enableStorage = false;
    }
    /**
     * 启用自定义过滤项
     * @author lxm
     * @date 2023-12-29 04:15:34
     * @type {boolean}
     */
    get enableFilter() {
        return this.model.enableFilter === true;
    }
    /**
     * 最终使用的searchBarFilters
     * @author lxm
     * @date 2023-12-29 06:55:13
     * @type {ISearchBarFilter[]}
     */
    get searchBarFilters() {
        return this.model.searchBarFilters || [];
    }
    /**
     * 表格控制器
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-22 13:50:16
     */
    get grid() {
        return (this.ctx.getController('grid') ||
            this.ctx.getController('treegrid'));
    }
    /**
     * 移动端-多数据控制器
     *
     * @readonly
     * @type {(IListController | undefined)}
     * @memberof SearchBarController
     */
    get mdctrl() {
        return this.ctx.getController('mdctrl');
    }
    /**
     * @description 快速搜索提示分隔符
     * @readonly
     * @type {string}
     * @memberof SearchBarController
     */
    get searchPhSeparator() {
        if (this.controlParams.searchphseparator) {
            return ibiz.appUtil.resolveI18nText(this.controlParams.searchphseparator);
        }
        return ibiz.config.common.searchPhSeparator;
    }
    /**
     * 设置生成存储key的函数
     *
     * @author zhanghengfeng
     * @date 2024-05-29 16:05:35
     * @param {(() => string | undefined)} fn
     */
    setStorageKeyFn(fn) {
        this.storageKeyFn = fn;
    }
    initState() {
        super.initState();
        this.state.query = '';
        this.state.selectedGroupItem = null;
        this.state.searchBarGroups = [];
        this.state.selectedSearchGroupItem = null;
        this.state.advancedQuickSearch = false;
        this.state.quickSearchItems = [];
        this.state.quickSearchFieldNames = [];
        this.state.quickSearchPlaceHolder = '';
        this.state.filterMode = 'default';
        this.state.customCond = '';
        this.resetFilter();
        this.state.visible = !!(this.model.enableQuickSearch ||
            this.model.enableGroup ||
            this.enableFilter);
    }
    async onCreated() {
        this.addSchemaFilters = this.controlParams.enablejsonschema === 'true';
        const jsonSchemaParams = JSON.parse(this.controlParams.jsonschemaparams || '{}');
        this.jsonSchemaParams = convertNavData(jsonSchemaParams, this.params, this.context);
        this.enableStorage = this.controlParams.storage === 'true';
        await this.initByEntitySchema();
        await super.onCreated();
        await this.initCounter();
        if (this.model.appDataEntityId) {
            const appDataEntity = await ibiz.hub.getAppDataEntity(this.model.appDataEntityId, this.context.srfappid);
            if (appDataEntity) {
                this.appDataEntity = appDataEntity;
                this.calcQuickSearchPlaceholder();
                this.initAdvancedQuickSearch();
            }
        }
        if (this.isBackendSearchGroup && this.view.model.codeName) {
            this.service = new SearchBarService(this.model, this.view.model.codeName.toLowerCase());
            await this.service.init(this.context);
        }
        await this.initSearchBarFilters();
        await this.initSearBarGroups(true);
    }
    /**
     * 初始化schema实体映射map
     *
     * @author zhanghengfeng
     * @date 2024-07-22 16:07:14
     * @param {IData} json
     * @return {*}
     */
    async initSchemaEntityMap(json) {
        if (!json.properties) {
            return;
        }
        const { properties } = json;
        if (!(Object.keys(properties).length > 0)) {
            return;
        }
        const map = new Map();
        Object.keys(properties).forEach((key) => {
            var _a, _b;
            map.set(key, (_b = (_a = properties[key]) === null || _a === void 0 ? void 0 : _a.$ref) === null || _b === void 0 ? void 0 : _b.split('.')[0]);
        });
        this.schemaEntityMap = map;
    }
    /**
     * 根据实体jsonschema初始化
     * @author lxm
     * @date 2023-12-29 04:21:31
     * @return {*}  {Promise<void>}
     */
    async initByEntitySchema() {
        var _a;
        if (!this.addSchemaFilters) {
            return;
        }
        const tempParams = clone(this.jsonSchemaParams);
        Object.assign(tempParams, this.params);
        const json = await getEntitySchema(this.model.appDataEntityId, this.context, tempParams);
        if (!json) {
            return;
        }
        await this.initSchemaEntityMap(json);
        const addSearchBarFilters = await calcFilterModelBySchema(json, this.model.appDataEntityId, this.model.appId);
        const mergeFilters = [];
        (_a = this.model.searchBarFilters) === null || _a === void 0 ? void 0 : _a.forEach(filter => {
            const findindex = addSearchBarFilters.findIndex(item => {
                var _a;
                return item.appDEFieldId === filter.appDEFieldId &&
                    (((_a = filter.defsearchMode) === null || _a === void 0 ? void 0 : _a.valueOP)
                        ? item.defsearchMode.valueOP === filter.defsearchMode.valueOP
                        : true);
            });
            if (findindex === -1) {
                mergeFilters.push(filter);
            }
        });
        // 如果有根据json计算出的过滤项，则要重置相关state参数
        if (addSearchBarFilters.length > 0) {
            // 修改模型之前拷贝一份，避免污染原始数据
            this.model = clone(this.model);
            this.model.searchBarFilters = mergeFilters.concat(...addSearchBarFilters);
            this.model.enableFilter = true;
        }
    }
    /**
     * 计算快速搜索的占位
     * @author lxm
     * @date 2023-10-16 03:49:47
     * @protected
     * @return {*}  {void}
     */
    calcQuickSearchPlaceholder() {
        if (!this.appDataEntity) {
            return;
        }
        const searchFields = this.appDataEntity.appDEFields.filter(field => {
            return field.enableQuickSearch;
        });
        if (searchFields.length) {
            const placeHolders = [];
            searchFields.forEach(searchField => {
                if (searchField.lnlanguageRes && searchField.lnlanguageRes.lanResTag) {
                    placeHolders.push(ibiz.i18n.t(searchField.lnlanguageRes.lanResTag, searchField.logicName));
                }
                else if (searchField.logicName) {
                    placeHolders.push(searchField.logicName);
                }
            });
            if (placeHolders.length > 0) {
                this.placeHolder = placeHolders.join(this.searchPhSeparator);
                this.state.quickSearchPlaceHolder = this.placeHolder;
            }
        }
    }
    /**
     * @description 处理快速搜索值输入
     * @param {string} val
     * @memberof SearchBarController
     */
    handleInput(val) {
        this.state.query = val;
    }
    /**
     * @description 搜索
     * @memberof SearchBarController
     */
    async onSearch() {
        // 触发onBeforeSearch事件，基于eventCtx.allowSearch进行拦截
        const eventCtx = {};
        await this.evt.emit('onBeforeSearch', {
            data: [this.getFilterParams()],
            args: { eventCtx },
        });
        if (eventCtx.allowSearch === false) {
            return;
        }
        // 触发onSearch事件
        this.evt.emit('onSearch', undefined);
    }
    /**
     * @description 查找过滤项控制器
     * @param {(string | null)} fieldName
     * @param {(string | null)} valueOP
     * @returns {*}  {(SearchBarFilterController | undefined)}
     * @memberof SearchBarController
     */
    findFilterController(fieldName, valueOP) {
        return this.filterControllers.find(item => {
            if (item.fieldName === fieldName) {
                // 有配属性搜索模式的匹配才是，没配的都是指向没配的哪个过滤项
                return item.valueOP ? item.valueOP === valueOP : true;
            }
            return false;
        });
    }
    /**
     * @description 获取搜索栏当前的过滤条件参数
     * @returns {*}  {IParams}
     * @memberof SearchBarController
     */
    getFilterParams() {
        var _a, _b, _c;
        const params = {};
        // 快速搜索
        if (this.state.query) {
            params.query = this.state.query;
            // 快速搜索高级
            if (this.state.advancedQuickSearch &&
                this.state.quickSearchFieldNames.length) {
                params.queryconds = this.state.quickSearchFieldNames.map(name => `n_${name}_like`);
            }
        }
        // 快速分组
        if (((_a = this.state.selectedGroupItem) === null || _a === void 0 ? void 0 : _a.data) &&
            typeof this.state.selectedGroupItem.data === 'string' &&
            !this.isBackendSearchGroup) {
            let str = this.state.selectedGroupItem.data;
            try {
                const data = JSON.parse(str);
                if ((_b = data.theme_model) === null || _b === void 0 ? void 0 : _b.searchconds)
                    str = JSON.stringify({ searchconds: (_c = data.theme_model) === null || _c === void 0 ? void 0 : _c.searchconds });
            }
            catch (error) {
                ibiz.log.error(error);
            }
            finally {
                const navParams = ScriptFactory.execSingleLine(str);
                const addParams = convertNavData(navParams, this.params, this.context);
                Object.assign(params, addParams);
            }
        }
        // 搜索过滤器
        const filters = this.calcFilters();
        if (filters) {
            params.searchconds = filters;
        }
        return params;
    }
    /**
     * @description 重置
     * @memberof SearchBarController
     */
    resetFilter() {
        this.state.filterNodes = getOriginFilterNodes();
        this.evt.emit('onReset', undefined);
        this.onSearch();
    }
    /**
     * 初始化过滤项控制器
     * @author lxm
     * @date 2023-10-13 03:33:17
     * @protected
     * @return {*}  {Promise<void>}
     */
    async initSearchBarFilters() {
        var _a;
        if ((_a = this.searchBarFilters) === null || _a === void 0 ? void 0 : _a.length) {
            const itemsMap = new Map();
            this.searchBarFilters.forEach(item => {
                var _a;
                // 整理exists或者NOTEXISTS的模型
                if (((_a = item.defsearchMode) === null || _a === void 0 ? void 0 : _a.valueOP) &&
                    ItemsValueOPs.includes(item.defsearchMode.valueOP)) {
                    if (isSimpleItems(item)) {
                        this.filterControllers.push(new SearchBarFilterSimpleItemsController(item, this.appDataEntity, this.context, this.params));
                        return;
                    }
                    const key = `${item.appDEFieldId}_${item.defsearchMode.valueOP}`;
                    if (!itemsMap.has(key)) {
                        itemsMap.set(key, []);
                    }
                    itemsMap.get(key).push(item);
                    return;
                }
                // 常规的属性过滤项
                const filterController = new SearchBarFilterController(item, this.appDataEntity, this.context, this.params);
                this.filterControllers.push(filterController);
            });
            // 初始化SearchBarFilterItemsController
            if (itemsMap.size > 0) {
                itemsMap.forEach(items => {
                    const filterController = new SearchBarFilterItemsController(items, this.appDataEntity, this.context, this.params);
                    this.filterControllers.push(filterController);
                });
            }
            await Promise.all(this.filterControllers.map(controller => controller.init()));
        }
    }
    /**
     * 附加自定义条件
     *
     * @author zhanghengfeng
     * @date 2024-07-19 10:07:34
     * @param {IFilterNode[]} nodes
     * @return {*}  {void}
     */
    attachCustomCond(nodes) {
        if (!this.state.customCond) {
            return;
        }
        if (!nodes[0]) {
            nodes[0] = {
                nodeType: 'GROUP',
                logicType: 'AND',
                children: [],
            };
        }
        const group = nodes[0];
        if (!Array.isArray(group.children)) {
            group.children = [];
        }
        const item = group.children.find(child => child.nodeType === 'CUSTOM' && child.customType === 'PQL');
        if (item) {
            item.customCond = this.state.customCond;
        }
        else {
            group.children.push({
                nodeType: 'CUSTOM',
                customType: 'PQL',
                customCond: this.state.customCond,
            });
        }
    }
    /**
     * 计算过滤项参数
     * @author lxm
     * @date 2023-10-13 05:53:35
     * @return {*}  {IData}
     */
    calcFilters() {
        if (!this.enableFilter) {
            return;
        }
        const nodes = clone(this.state.filterNodes);
        this.attachCustomCond(nodes);
        const searchconds = calcSearchConds(nodes, {
            after: (node, cond) => {
                if (node.nodeType === 'FIELD' && isString(node.value)) {
                    if (ScriptValueRegex.test(node.value)) {
                        cond.value = ScriptFactory.execSingleLine(`\`${node.value}\``, Object.assign({}, this.getEventArgs()));
                    }
                }
            },
        });
        if (!searchconds) {
            const customNodes = [
                {
                    nodeType: 'GROUP',
                    logicType: 'AND',
                    children: [],
                },
            ];
            this.attachCustomCond(customNodes);
            return calcSearchConds(customNodes);
        }
        return searchconds;
    }
    /**
     * 初始化搜索栏分组项(获取后台分组清单并合并模型)
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-19 14:43:46
     */
    async initSearBarGroups(firstInit = false) {
        var _a;
        this.state.searchBarGroups = [];
        if (this.isBackendSearchGroup) {
            if (this.model.searchBarGroups && this.model.searchBarGroups.length > 0) {
                this.state.searchBarGroups = this.model.searchBarGroups.map((item, index) => {
                    const tempGroup = {
                        name: item.id,
                        caption: item.caption,
                        saved: false,
                        show: true,
                        searchGroupData: {},
                        order: (index + 1) * 100,
                        defaultSelect: false,
                        noEdit: true,
                        counterId: item.counterId,
                        counterMode: item.counterMode,
                    };
                    if (item.data) {
                        try {
                            // 解析data属性到对应位置
                            const tempData = JSON.parse(item.data);
                            if (tempData.theme_model) {
                                if (tempData.theme_model.sort) {
                                    tempGroup.searchGroupData.sort = tempData.theme_model.sort;
                                }
                                if (tempData.theme_model.columnstates) {
                                    tempGroup.searchGroupData.columnstates =
                                        tempData.theme_model.columnstates;
                                }
                                if (tempData.theme_model.searchconds) {
                                    tempGroup.searchGroupData.searchconds =
                                        tempData.theme_model.searchconds;
                                }
                            }
                            if (tempData.valid_flag) {
                                tempGroup.show = tempData.valid_flag === '1';
                            }
                        }
                        catch (error) {
                            ibiz.log.error(ibiz.i18n.t('runtime.controller.control.searchBar.JSONFormat', { data: item.data }), error);
                        }
                    }
                    if (item.defaultGroup) {
                        tempGroup.defaultSelect = true;
                    }
                    return tempGroup;
                });
            }
            // 请求并合并searchBarGroups ，这里只能拿到清单
            const res = await this.service.fetch();
            if (res.ok && res.data) {
                // SYSTEM排在前面，PERSONAL排在后面,然后再按order排序
                const result = res.data.sort((a, b) => {
                    if (a.owner_type === b.owner_type) {
                        if (a.order !== undefined && b.order !== undefined) {
                            return a.order - b.order;
                        }
                        if (a.order !== undefined) {
                            return -1;
                        }
                        if (b.order !== undefined) {
                            return 1;
                        }
                        return 0;
                    }
                    return a.owner_type === 'SYSTEM' ? -1 : 1;
                });
                result.forEach((group) => {
                    // 已经存在的覆盖，否则新增
                    const existGroup = this.state.searchBarGroups.find(item => item.name === group.name);
                    if (existGroup) {
                        mergeInLeft(existGroup, group);
                        if (group.owner_type === 'PERSONAL') {
                            existGroup.saved = true;
                        }
                    }
                    else {
                        // 找出最大的order项的下标index，然后+2新增（第n项order为(n+1)*100）
                        const tempMaxOrderIndex = this.state.searchBarGroups.reduce((maxIndex, item, currentIndex) => item.order > this.state.searchBarGroups[maxIndex].order
                            ? currentIndex
                            : maxIndex, 0);
                        this.state.searchBarGroups.push(Object.assign({ saved: true, show: true, searchGroupData: {}, order: (tempMaxOrderIndex + 2) * 100 }, group));
                    }
                });
            }
            // 按照 order 属性从小到大排序
            this.state.searchBarGroups.sort((a, b) => a.order - b.order);
            // 更新 order 属性的值
            this.state.searchBarGroups.forEach((item, index) => {
                item.order = (index + 1) * 100;
            });
            // 设置是否有默认选中
            if (firstInit &&
                this.state.searchBarGroups &&
                this.state.searchBarGroups.length > 0) {
                if (this.enableStorage) {
                    const key = (_a = this.storageKeyFn) === null || _a === void 0 ? void 0 : _a.call(this);
                    if (key) {
                        const name = localStorage.getItem(key);
                        if (name) {
                            const selectedGroup = this.state.searchBarGroups.find(group => {
                                return group.name === name;
                            });
                            if (selectedGroup) {
                                this.hasDefaultSelect = true;
                                return;
                            }
                        }
                    }
                }
                const defaultSelectedGroup = this.state.searchBarGroups.find(group => {
                    return group.defaultSelect;
                });
                if (defaultSelectedGroup) {
                    this.hasDefaultSelect = true;
                }
            }
        }
    }
    /**
     * @description 设置默认选中
     * @returns {*}  {void}
     * @memberof SearchBarController
     */
    setDefaultSelect() {
        var _a;
        if (this.state.searchBarGroups && this.state.searchBarGroups.length > 0) {
            if (this.enableStorage) {
                const key = (_a = this.storageKeyFn) === null || _a === void 0 ? void 0 : _a.call(this);
                if (key) {
                    const name = localStorage.getItem(key);
                    if (name) {
                        const selectedGroup = this.state.searchBarGroups.find(group => {
                            return group.name === name;
                        });
                        if (selectedGroup) {
                            this.handleGroupClick(selectedGroup);
                            return;
                        }
                    }
                }
            }
            const defaultSelectedGroup = this.state.searchBarGroups.find(group => {
                return group.defaultSelect;
            });
            if (defaultSelectedGroup) {
                this.handleGroupClick(defaultSelectedGroup);
            }
        }
    }
    /**
     * @description 处理后台分组保存
     * @returns {*}  {Promise<void>}
     * @memberof SearchBarController
     */
    async handleSave() {
        if (this.grid && this.state.selectedSearchGroupItem) {
            const nodes = clone(this.state.filterNodes);
            this.attachCustomCond(nodes);
            let filters = calcSearchCondExs(nodes);
            if (!filters) {
                const customNodes = [
                    {
                        nodeType: 'GROUP',
                        logicType: 'AND',
                        children: [],
                    },
                ];
                this.attachCustomCond(customNodes);
                filters = calcSearchCondExs(customNodes);
            }
            const tempColumnState = this.grid.state.columnStates.map((item) => {
                const state = clone(item);
                delete state.columnWidth;
                return state;
            });
            const saveParams = {
                searchconds: filters,
                sort: this.grid.state.sortQuery,
                columnstates: tempColumnState,
            };
            // 根据是否保存过决定是更新还是新建
            if (this.state.selectedSearchGroupItem.saved) {
                await this.service.update(this.state.selectedSearchGroupItem.id, {
                    searchGroupData: saveParams,
                    show: this.state.selectedSearchGroupItem.show,
                    order: this.state.selectedSearchGroupItem.order,
                });
                ibiz.message.success(ibiz.i18n.t('runtime.controller.control.form.savedSuccessfully', {
                    srfmajortext: '',
                }));
            }
            else {
                const res = await this.service.createWithParams(this.state.selectedSearchGroupItem, saveParams);
                if (res.ok) {
                    const savedGroup = this.state.searchBarGroups.find(group => group.name === res.data.name);
                    if (savedGroup) {
                        mergeInLeft(savedGroup, res.data);
                        savedGroup.saved = true;
                    }
                    ibiz.message.success(ibiz.i18n.t('runtime.controller.control.form.savedSuccessfully', {
                        srfmajortext: '',
                    }));
                }
            }
        }
    }
    /**
     * @description 处理点击后台分组
     * @param {IBackendSearchBarGroup} groupItem
     * @returns {*}  {Promise<void>}
     * @memberof SearchBarController
     */
    async handleGroupClick(groupItem) {
        var _a, _b;
        if (this.enableStorage) {
            const key = (_a = this.storageKeyFn) === null || _a === void 0 ? void 0 : _a.call(this);
            if (key && groupItem.name) {
                localStorage.setItem(key, groupItem.name);
            }
        }
        this.state.selectedSearchGroupItem = groupItem;
        this.evt.emit('onTabChange', { data: [groupItem] });
        if (groupItem.saved || groupItem.ownerType === 'SYSTEM') {
            // 请求获取到搜索分组数据
            const res = await this.service.get(groupItem.id);
            if (res.ok) {
                mergeInLeft(groupItem, res.data);
                groupItem.show = true;
            }
        }
        if (groupItem.searchGroupData &&
            groupItem.searchGroupData.searchconds &&
            groupItem.searchGroupData.searchconds.length > 0) {
            // 根据后台标准的searchconds计算出 前端回显的树形结构FilterNodes
            const filterNodes = groupItem.searchGroupData.searchconds.map(item => SearchCondEx2filterNode(item));
            this.state.customCond = '';
            if (filterNodes && filterNodes[0]) {
                const group = filterNodes[0];
                const { children } = group;
                if (Array.isArray(children)) {
                    const index = children.findIndex(child => child.nodeType === 'CUSTOM' && child.customType === 'PQL');
                    if (index !== -1) {
                        const item = children.splice(index, 1);
                        this.state.customCond =
                            ((_b = item[0]) === null || _b === void 0 ? void 0 : _b.customCond) || '';
                    }
                }
            }
            this.state.filterMode = 'default';
            this.state.filterNodes = filterNodes;
        }
        else {
            this.state.filterNodes = getOriginFilterNodes();
            this.state.customCond = '';
            this.state.filterMode = 'default';
        }
        // 把带有${}的条件禁用，不能修改
        recursiveIterate(this.state.filterNodes[0], (node) => {
            if (node.nodeType === 'FIELD') {
                if (node.field &&
                    node.valueOP &&
                    isString(node.value) &&
                    ScriptValueRegex.test(node.value)) {
                    node.disabled = true;
                }
            }
        });
        if (this.grid && groupItem && groupItem.searchGroupData) {
            this.grid.setGroupParams(groupItem.searchGroupData);
            await this.grid.load({ isInitialLoad: true });
        }
        else if (this.mdctrl && groupItem && groupItem.searchGroupData) {
            this.mdctrl.setGroupParams(groupItem.searchGroupData);
            await this.mdctrl.load({ isInitialLoad: true });
        }
    }
    /**
     * @description 初始化高级搜索
     * @protected
     * @memberof SearchBarController
     */
    initAdvancedQuickSearch() {
        var _a;
        if (this.model.quickSearchMode === 2 &&
            ((_a = this.model.searchBarQuickSearchs) === null || _a === void 0 ? void 0 : _a.length)) {
            this.state.advancedQuickSearch = true;
            this.state.quickSearchItems = [];
            this.state.quickSearchFieldNames = [];
            this.model.searchBarQuickSearchs.forEach(item => {
                const filed = findFieldById(this.appDataEntity, item.appDEFieldId);
                const fieldName = filed.codeName.toLowerCase();
                this.state.quickSearchItems.push({
                    fieldName,
                    label: filed.logicName,
                });
                this.state.quickSearchFieldNames.push(fieldName);
            });
            this.calcQuickSearchPlaceHolder();
        }
    }
    /**
     * @description 计算快速搜索占位符
     * @memberof SearchBarController
     */
    calcQuickSearchPlaceHolder() {
        if (this.state.advancedQuickSearch) {
            if (this.state.quickSearchFieldNames.length) {
                const labels = [];
                this.state.quickSearchItems.forEach(item => {
                    if (this.state.quickSearchFieldNames.includes(item.fieldName)) {
                        labels.push(item.label);
                    }
                });
                this.state.quickSearchPlaceHolder = labels.join(this.searchPhSeparator);
            }
            else {
                this.state.quickSearchPlaceHolder = this.placeHolder;
            }
        }
    }
    /**
     * @description 切换后台分组项
     * @param {string} tabId
     * @memberof SearchBarController
     */
    selectTab(tabId) {
        var _a, _b;
        if (this.isBackendSearchGroup) {
            const target = (_a = this.state.searchBarGroups) === null || _a === void 0 ? void 0 : _a.find(item => {
                return item.name === tabId;
            });
            if (target) {
                this.handleGroupClick(target);
            }
        }
        else {
            const target = (_b = this.model.searchBarGroups) === null || _b === void 0 ? void 0 : _b.find(item => {
                return item.id === tabId;
            });
            if (target) {
                this.state.selectedGroupItem = target;
                this.evt.emit('onTabChange', { data: [target] });
                this.onSearch();
            }
        }
    }
    /**
     * @description 计算计数器显示状态
     * @param {(IBackendSearchBarGroup | ISearchBarGroup)} item
     * @returns {*}  {boolean}
     * @memberof SearchBarController
     */
    calcCountVisible(item) {
        if (!this.counter) {
            return true;
        }
        const { counterId, counterMode } = item;
        if (counterId) {
            // 显示模式为1，且计数器数据为0时隐藏
            const count = this.counter.getCounter(counterId);
            if (counterMode === 1 && count === 0) {
                return false;
            }
        }
        return true;
    }
    /**
     * @description 初始化计数器
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof SearchBarController
     */
    async initCounter() {
        if (this.state.isCounterDisabled)
            return;
        const { appCounterRefs } = this.model;
        const appCounterRef = appCounterRefs === null || appCounterRefs === void 0 ? void 0 : appCounterRefs[0];
        if (appCounterRef) {
            this.counter = await CounterService.getCounterByRef(appCounterRef, this.context, Object.assign({}, this.params));
        }
    }
    /**
     * @description 监听组件销毁
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof SearchBarController
     */
    async onDestroyed() {
        await super.onDestroyed();
        if (this.counter) {
            this.counter.destroy();
        }
    }
    /**
     * @description 转换各类多语言
     * @protected
     * @memberof SearchBarController
     */
    convertMultipleLanguages() {
        var _a;
        const { searchBarGroups = [], searchBarFilters } = this.model;
        searchBarGroups.forEach(item => {
            var _a;
            if ((_a = item.capLanguageRes) === null || _a === void 0 ? void 0 : _a.lanResTag) {
                item.caption = ibiz.i18n.t(item.capLanguageRes.lanResTag, item.caption);
            }
        });
        searchBarFilters === null || searchBarFilters === void 0 ? void 0 : searchBarFilters.forEach(item => {
            var _a;
            if ((_a = item.capLanguageRes) === null || _a === void 0 ? void 0 : _a.lanResTag) {
                item.caption = ibiz.i18n.t(item.capLanguageRes.lanResTag, item.caption);
            }
        });
        if ((_a = this.model.gmtlanguageRes) === null || _a === void 0 ? void 0 : _a.lanResTag) {
            this.model.groupMoreText = ibiz.i18n.t(this.model.gmtlanguageRes.lanResTag, this.model.groupMoreText);
        }
    }
}
