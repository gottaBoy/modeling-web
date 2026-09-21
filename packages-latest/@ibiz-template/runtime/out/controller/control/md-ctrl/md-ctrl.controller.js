import { RuntimeError, RuntimeModelError } from '@ibiz-template/core';
import { clone, isNil, isNotNil } from 'ramda';
import { createUUID } from 'qx-util';
import { MDCtrlService } from './md-ctrl.service';
import { MobMDCtrlRowState } from './md-ctrl-row.state';
import { MDControlController } from '../../common';
import { UIActionUtil } from '../../../ui-action';
import { ButtonContainerState, UIActionButtonState } from '../../utils';
import { calcUIActionGroup, getAllUIActionItems } from '../../../model';
import { ScriptFactory } from '../../../utils';
import { PredefinedAttributes } from '../../../constant';
export class MDCtrlController extends MDControlController {
    constructor() {
        super(...arguments);
        /**
         * @description 数据导出列
         * @type {IExportColumn[]}
         * @memberof MDCtrlController
         */
        this.allExportColumns = [];
        /**
         * @description 数据导出代码表
         * @type {Map<string, readonly CodeListItem[]>}
         * @memberof MDCtrlController
         */
        this.allExportCodelistMap = new Map();
    }
    /**
     * @description 启用分组
     * @readonly
     * @type {boolean}
     * @memberof MDCtrlController
     */
    get enableGroup() {
        return this.model.groupMode !== 'NONE';
    }
    /**
     * 允许新建
     *
     * @readonly
     * @type {boolean}
     * @memberof MDCtrlController
     */
    get enableNew() {
        return this.model.enableRowNew === true;
    }
    /**
     * @description 分组时是否显示分组锚点导航
     * @readonly
     * @type {boolean}
     * @memberof MDCtrlController
     */
    get showGroupAnchor() {
        return this.enableGroup && this.controlParams.showgroupanchor === 'true';
    }
    initState() {
        super.initState();
        this.state.rows = [];
        this.state.noSort = this.model.noSort === true;
        this.state.singleSelect = this.model.singleSelect === true;
        // 多数据默认激活值为1
        this.state.mdctrlActiveMode = 1;
        this.state.size = this.model.pagingSize || 20;
        this.initSortDelistItems();
    }
    /**
     * @description 初始化排序配置项集合
     * @protected
     * @memberof MDCtrlController
     */
    initSortDelistItems() {
        var _a;
        const sortDelistItems = [];
        (_a = this.model.delistItems) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
            var _a, _b;
            if (item.enableSort) {
                sortDelistItems.push({
                    value: item.id,
                    label: ibiz.i18n.t(((_a = item === null || item === void 0 ? void 0 : item.capLanguageRes) === null || _a === void 0 ? void 0 : _a.lanResTag) || '', item.caption || ((_b = item === null || item === void 0 ? void 0 : item.capLanguageRes) === null || _b === void 0 ? void 0 : _b.defaultContent)),
                });
            }
        });
        this.state.sortDelistItems = sortDelistItems;
    }
    async onCreated() {
        await super.onCreated();
        this.service = new MDCtrlService(this.model);
        await this.service.init(this.context);
        // 设置默认排序
        this.setSort();
        await this.initExportData();
    }
    /**
     * @description 初始化界面行为组
     * @protected
     * @memberof MDCtrlController
     */
    async initUIActions() {
        const { deuiactionGroup, deuiactionGroup2 } = this.model;
        // 左滑界面行为组
        if (deuiactionGroup) {
            await calcUIActionGroup(this.model.deuiactionGroup, this.context, this.params);
        }
        // 右滑界面行为组
        if (deuiactionGroup2) {
            await calcUIActionGroup(this.model.deuiactionGroup2, this.context, this.params);
        }
    }
    /**
     * 加载更多
     * @author lxm
     * @date 2023-05-22 07:33:59
     * @return {*}  {Promise<void>}
     */
    async loadMore() {
        // 修复加载更多时，数据未加载成功 但是还是会继续加载的问题
        if (this.state.total > this.state.items.length && !this.state.isLoading) {
            await this.load({ isLoadMore: true });
        }
    }
    /**
     * 列表多数据刷新 需重置分页
     *
     * @author zk
     * @date 2023-08-11 05:08:20
     * @return {*}  {Promise<void>}
     * @memberof MDCtrlController
     */
    async refresh() {
        this.doNextActive(() => this.load({ isInitialLoad: true }), {
            key: 'refresh',
        });
    }
    /**
     * 部件加载后处理
     *
     * @param {MDCtrlLoadParams} args
     * @param {ControlVO[]} items
     * @return {*}  {Promise<IData[]>}
     * @memberof MDCtrlController
     */
    async afterLoad(args, items) {
        if (args.isInitialLoad) {
            this.state.rows = [];
        }
        if (items && items.length > 0) {
            const rows = items.map(item => {
                return new MobMDCtrlRowState(item, this);
            });
            this.state.rows.push(...rows);
            // 响应式写法用state里遍历出来的row才是reactive
            await Promise.all(this.state.rows.map(row => this.initActionStates(row)));
        }
        await this.initGroupCodeListItems();
        await this.handleDataGroup();
        return super.afterLoad(args, items);
    }
    /**
     * 设置列表数据
     *
     * @author zk
     * @date 2023-05-26 02:05:46
     * @param {IData[]} items
     * @memberof MDCtrlController
     */
    setData(items) {
        const rows = items.map(item => {
            const row = new MobMDCtrlRowState(item, this);
            return row;
        });
        this.state.rows = rows;
    }
    /**
     * 获取列表数据
     *
     * @author zk
     * @date 2023-05-26 02:05:35
     * @return {*}  {IData[]}
     * @memberof MDCtrlController
     */
    getAllData() {
        return this.state.rows.map(row => row.data);
    }
    /**
     * 界面行为组项点击
     *
     * @author chitanda
     * @date 2023-06-19 18:06:18
     * @param {IUIActionGroupDetail} detail
     * @param {MDCtrlRowState} row
     * @param {MouseEvent} event
     * @return {*}  {Promise<void>}
     */
    async onActionClick(detail, row, event) {
        const actionId = detail.uiactionId;
        await UIActionUtil.execAndResolved(actionId, {
            context: this.context,
            params: this.params,
            data: [row.data],
            view: this.view,
            ctrl: this,
            event,
        }, detail.appId);
    }
    /**
     * 初始化按钮状态
     *
     * @protected
     * @param {MobMDCtrlRowState} row
     * @return {*}  {Promise<void>}
     * @memberof MDCtrlController
     */
    async initActionStates(row) {
        const { deuiactionGroup, deuiactionGroup2 } = this.model;
        if (deuiactionGroup) {
            await this.initUIActionGroup(row, deuiactionGroup);
        }
        if (deuiactionGroup2) {
            await this.initUIActionGroup(row, deuiactionGroup2);
        }
    }
    /**
     * 初始化（左右）行为组权限
     *
     * @protected
     * @param {MobMDCtrlRowState} row
     * @param {IUIActionGroup} group
     * @return {*}  {Promise<void>}
     * @memberof MDCtrlController
     */
    async initUIActionGroup(row, group) {
        var _a;
        if (!((_a = group.uiactionGroupDetails) === null || _a === void 0 ? void 0 : _a.length))
            ibiz.log.debug(ibiz.i18n.t('runtime.controller.control.grid.interfaceBehavior'));
        const containerState = new ButtonContainerState();
        const details = getAllUIActionItems(group.uiactionGroupDetails);
        details.forEach(detail => {
            const actionid = detail.uiactionId;
            if (actionid) {
                const buttonState = new UIActionButtonState(detail.id, this.context.srfappid, actionid, detail);
                containerState.addState(detail.id, buttonState);
            }
        });
        await containerState.update(this.context, row.data.getOrigin());
        row.uaColStates[group.id] = containerState;
    }
    /**
     * 处理数据分组
     *
     * @memberof MDCtrlController
     */
    async handleDataGroup() {
        const { enableGroup, groupMode, groupAppDEFieldId } = this.model;
        if (enableGroup && groupMode) {
            if (!groupAppDEFieldId) {
                throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.control.dataView.propertiesNoConfigured'));
            }
            if (groupMode === 'AUTO') {
                await this.handleAutoGroup();
            }
            else if (groupMode === 'CODELIST') {
                await this.handleCodeListGroup();
            }
        }
    }
    /**
     * 处理自动分组
     *
     * @memberof MDCtrlController
     */
    async handleAutoGroup() {
        const { groupAppDEFieldId, groupCodeListId } = this.model;
        // 自动分组且存在代码表时，使用代码表做一次转换
        let codeList = [];
        if (groupCodeListId) {
            const app = ibiz.hub.getApp(this.context.srfappid);
            codeList = await app.codeList.get(groupCodeListId, this.context, this.params);
        }
        if (groupAppDEFieldId) {
            const { items } = this.state;
            const groupMap = new Map();
            const unclassified = {
                key: createUUID(),
                caption: ibiz.i18n.t('runtime.controller.common.md.unclassified'),
                children: [],
            };
            items.forEach((item) => {
                const groupVal = item[groupAppDEFieldId];
                // 分组无值默认归为未分类
                if (isNil(groupVal)) {
                    unclassified.children.push(new MobMDCtrlRowState(item, this));
                    return;
                }
                if (!groupMap.has(groupVal)) {
                    groupMap.set(groupVal, []);
                }
                groupMap
                    .get(groupVal)
                    .push(new MobMDCtrlRowState(item, this));
            });
            const groups = [];
            groupMap.forEach((value, key) => {
                const codeListItem = codeList.find(x => x.value === key);
                groups.push({
                    caption: (codeListItem === null || codeListItem === void 0 ? void 0 : codeListItem.text) || key,
                    key,
                    children: [...value],
                });
            });
            // 将未分类放到最后
            if (unclassified.children.length)
                groups.push(unclassified);
            this.state.groups = groups;
        }
    }
    /**
     * 加载并初始化分组代码表项集合
     * @author lxm
     * @date 2023-08-29 05:11:39
     * @protected
     * @return {*}  {Promise<void>}
     */
    async initGroupCodeListItems() {
        const { groupCodeListId } = this.model;
        if (!groupCodeListId) {
            return;
        }
        const app = ibiz.hub.getApp(this.context.srfappid);
        this.groupCodeListItems = await app.codeList.get(groupCodeListId, this.context, this.params);
    }
    /**
     * 处理代码表分组
     *
     * @memberof MDCtrlController
     */
    async handleCodeListGroup() {
        const { groupAppDEFieldId, groupCodeListId } = this.model;
        if (!groupCodeListId) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.control.dataView.tableNoConfigured'));
        }
        const { items } = this.state;
        const groupMap = new Map();
        this.groupCodeListItems.forEach(item => {
            groupMap.set(item.value, []);
        });
        items.forEach((item) => {
            const groupVal = item[groupAppDEFieldId];
            const groupArr = groupMap.get(groupVal);
            if (groupArr) {
                groupArr.push(new MobMDCtrlRowState(item, this));
            }
        });
        const groups = [];
        groupMap.forEach((arr, key) => {
            // 标题
            const codeListItem = this.groupCodeListItems.find(item => item.value === key);
            groups.push({
                caption: codeListItem.text,
                key: codeListItem.value,
                children: arr,
            });
        });
        this.state.groups = groups;
    }
    changeCollapse(params = {}) {
        throw new Error('Method not implemented.');
    }
    /**
     * 移动端-设置分组点击
     *
     * @param {ISearchGroupData} data
     * @memberof MDCtrlController
     */
    setGroupParams(data) {
        if (data.sort) {
            this.state.sortQuery = data.sort;
            this.isSetSort = true;
        }
        else {
            this.state.sortQuery = '';
        }
    }
    /**
     * @description 移动端-滚动到顶部
     * @memberof MDCtrlController
     */
    scrollToTop() {
        throw new Error('Method not implemented.');
    }
    /**
     * @description 获取部件默认排序模型
     * @returns {*}  {({
     *     minorSortAppDEFieldId: string | undefined;
     *     minorSortDir: string | undefined;
     *   })}
     * @memberof MDCtrlController
     */
    getSortModel() {
        return {
            minorSortAppDEFieldId: this.model.minorSortAppDEFieldId,
            minorSortDir: this.model.minorSortDir,
        };
    }
    /**
     * 新增按钮点击
     *
     * @memberof MDCtrlController
     */
    onClickNew(event, group) {
        const params = Object.assign({}, this.params);
        if (isNotNil(group)) {
            Object.assign(params, { srfgroup: group });
        }
        UIActionUtil.execAndResolved('new', {
            context: this.context,
            params,
            data: [],
            view: this.view,
            ctrl: this,
            event,
        }, this.view.model.appId);
    }
    /**
     * @description 初始化数据导出对象
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof MDCtrlController
     */
    async initExportData() {
        var _a;
        if (this.model.dedataExportId) {
            this.dataExport = (_a = this.dataEntity.appDEDataExports) === null || _a === void 0 ? void 0 : _a.find(dataExport => {
                return dataExport.id === this.model.dedataExportId;
            });
            if (this.dataExport) {
                this.allExportColumns = await this.findAllExportColumns(this.dataExport);
            }
        }
        if (this.allExportColumns.length) {
            this.allExportColumns.forEach(exportColumn => {
                if (exportColumn.codeListItems) {
                    this.allExportCodelistMap.set(exportColumn.appDEFieldId, exportColumn.codeListItems);
                }
            });
        }
    }
    /**
     * @description 初始化数据导出列
     * @param {IAppDEDataExport} dataExport
     * @returns {*}  {Promise<IExportColumn[]>}
     * @memberof MDCtrlController
     */
    async findAllExportColumns(dataExport) {
        var _a;
        const app = ibiz.hub.getApp(this.context.srfappid);
        // 排除隐藏列
        const exportColumnsPromises = (_a = dataExport.dedataExportItems) === null || _a === void 0 ? void 0 : _a.filter(item => !item.hidden).map(async (item) => {
            const tempExportColumn = Object.assign({}, item);
            if (item.codeListId) {
                // 加载代码表模型
                tempExportColumn.codeList = app.codeList.getCodeList(item.codeListId);
                tempExportColumn.codeListItems = await app.codeList.get(item.codeListId, this.context);
            }
            return tempExportColumn;
        });
        // 使用 Promise.all 等待所有 Promise 解析
        if (exportColumnsPromises) {
            return Promise.all(exportColumnsPromises);
        }
        return [];
    }
    /**
     * @description 获取数据导出模型
     * @returns {*}  {{ header: string[], fields: string[], exportColumns: IData[] }}
     * @memberof MDCtrlController
     */
    getDataExcelModel() {
        const { dedataExportId } = this.model;
        const excelModel = {
            header: [],
            fields: [],
            exportColumns: [],
        };
        if (dedataExportId) {
            if (this.allExportColumns.length) {
                excelModel.fields = this.allExportColumns.map(x => x.appDEFieldId);
                excelModel.header = this.allExportColumns.map(x => x.caption);
                excelModel.exportColumns = this.allExportColumns;
            }
        }
        return excelModel;
    }
    /**
     * @description 加载数据(只加载数据 不做其他操作)
     * @param {MDCtrlLoadParams} args
     * @param {IParams} [fetchArgs={}] 透传给 service.fetch 的额外参数，如 srfexportdataset
     * @returns {*}  {Promise<IData[]>}
     * @memberof MDCtrlController
     */
    async loadData(args, fetchArgs = {}) {
        // *查询参数处理
        const { context } = this.handlerAbilityParams(args);
        const params = await this.getFetchParams(args === null || args === void 0 ? void 0 : args.viewParam);
        let res;
        // *发起请求
        await this.startLoading();
        try {
            res = await this.service.fetch(context, params, fetchArgs);
        }
        finally {
            await this.endLoading();
        }
        return res.data;
    }
    /**
     * @description 获取导出数据
     * @param {IApiExportParams} params
     * @returns {*}  {Promise<IData[]>}
     * @memberof MDCtrlController
     */
    async getExportData(params) {
        var _a;
        const { type } = params;
        let data = [];
        // 未指定类型时，默认导出当前页
        if (!type || type === 'activatedPage') {
            data = this.state.items.map(row => row);
        }
        else if (type === 'maxRowCount' || type === 'customPage') {
            const { size } = this.state;
            const { startPage, endPage } = params;
            const viewParam = type === 'customPage' && startPage && endPage
                ? {
                    page: 0,
                    offset: (startPage - 1) * size,
                    size: (endPage - startPage + 1) * size,
                }
                : {
                    size: ((_a = this.dataExport) === null || _a === void 0 ? void 0 : _a.maxRowCount) ||
                        ibiz.config.common.maxExportRowsDefault,
                    page: 0,
                };
            // 识别用户定义的视图参数导出数据集合
            data = await this.loadData({ viewParam }, {
                srfexportdataset: params.srfexportdataset || this.params.srfexportdataset,
            });
        }
        else if (type === 'selectedRows') {
            data = this.getData();
        }
        if (data.length === 0) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.common.md.exported'));
        }
        return data;
    }
    /**
     * @description 格式化导出数据
     * @param {IData[]} data
     * @param {string[]} fields
     * @returns {*}  {IData[]}
     * @memberof MDCtrlController
     */
    formatExcelData(data, fields) {
        const cloneData = clone(data.map(item => {
            return fields.reduce((obj, key) => {
                obj[key] = item[key];
                return obj;
            }, {});
        }));
        cloneData.forEach(item => {
            Object.keys(item).forEach((key) => {
                var _a;
                let value = item[key];
                if (this.allExportCodelistMap.get(key)) {
                    // fix: 修复多选的代码表项未正常转换
                    const getVal = (val) => {
                        var _a;
                        return (((_a = this.allExportCodelistMap.get(key).find(x => x.value == val)) === null || _a === void 0 ? void 0 : _a.text) || val);
                    };
                    const currentColumn = this.allExportColumns.find(exportColumn => {
                        return exportColumn.appDEFieldId === key;
                    });
                    const codelist = currentColumn === null || currentColumn === void 0 ? void 0 : currentColumn.codeList;
                    if (codelist && codelist.valueSeparator) {
                        const textSeparator = codelist.textSeparator || codelist.valueSeparator || ',';
                        const values = (_a = item[key]) === null || _a === void 0 ? void 0 : _a.split(codelist.valueSeparator);
                        value = values === null || values === void 0 ? void 0 : values.map(v => getVal(v)).join(textSeparator);
                    }
                    else {
                        value = getVal(item[key]);
                    }
                }
                else {
                    value = `${value != null ? value : ''}`;
                }
                item[key] = value;
            });
        });
        return cloneData;
    }
    /**
     * @description 执行后台导出
     * @param {IApiExportParams} params
     * @returns {*}  {Promise<void>}
     * @memberof MDCtrlController
     */
    async excuteBackendExport(params) {
        // 构建导出模型
        let tempDataExport = this.dataExport;
        if (params.srfdataexport) {
            tempDataExport = params.srfdataexport;
        }
        // 准备参数
        const fetchParams = await this.getFetchParams(Object.assign({}, this.params));
        let tempParams = {};
        const { type } = params;
        if (!type || type === 'activatedPage') {
            const { size, curPage } = this.state;
            tempParams = {
                page: curPage - 1,
                size,
            };
        }
        else if (type === 'selectedRows') {
            const selectedData = this.getData();
            if (selectedData.length === 0) {
                throw new RuntimeError(ibiz.i18n.t('runtime.controller.common.md.exported'));
            }
            // 用户通过视图参数srfexportdatakey指定导出选中数据的数据主键属性
            const srfexportdatakey = params.srfexportdatakey || this.params.srfexportdatakey || 'srfkey';
            tempParams = {
                page: 0,
                srfkeys: selectedData.map(data => data[srfexportdatakey]).join(','),
            };
        }
        else if (type === 'maxRowCount' || type === 'customPage') {
            const { size } = this.state;
            const { startPage, endPage } = params;
            tempParams =
                type === 'customPage' && startPage && endPage
                    ? {
                        page: 0,
                        offset: (startPage - 1) * size,
                        size: (endPage - startPage + 1) * size,
                    }
                    : {
                        size: (tempDataExport === null || tempDataExport === void 0 ? void 0 : tempDataExport.maxRowCount) ||
                            ibiz.config.common.maxExportRowsDefault,
                        page: 0,
                    };
        }
        // 自定义导出数据集，优先使用外部传入，避免被上面分支的整体赋值覆盖
        if (params.srfexportdataset) {
            tempParams.srfexportdataset = params.srfexportdataset;
        }
        Object.assign(fetchParams, tempParams);
        // 构建上下文
        const tempContext = clone(this.context);
        if (params.srfdatatype) {
            Object.assign(tempContext, {
                srfdatatype: params.srfdatatype,
            });
        }
        // 执行导出
        await this.service.exportData(tempDataExport, tempContext, fetchParams);
    }
    /**
     * @description 导出数据
     * @param {{
     *       event?: MouseEvent;
     *       params?: IApiExportParams;
     *     }} [args={}]
     * @returns {*}  {Promise<void>}
     * @memberof MDCtrlController
     */
    async exportData(args = {}) {
        var _a, _b;
        if ((_a = this.dataExport) === null || _a === void 0 ? void 0 : _a.enableBackend) {
            await this.excuteBackendExport(args.params || {});
            return;
        }
        const { header, fields, exportColumns } = this.getDataExcelModel();
        if (!header) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.common.md.tabularColumns'));
        }
        const data = await this.getExportData(args.params || {});
        const formatData = this.formatExcelData(data, fields);
        const table = formatData.map(v => Object.values(v));
        // 准备前台导出参数
        const frontExportParams = {
            header,
            data: table,
            fileName: this.model.logicName,
            colWidths: () => {
                return [];
            },
        };
        // 前台导出注入属性识别
        const frontExportAttri = (_b = this.model.controlAttributes) === null || _b === void 0 ? void 0 : _b.find(item => {
            return item.attrName === PredefinedAttributes.BEFORE_FRONT_EXPORT;
        });
        if (frontExportAttri) {
            const { attrValue } = frontExportAttri;
            if (attrValue) {
                const frontExportResult = await ScriptFactory.asyncExecScriptFn({ exportColumns, data }, attrValue);
                if (frontExportResult) {
                    Object.assign(frontExportParams, frontExportResult);
                }
            }
        }
        // 导出数据
        await ibiz.platform.frontExport(frontExportParams);
    }
}
