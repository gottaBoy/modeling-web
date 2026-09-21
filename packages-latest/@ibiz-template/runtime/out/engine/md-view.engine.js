import { RuntimeModelError } from '@ibiz-template/core';
import { clone } from 'ramda';
import { SysUIActionTag, ViewCallTag } from '../constant';
import { calcDeCodeNameById, getControl } from '../model';
import { ViewEngineBase } from './view-base.engine';
/**
 * 多数据视图引擎
 * @author lxm
 * @date 2023-05-22 03:12:29
 * @export
 * @class MDViewEngine
 * @extends {ViewEngineBase}
 */
export class MDViewEngine extends ViewEngineBase {
    /**
     * 多数据部件名称
     * @author lxm
     * @date 2023-06-07 09:17:19
     * @readonly
     * @type {string}
     */
    get xdataControlName() {
        return this.view.model.xdataControlName;
    }
    /**
     * 获取分页搜索视图上移的工具栏控制器
     * @author lxm
     * @date 2023-05-22 03:47:43
     * @readonly
     * @protected
     * @type {(IToolbarController | undefined)}
     */
    get tabToolbar() {
        return this.view.getController('tabtoolbar');
    }
    /**
     * 获取分页搜索视图上移的搜索栏控制器
     * @author lxm
     * @date 2023-05-22 01:56:25
     * @readonly
     */
    get tabSearchBar() {
        return this.view.getController('tabsearchbar');
    }
    /**
     * 数据部件控制器（多数据）
     * @author lxm
     * @date 2023-05-22 01:56:35
     * @readonly
     * @type {IMDControlController}
     */
    get xdataControl() {
        return this.view.getController(this.xdataControlName);
    }
    async onCreated() {
        await super.onCreated();
        const { childNames } = this.view;
        childNames.push(this.xdataControlName, 'searchform', 'searchbar', 'tabtoolbar', 'tabsearchform', 'tabsearchbar');
        // 存在xdataControlName名称时就是普通多数据视图，给对应的多数据部件传递noLoadDefault
        if (this.xdataControlName) {
            if (!this.view.slotProps[this.xdataControlName]) {
                this.view.slotProps[this.xdataControlName] = {};
            }
            this.view.slotProps[this.xdataControlName].loadDefault = false;
        }
        this.view.listenNewController((name) => {
            if (name === 'searchform') {
                // 计算是否默认展开搜索表单
                const { model } = this.view;
                const controller = this.viewLayoutPanel.panelItems.view_searchform;
                if (controller) {
                    const formExists = !!this.searchForm;
                    controller.state.keepAlive = formExists;
                    controller.state.visible = formExists && !!model.expandSearchForm;
                }
            }
        });
    }
    async onMounted() {
        await super.onMounted();
        const { model } = this.view;
        this.xdataControl.evt.on('onActive', this.onXDataActive.bind(this));
        this.xdataControl.evt.on('onSelectionChange', async (event) => {
            var _a, _b;
            // 更新工具栏状态
            (_a = this.toolbar) === null || _a === void 0 ? void 0 : _a.calcButtonState(event.data[0], this.xdataControl.model.appDataEntityId, event);
            (_b = this.tabToolbar) === null || _b === void 0 ? void 0 : _b.calcButtonState(event.data[0], this.xdataControl.model.appDataEntityId, event);
        });
        this.xdataControl.evt.on('onBeforeLoad', () => {
            this.xdataControl.state.searchParams = this.getSearchParams();
        });
        // 触发视图数据变更
        this.xdataControl.evt.on('onLoadSuccess', event => {
            var _a, _b;
            // 更新工具栏状态
            (_a = this.toolbar) === null || _a === void 0 ? void 0 : _a.calcButtonState(undefined, this.xdataControl.model.appDataEntityId, event);
            (_b = this.tabToolbar) === null || _b === void 0 ? void 0 : _b.calcButtonState(undefined, this.xdataControl.model.appDataEntityId, event);
            this.view.evt.emit('onDataChange', Object.assign(Object.assign({}, event), { actionType: 'LOAD' }));
        });
        this.xdataControl.evt.on('onRemoveSuccess', event => {
            this.view.evt.emit('onDataChange', Object.assign(Object.assign({}, event), { actionType: 'REMOVE' }));
        });
        this.xdataControl.evt.on('onSaveSuccess', event => {
            this.view.evt.emit('onDataChange', Object.assign(Object.assign({}, event), { actionType: 'SAVE' }));
        });
        // 刷新成功后，更新工具栏状态
        this.xdataControl.evt.on('onRefreshSuccess', async (event) => {
            var _a, _b, _c;
            if (((_a = event.data) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                (_b = this.toolbar) === null || _b === void 0 ? void 0 : _b.calcButtonState(event.data[0], this.xdataControl.model.appDataEntityId, event);
                (_c = this.tabToolbar) === null || _c === void 0 ? void 0 : _c.calcButtonState(event.data[0], this.xdataControl.model.appDataEntityId, event);
            }
        });
        // 搜索表单搜索触发加载
        if (this.searchForm) {
            this.searchForm.evt.on('onSearch', () => {
                this.reLoad();
            });
        }
        // 搜索栏搜索触发加载
        if (this.searchBar) {
            this.searchBar.evt.on('onSearch', () => {
                this.reLoad();
            });
        }
        // 搜索表单搜索触发加载
        if (this.tabSearchForm) {
            this.tabSearchForm.evt.on('onSearch', () => {
                this.reLoad();
            });
        }
        // 搜索栏搜索触发加载
        if (this.tabSearchBar) {
            this.tabSearchBar.evt.on('onSearch', () => {
                this.reLoad();
            });
        }
        // 默认加载
        if (!this.view.state.noLoadDefault && model.loadDefault) {
            const searchbar = this.searchBar || this.tabSearchBar;
            if (searchbar &&
                searchbar.hasDefaultSelect &&
                (this.xdataControlName === 'grid' ||
                    this.xdataControlName === 'treegrid')) {
                // 搜索栏默认选中，由搜索栏自己触发表格的加载
                searchbar.setDefaultSelect();
            }
            else {
                this.load();
            }
        }
    }
    /**
     * 重新计算上下文，主要用于视图控制器再算上下文后，每个视图控制器可自身根据变动重新计算
     * @author zpc
     * @date 2024-03-12 13:52:06
     * @return {*}  {Promise<void>}
     */
    handleContextParams() {
        super.handleContextParams();
        // 若上下文未指定，多数据视图默认开启简单模式
        if (!this.view.context.srfsimple) {
            this.view.context.srfsimple = true;
        }
    }
    /**
     * 多数据部件激活事件处理
     * @author lxm
     * @date 2023-08-31 02:53:37
     * @protected
     * @param {EventBase} event
     * @return {*}  {Promise<void>}
     */
    async onXDataActive(event) {
        const res = await this.openData(event);
        if (!res.cancel) {
            this.refresh();
        }
    }
    async call(key, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    args) {
        if (key === SysUIActionTag.EDIT || key === SysUIActionTag.VIEW) {
            return this.openData(args);
        }
        if (key === SysUIActionTag.NEW) {
            return this.newData(args);
        }
        if (key === SysUIActionTag.REMOVE) {
            await this.remove(args);
            return null;
        }
        if (key === SysUIActionTag.IMPORT) {
            await this.importData();
            return null;
        }
        if (key === SysUIActionTag.REFRESH) {
            await this.refresh();
            return null;
        }
        if (key === SysUIActionTag.EXPORT_EXCEL) {
            await this.exportData(args);
            return null;
        }
        if (key === SysUIActionTag.COPY) {
            this.copy(args);
            return null;
        }
        if (key === ViewCallTag.LOAD) {
            this.load(args);
            return null;
        }
        // 获取所有数据
        if (key === ViewCallTag.GET_ALL_DATA) {
            return this.xdataControl.state.items;
        }
        if (key === ViewCallTag.SET_SELECTED_DATA) {
            this.setSelectedData(args.data);
            return null;
        }
        return super.call(key, args);
    }
    getData() {
        return this.xdataControl.getData();
    }
    /**
     * 打开编辑数据视图
     *
     * @author lxm
     * @date 2022-09-01 18:09:19
     * @param {IData} data
     * @param {MouseEvent} [event]
     * @returns {*}
     */
    async openData(args) {
        var _a, _b;
        const { data, event } = args;
        // 添加选中数据的主键
        const context = (args.context || this.view.context).clone();
        // 添加srfnavctrlid到上下文
        context.srfnavctrlid = this.xdataControl.ctrlId;
        const params = args.params || this.view.params;
        const deName = ((_a = data[0].srfdecodename) === null || _a === void 0 ? void 0 : _a.toLowerCase()) ||
            calcDeCodeNameById(this.xdataControl.model.appDataEntityId);
        context[deName.toLowerCase()] = data[0].srfkey;
        const result = await ((_b = this.view.scheduler) === null || _b === void 0 ? void 0 : _b.triggerCustom('opendata', {
            context,
            params,
            data,
            event,
            view: this.view,
        }));
        if (result === -1) {
            ibiz.log.error(ibiz.i18n.t('runtime.engine.logicOpendata'));
            return {
                cancel: true,
            };
        }
        if (result && result.ok && result.data && result.data.length > 0) {
            this.view.evt.emit('onDataChange', {
                data: result.data,
                actionType: 'EDIT',
            });
        }
        return {
            cancel: result ? !result.ok : true,
        };
    }
    /**
     * 打开新建数据视图
     *
     * @author lxm
     * @date 2022-09-01 18:09:19
     * @param {IData} data
     * @param {MouseEvent} [event]
     * @returns {*}
     */
    async newData(args) {
        var _a, _b, _c;
        const { data, event, copyMode } = args;
        const openAppViewLogic = (_b = (_a = this.view.model.viewLayoutPanel) === null || _a === void 0 ? void 0 : _a.appViewLogics) === null || _b === void 0 ? void 0 : _b.find(item => item.id === 'newdata');
        if (!openAppViewLogic) {
            throw new RuntimeModelError(this.view.model, ibiz.i18n.t('runtime.engine.logicNewdata'));
        }
        const params = clone(this.view.params);
        if (copyMode) {
            params.srfcopymode = copyMode;
        }
        if (args.params) {
            Object.assign(params, Object.assign({}, args.params));
        }
        const result = await ((_c = this.view.scheduler) === null || _c === void 0 ? void 0 : _c.triggerCustom('newdata', {
            context: this.view.context,
            params,
            data,
            event,
            view: this.view,
        }));
        if (result === -1) {
            ibiz.log.error(ibiz.i18n.t('runtime.engine.logicNewdata'));
            return {
                cancel: true,
            };
        }
        if (result.ok && result.data && result.data.length > 0) {
            this.view.evt.emit('onDataChange', {
                data: result.data,
                actionType: 'NEW',
            });
        }
        return {
            cancel: result ? !result.ok : true,
        };
    }
    /**
     * 视图删除
     *
     * @author lxm
     * @date 2022-08-30 19:08:59
     * @returns {*}  {Promise<void>}
     */
    async remove(args) {
        await this.xdataControl.remove(args);
    }
    /**
     * 视图加载
     * @author lxm
     * @date 2023-05-22 03:17:33
     * @return {*}  {Promise<void>}
     */
    async load(args = {}) {
        await this.xdataControl.load(Object.assign({ isInitialLoad: true }, args));
    }
    /**
     * 视图刷新
     * @author lxm
     * @date 2023-05-22 03:17:33
     * @return {*}  {Promise<void>}
     */
    async refresh() {
        await this.xdataControl.refresh();
    }
    /**
     * 视图重新加载
     * @author lxm
     * @date 2023-05-22 03:17:33
     * @return {*}  {Promise<void>}
     */
    async reLoad() {
        await this.xdataControl.load({ isInitialLoad: true });
    }
    /**
     * @description 设置选中数据
     * @protected
     * @param {IData[]} items
     * @memberof MDViewEngine
     */
    setSelectedData(items) {
        this.xdataControl.setSelectedData(items);
    }
    /**
     * 获取搜索相关的查询参数
     * @author lxm
     * @date 2023-05-22 03:26:04
     * @return {*}  {IParams}
     */
    getSearchParams() {
        const params = {};
        // 有搜索栏的整合相关参数
        if (this.searchBar) {
            Object.assign(params, this.searchBar.getFilterParams());
        }
        // 有搜索表单的整合相关参数
        if (this.searchForm) {
            const resultParams = this.searchForm.getFilterParams();
            Object.assign(params, this.handleSearchParams(params, resultParams));
        }
        // 有搜索栏的整合相关参数
        if (this.tabSearchBar) {
            Object.assign(params, this.tabSearchBar.getFilterParams());
        }
        // 有搜索表单的整合相关参数
        if (this.tabSearchForm) {
            const resultParams = this.tabSearchForm.getFilterParams();
            Object.assign(params, this.handleSearchParams(params, resultParams));
        }
        return params;
    }
    /**
     * @description 处理搜索参数
     * @protected
     * @param {IParams} params
     * @param {IParams} newParams
     * @returns {*}  {IParams}
     * @memberof MDViewEngine
     */
    handleSearchParams(params, newParams) {
        const _params = Object.assign({}, newParams);
        if (params.searchconds && newParams.searchconds) {
            Object.assign(_params, {
                searchconds: [
                    {
                        condop: 'AND',
                        condtype: 'GROUP',
                        searchconds: [...params.searchconds, ...newParams.searchconds],
                    },
                ],
            });
        }
        return _params;
    }
    /**
     * 导入数据
     * @author lxm
     * @date 2023-05-22 03:28:26
     * @return {*}  {Promise<void>}
     */
    async importData() {
        await this.xdataControl.importData();
    }
    /**
     * 导出数据
     * @author lxm
     * @date 2023-05-22 03:29:06
     * @param {{ event: MouseEvent }} args
     * @return {*}  {Promise<void>}
     */
    async exportData(args) {
        await this.xdataControl.exportData(args);
    }
    /**
     * 复制数据
     *
     * @author zk
     * @date 2023-06-01 12:06:58
     * @memberof MDViewEngine
     */
    async copy(args) {
        this.newData(Object.assign(args, { copyMode: true }));
    }
    /**
     * 计算头部显示
     *
     * @author zk
     * @date 2024-01-29 05:01:30
     * @protected
     * @return {*}  {boolean}
     * @memberof MDViewEngine
     */
    calcViewHeaderVisible() {
        const showHeader = super.calcViewHeaderVisible();
        // 搜索栏
        const visible = this.calcViewSearchBarVisible();
        return visible || showHeader;
    }
    /**
     * 计算搜索栏显示
     *
     * @author zk
     * @date 2024-01-29 05:01:36
     * @protected
     * @return {*}  {boolean}
     * @memberof MDViewEngine
     */
    calcViewSearchBarVisible() {
        var _a, _b;
        const { model } = this.view;
        // 搜索栏
        const has = this.isExistAndInLayout('searchbar');
        if (!has)
            return has;
        const searchBar = getControl(model, 'searchbar');
        const visible = !!(searchBar.enableQuickSearch ||
            searchBar.enableGroup ||
            searchBar.enableFilter === true);
        // 卡片视图
        const dataview = getControl(this.view.model, 'dataview');
        const cardstyle = (_b = (_a = dataview === null || dataview === void 0 ? void 0 : dataview.controlParam) === null || _a === void 0 ? void 0 : _a.ctrlParams) === null || _b === void 0 ? void 0 : _b.CARDSTYLE;
        return cardstyle === 'userstyle' ? false : visible;
    }
    /**
     * 计算移除的模型名称
     *
     * @author zk
     * @date 2024-01-29 03:01:42
     * @return {*}  {string[]}
     * @memberof MDViewEngine
     */
    calcRemoveLayoutModel() {
        const { model } = this.view;
        const names = super.calcRemoveLayoutModel();
        if (!getControl(model, 'searchform')) {
            names.push('searchform');
        }
        if (!this.calcViewSearchBarVisible()) {
            names.push('view_searchbar');
        }
        return names;
    }
}
