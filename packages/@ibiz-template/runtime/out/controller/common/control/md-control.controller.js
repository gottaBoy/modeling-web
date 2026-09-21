/* eslint-disable max-classes-per-file */
import { isElementSame, RuntimeError, RuntimeModelError, } from '@ibiz-template/core';
import { isNil } from 'ramda';
import { calcDeCodeNameById } from '../../../model';
import { Srfuf } from '../../../service';
import { handleAllSettled } from '../../../utils';
import { openDataImport } from '../../utils';
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
export class MDControlController extends ControlController {
    constructor() {
        super(...arguments);
        /**
         * 是否设置过排序条件，比如searchBars默认点击分组时设置了
         * @return {*}
         * @author: zhujiamin
         * @Date: 2024-02-22 16:10:23
         */
        this.isSetSort = false;
        /**
         * 是否允许加载数据
         *
         * @author ljx
         * @date 2024-11-15 15:08:51
         * @type {boolean}
         */
        this.enableLoad = true;
        /**
         * 实体属性映射，key是id，value是name
         * @author lxm
         * @date 2023-09-07 03:16:56
         * @protected
         */
        this.fieldIdNameMap = new Map();
    }
    get _evt() {
        return this.evt;
    }
    /**
     * 获取部件通用的事件参数
     *
     * @return {*}  {Omit<EventBase, 'eventName'>}
     * @memberof MDControlController
     */
    getEventArgs() {
        const result = super.getEventArgs();
        return Object.assign(Object.assign({}, result), { dataArg: {
                total: this.state.total,
                totalx: this.state.totalx,
            } });
    }
    initState() {
        super.initState();
        const { navViewPos, navViewShowMode } = this.model;
        this.state.enableNavView = !!(navViewPos && navViewPos !== 'NONE');
        this.state.showNavView = navViewShowMode !== 1 && navViewShowMode !== 3;
        this.state.showNavIcon = navViewShowMode !== 2 && navViewShowMode !== 3;
        this.state.items = [];
        this.state.selectedData = [];
        this.state.searchParams = {};
        this.state.noSort = false;
        this.state.sortQuery = '';
        this.state.curPage = 1;
        this.state.size = 20;
        this.state.total = 0;
        this.state.totalx = undefined;
        this.state.isLoaded = false;
        this.state.singleSelect = true;
        this.state.mdctrlActiveMode = 0;
        this.state.groups = [];
        this.state.hideNoDataImage = false;
    }
    /**
     * 批操作工具栏
     *
     * @author zk
     * @date 2023-08-02 06:08:34
     * @readonly
     * @type {(IToolbarController | undefined)}
     * @memberof ListController
     */
    get batchToolbarController() {
        const controller = this.view.getController(`${this.model.name}_batchtoolbar`);
        return controller;
    }
    /**
     * 快速工具栏
     *
     * @author zk
     * @date 2023-08-02 06:08:34
     * @readonly
     * @type {(IToolbarController | undefined)}
     * @memberof ListController
     */
    get quickToolbarController() {
        const controller = this.view.getController(`${this.model.name}_quicktoolbar`);
        return controller;
    }
    async onCreated() {
        var _a;
        await super.onCreated();
        if (this.model.appDataEntityId) {
            // 初始化实体属性id和name的映射
            this.dataEntity = await ibiz.hub.getAppDataEntity(this.model.appDataEntityId, this.model.appId);
            (_a = this.dataEntity.appDEFields) === null || _a === void 0 ? void 0 : _a.forEach(field => {
                this.fieldIdNameMap.set(field.id, field.name);
            });
        }
        // 设置默认排序，只有在没设置过排序才走
        if (!this.isSetSort) {
            this.setSort();
        }
    }
    async onMounted() {
        await super.onMounted();
        // 如果外面没有配置默认不加载的话，默认部件自己加载
        if (this.state.loadDefault) {
            this.load({ isInitialLoad: true });
        }
    }
    /**
     * 获取部件默认排序模型
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-28 18:43:27
     */
    getSortModel() {
        return {
            minorSortAppDEFieldId: undefined,
            minorSortDir: undefined,
        };
    }
    /**
     * 显示内置导航视图变化
     *
     * @memberof MDControlController
     */
    onShowNavViewChange() {
        this.state.showNavView = !this.state.showNavView;
    }
    /**
     * 打开内置导航视图
     * - 默认为当前激活数据
     * @param {IData} [data]
     * @memberof MDControlController
     */
    openNavView(data) {
        const selected = data || this.state.selectedData[0];
        if (selected) {
            // 判断点击项是否已选中
            const findIndex = this.state.selectedData.findIndex(item => {
                return selected.srfkey === item.srfkey;
            });
            if (findIndex !== -1) {
                // 点击项已选中时，显示内置导航置反
                this.state.showNavView = !this.state.showNavView;
            }
            else {
                // 点击项未选中时，先设置选中，再设置显示内置导航
                this.onRowClick(selected);
                this.state.showNavView = true;
            }
        }
    }
    /**
     * 设置排序
     * 无参数时设置的是默认排序。
     *
     * @author lxm
     * @date 2022-09-28 13:09:44
     * @param {string} key 排序字段
     * @param {string} order 排序顺序
     */
    setSort(key, order) {
        if (key && order) {
            this.state.sortQuery = `${key},${order}`;
        }
        else if (!key && !order) {
            // 设置默认排序(localStorage的优先级高于配置)
            const { minorSortAppDEFieldId, minorSortDir } = this.getSortModel();
            if (this.view &&
                localStorage.getItem(`${this.view.model.id}.${this.model.name}.sort`)) {
                this.state.sortQuery = localStorage.getItem(`${this.view.model.id}.${this.model.name}.sort`);
            }
            else if (minorSortAppDEFieldId && minorSortDir) {
                const fieldName = this.fieldIdNameMap.get(minorSortAppDEFieldId);
                this.state.sortQuery = `${fieldName.toLowerCase()},${minorSortDir.toLowerCase()}`;
            }
        }
        else {
            // 排序字段和顺序只要有一个没有就置空
            this.state.sortQuery = '';
        }
        // 设置后更新localStorage里的
        if (this.view) {
            if (this.state.sortQuery) {
                localStorage.setItem(`${this.view.model.id}.${this.model.name}.sort`, this.state.sortQuery);
            }
            else {
                localStorage.removeItem(`${this.view.model.id}.${this.model.name}.sort`);
            }
        }
    }
    /**
     * 获取请求过滤参数（整合了视图参数，各种过滤条件，排序，分页）
     * @author lxm
     * @date 2023-05-23 03:20:40
     * @param {IParams} [extraParams] 额外视图参数，附加在最后
     * @return {*}  {Promise<IParams>}
     */
    async getFetchParams(extraParams) {
        const { curPage, size, sortQuery, noSort } = this.state;
        const resultParams = Object.assign({}, this.params);
        // 有size才给page和size。size默认值给0就不传分页和大小
        if (size) {
            resultParams.page = curPage - 1;
            resultParams.size = size;
        }
        // 排序条件
        if (!noSort && sortQuery) {
            resultParams.sort = sortQuery;
        }
        // *请求参数处理
        await this._evt.emit('onBeforeLoad', undefined);
        // 合并搜索条件参数，这些参数在onBeforeLoad监听里由外部填入
        Object.assign(resultParams, Object.assign({}, this.state.searchParams));
        // 额外附加参数
        if (extraParams) {
            Object.assign(resultParams, extraParams);
        }
        // 门户过滤参数统一处理
        if (resultParams.srfsearchconds) {
            if (resultParams.searchconds && resultParams.searchconds.length > 0) {
                resultParams.searchconds = {
                    condop: 'AND',
                    condtype: 'GROUP',
                    searchconds: [
                        resultParams.srfsearchconds,
                        ...resultParams.searchconds,
                    ],
                };
            }
            else {
                resultParams.searchconds = [resultParams.srfsearchconds];
            }
            delete resultParams.srfsearchconds;
        }
        return resultParams;
    }
    /**
     * 加载更多
     *
     * @author zhanghengfeng
     * @date 2024-06-11 19:06:15
     * @return {*}  {Promise<void>}
     */
    async loadMore() {
        if (this.state.total > this.state.items.length) {
            await this.load({ isLoadMore: true });
        }
    }
    /**
     * 部件加载数据行为
     *
     * @author lxm
     * @date 2022-08-19 14:08:50
     */
    async load(args = {}) {
        if (this.state.isSimple) {
            this.state.isLoaded = true;
            return [];
        }
        const silent = args.silent === true;
        if (!silent) {
            await this.startLoading();
        }
        try {
            // *初始加载需要重置分页
            const isInitialLoad = args.isInitialLoad === true;
            const isLoadMore = args.isLoadMore === true;
            if (isInitialLoad) {
                this.state.curPage = 1;
            }
            else if (isLoadMore) {
                this.state.curPage += 1;
            }
            // *查询参数处理
            const { context } = this.handlerAbilityParams(args);
            const params = await this.getFetchParams(args === null || args === void 0 ? void 0 : args.viewParam);
            // 加载前判断是否允许加载数据
            if (!this.enableLoad) {
                return [];
            }
            const res = await this.service.fetch(context, params);
            // 更新分页数据总条数
            if (typeof res.total === 'number') {
                this.state.total = res.total;
            }
            if (typeof res.totalx === 'number') {
                this.state.totalx = res.totalx;
            }
            if (typeof res.totalPages === 'number') {
                this.state.totalPages = res.totalPages;
            }
            if (isLoadMore) {
                this.state.items.push(...res.data);
            }
            else {
                this.state.items = res.data;
            }
            await this.afterLoad(args, res.data);
            await this._evt.emit('onLoadSuccess', {
                isInitialLoad,
            });
            if (args.triggerSource && args.triggerSource === 'REFRESH') {
                await this._evt.emit('onRefreshSuccess', {
                    data: this.state.selectedData,
                });
            }
        }
        catch (error) {
            await this._evt.emit('onLoadError', undefined);
            this.actionNotification('FETCHERROR', {
                error: error,
            });
            throw error;
        }
        finally {
            this.state.isLoaded = true;
            if (!silent) {
                await this.endLoading();
            }
        }
        this.state.items.forEach((item, index) => {
            item.srfserialnum = index + 1;
        });
        this.actionNotification('FETCHSUCCESS');
        return this.state.items;
    }
    /**
     * 部件加载后处理
     *
     * @author chitanda
     * @date 2023-06-21 15:06:44
     * @param {MDCtrlLoadParams} args 本次请求参数
     * @param {IData[]} items 上游处理的数据（默认是后台数据）
     * @return {*}  {Promise<IData[]>} 返回给后续处理的数据
     */
    async afterLoad(args, items) {
        return items;
    }
    /**
     * 部件刷新，走初始加载(规避预置后续刷新和通知刷新同时进行)
     *
     * @author tony001
     * @date 2024-03-28 18:03:00
     * @return {*}  {Promise<void>}
     */
    async refresh() {
        const { pagingMode } = this.model;
        this.doNextActive(() => !this.ctx.isDestroyed &&
            this.load({
                isInitialLoad: !!ibiz.env.isMob || pagingMode === 2 || pagingMode === 3,
                triggerSource: 'REFRESH',
            }), {
            key: 'refresh',
        });
    }
    /**
     * 删除选中的数据
     *
     * @author lxm
     * @date 2022-09-06 19:09:48
     * @returns {*}  {Promise<void>}
     */
    async remove(args) {
        const { context, params, data } = this.handlerAbilityParams(args);
        if (!(data === null || data === void 0 ? void 0 : data.length)) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.common.control.uncheckedData'));
        }
        // 删除确认提示
        if ((args === null || args === void 0 ? void 0 : args.silent) !== true) {
            let del = false;
            const hiddenSsgItem = this.findCtrlMsgByTag('BEFOREREMOVE_HIDDEN');
            if (hiddenSsgItem) {
                del = true;
            }
            else {
                del = await ibiz.confirm.error({
                    title: ibiz.i18n.t('runtime.controller.common.control.dataDeletion'),
                    desc: ibiz.i18n.t('runtime.controller.common.control.confirmDataDeletion'),
                });
            }
            if (!del) {
                return;
            }
        }
        await this._evt.emit('onBeforeRemove', undefined);
        await this.startLoading();
        let needRefresh = false;
        try {
            await handleAllSettled(data.map(async (item) => {
                // 新建未保存的数据直接走后续删除处理逻辑
                needRefresh = await this.handleItemRemove(item, context, params);
                this.afterRemove(item);
            }));
            if ((args === null || args === void 0 ? void 0 : args.silent) !== true) {
                this.actionNotification('REMOVESUCCESS', {
                    data,
                    default: ibiz.i18n.t('runtime.controller.common.md.dataDeleted', {
                        str: data.map(item => item.srfmajortext).join('、'),
                    }),
                });
            }
            // 刷新数据，补全这一页缺少的数据
            if (needRefresh && !(args === null || args === void 0 ? void 0 : args.notRefresh)) {
                await this.refresh();
            }
        }
        catch (error) {
            await this._evt.emit('onRemoveError', undefined);
            if ((args === null || args === void 0 ? void 0 : args.silent) !== true) {
                this.actionNotification('REMOVEERROR', {
                    error: error,
                    data,
                });
            }
            throw error;
        }
        finally {
            await this.endLoading();
        }
        this.state.selectedData = [];
        await this._evt.emit('onRemoveSuccess', undefined);
        // 发送对象删除事件
        data.forEach(item => {
            this.emitDEDataChange('remove', item);
        });
    }
    /**
     * 删除每一项
     * @return {*}
     * @author: zhujiamin
     * @Date: 2024-02-27 09:47:52
     */
    async handleItemRemove(item, context, params) {
        let needRefresh = false;
        const deName = calcDeCodeNameById(this.model.appDataEntityId);
        if (item.srfuf !== Srfuf.CREATE) {
            const tempContext = context.clone();
            tempContext[deName] = item.srfkey;
            // 删除后台的数据
            await this.service.remove(tempContext, params);
            needRefresh = true;
        }
        return needRefresh;
    }
    /**
     * 后台删除结束后界面删除逻辑
     *
     * @author lxm
     * @date 2022-09-06 19:09:10
     * @param {IData} data
     */
    afterRemove(data) {
        // 删除this.items里的数据
        const index = this.state.items.findIndex(item => item.srfkey === data.srfkey);
        if (index !== -1) {
            this.state.items.splice(index, 1);
        }
    }
    /**
     * 获取多数据部件的选中数据集合
     *
     * @author lxm
     * @date 2022-08-30 18:08:00
     * @returns {*}  {IData[]}
     */
    getData() {
        return this.state.selectedData || [];
    }
    /**
     * 设置导航数据
     *
     * @param {IData} item
     * @memberof MDControlController
     */
    setNavData(item) {
        this._evt.emit('onNavDataChange', {
            navData: item,
        });
    }
    setActive(item, event) {
        return this._evt.emit('onActive', {
            data: [item],
            event,
        });
    }
    setSelection(selection) {
        var _a, _b;
        const { selectedData } = this.state;
        // 检查新的选中数据和旧的是否一致，不一致才变更。
        if (!isElementSame(selectedData, selection)) {
            this.state.selectedData = selection;
            this._evt.emit('onSelectionChange', {
                data: selection,
            });
        }
        // 根据数据计算工具栏权限和状态
        const data = selection === null || selection === void 0 ? void 0 : selection[0];
        (_a = this.batchToolbarController) === null || _a === void 0 ? void 0 : _a.calcButtonState(data, this.model.appDataEntityId);
        (_b = this.quickToolbarController) === null || _b === void 0 ? void 0 : _b.calcButtonState(data, this.model.appDataEntityId);
    }
    /**
     * 行单击事件
     *
     * @author lxm
     * @date 2022-08-18 22:08:16
     * @param {IData} data 选中的单条数据
     * @param {MouseEvent} event
     */
    async onRowClick(_data, event) {
        const data = this.state.items.find(item => item.srfkey === _data.srfkey);
        if (!data) {
            return;
        }
        // 选中相关处理
        const { selectedData } = this.state;
        // 选中里没有则添加，有则删除
        const filterArr = selectedData.filter(item => item.srfkey !== data.srfkey);
        if (filterArr.length === selectedData.length) {
            this.setSelection(this.state.singleSelect ? [data] : selectedData.concat([data]));
        }
        else {
            this.setSelection(filterArr);
        }
        // 设置导航数据
        this.setNavData(data);
        // 激活事件
        if (this.state.mdctrlActiveMode === 1) {
            await this.setActive(data, event);
        }
    }
    /**
     * 行双击事件
     *
     * @author lxm
     * @date 2022-08-18 22:08:16
     * @param {IData} data 选中的单条数据
     */
    async onDbRowClick(_data) {
        const data = this.state.items.find(item => item.srfkey === _data.srfkey);
        if (this.state.mdctrlActiveMode === 2 && data) {
            await this.setActive(data);
        }
    }
    /**
     * 数据导入
     *
     * @author lxm
     * @date 2022-11-08 15:11:54
     * @returns {*}  {Promise<void>}
     */
    async importData() {
        const { appDataEntityId, dedataImportId } = this.model;
        if (!appDataEntityId || !dedataImportId) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.common.control.noImportModel'));
        }
        await openDataImport({
            appDataEntityId,
            deDataImportId: dedataImportId,
            context: this.context,
            params: this.params,
        });
    }
    /**
     * 数据导出
     *
     * @param {MouseEvent} event 原生js点击事件
     * @returns {*}  {Promise<void>}
     * @memberof MDControlController
     */
    async exportData(_args) {
        // const { dataExport, appEntity } = this.model;
        // if (!dataExport) {
        //   throw new DefectModelError(this.model.source, '没有配置实体导出模型！');
        // }
        // if (!dataExport.enableBackend) {
        //   throw new UnsupportedModelError(dataExport, '前台导出暂未支持！');
        // }
        // // 创建气泡框，操作后获得相关参数。
        // const popover = ibiz.overlay.createPopover(
        //   'DataExport',
        //   {
        //     dismiss: (result: unknown) => popover.dismiss(result),
        //     maxRowCount: dataExport.maxRowCount || 1000,
        //     pageSize: this.state.size,
        //   },
        //   { autoClose: true, placement: 'bottom-end' },
        // );
        // popover.present(event.target as HTMLElement);
        // const exportParams = await popover.onWillDismiss();
        // // 没有返回值，则是取消导出操作
        // if (!exportParams) {
        //   return;
        // }
        // // *请求参数处理，合并选择的导出参数
        // const params = await this.getFetchParams(exportParams);
        // const { data: file } = await this.service.exportData(
        //   dataExport,
        //   this.context,
        //   params,
        // );
        // const fileName = `${appEntity.source.logicName}表.xlsx`;
        // downloadFileFromBlob(file, fileName);
    }
    /**
     * 检测实体数据变更
     *
     * @author tony001
     * @date 2024-03-28 18:03:30
     * @protected
     * @param {IPortalMessage} msg
     * @return {*}  {void}
     */
    onDEDataChange(msg) {
        var _a, _b;
        // msg.triggerKey 不为空，且与当前控制器的triggerKey一致时，则不处理
        if (!isNil(msg.triggerKey) && msg.triggerKey === this.triggerKey) {
            return;
        }
        // 非这个实体的数据变更，则不处理
        const data = msg.data;
        if (!data ||
            (!data.srfdecodename && !data.srfdename) ||
            (data.srfdecodename &&
                data.srfdecodename !== ((_a = this.dataEntity) === null || _a === void 0 ? void 0 : _a.codeName)) ||
            (data.srfdename && data.srfdename !== ((_b = this.dataEntity) === null || _b === void 0 ? void 0 : _b.name))) {
            return;
        }
        let isRefresh = false;
        const { srfkey } = msg.data;
        // 新增一定刷新，修改和删除只有当前多数据部件存在的数据命中后才刷新
        switch (msg.subtype) {
            case 'OBJECTCREATED':
                isRefresh = true;
                break;
            case 'OBJECTUPDATED':
                if (this.state.items.findIndex(item => item.srfkey === srfkey) !== -1) {
                    isRefresh = true;
                }
                break;
            case 'OBJECTREMOVED':
                if (this.state.items.findIndex(item => item.srfkey === srfkey) !== -1) {
                    isRefresh = true;
                }
                break;
            default:
                break;
        }
        if (isRefresh) {
            this.refresh();
        }
    }
    /**
     * 跳转第一页
     *
     * @author tony001
     * @date 2024-07-15 14:07:03
     * @return {*}  {Promise<IData[]>}
     */
    async goToFirstPage() {
        const { curPage, items } = this.state;
        const { pagingMode } = this.model;
        let result = items;
        // 分页模式为分页栏且当前页面不是第一个页面才查询
        if (curPage !== 1 && pagingMode === 1) {
            this.state.curPage = 1;
            result = await this.load();
        }
        return result;
    }
    /**
     * 跳转上一页
     *
     * @author tony001
     * @date 2024-07-15 14:07:28
     * @return {*}  {Promise<IData[]>}
     */
    async goToPreviousPage() {
        const { curPage } = this.state;
        const { pagingMode } = this.model;
        let result = [];
        // 分页模式为分页栏且当前页面大于1才查询
        if (pagingMode === 1 && curPage > 1) {
            this.state.curPage -= 1;
            result = await this.load();
        }
        return result;
    }
    /**
     * 跳转下一页
     *
     * @author tony001
     * @date 2024-07-15 14:07:34
     * @return {*}  {Promise<IData[]>}
     */
    async goToNextPage() {
        const { curPage, totalPages } = this.state;
        const { pagingMode } = this.model;
        let result = [];
        // 分页模式存在且前页小于总页数才加载下一页
        if (pagingMode && curPage < totalPages) {
            // 分页栏模式
            if (pagingMode === 1) {
                this.state.curPage += 1;
                result = await this.load();
            }
            else {
                result = await this.load({ isLoadMore: true });
            }
        }
        return result;
    }
    /**
     * 跳转最后一页
     *
     * @author tony001
     * @date 2024-07-15 14:07:44
     * @return {*}  {Promise<IData[]>}
     */
    async goToLastPage() {
        const { curPage, items, totalPages, total } = this.state;
        const { pagingMode } = this.model;
        let result = items;
        // 当前页小于最大页时才加载数据
        if (pagingMode && curPage < totalPages) {
            // 分页栏模式
            if (pagingMode === 1) {
                this.state.curPage = totalPages;
                result = await this.load();
            }
            else {
                this.state.size = total;
                result = await this.load({ isInitialLoad: true });
            }
        }
        return result;
    }
}
