import { awaitTimeout, RuntimeError, recursiveIterate, } from '@ibiz-template/core';
import { GanttService } from './gantt.service';
import { TreeGridExController, TreeGridExRowState } from '../tree-grid-ex';
import { Srfuf, GanttNodeLinkData, } from '../../../service';
import { getRootNode, getChildNodeRSs, calcDeCodeNameById, } from '../../../model';
import { TreeGridExNotifyState } from '../../constant';
import { handleAllSettled } from '../../../utils';
import { isValueChange } from '../../utils';
/**
 * 甘特图控制器
 *
 * @author zhanghengfeng
 * @date 2023-12-08 15:12:54
 * @export
 * @class GanttController
 * @extends {MDControlController<IDEGantt, IGanttState, IGanttEvent>}
 * @implements {IGanttController}
 */
export class GanttController extends TreeGridExController {
    get _evt() {
        return this.evt;
    }
    /**
     * 初始化状态
     *
     * @author tony001
     * @date 2023-12-11 16:12:20
     * @protected
     */
    initState() {
        super.initState();
        this.state.ganttStyle = {};
        this.state.sliderDraggable = true;
        this.state.mustShowColumns = null;
        this.state.unit = 'day';
        this.state.links = [];
    }
    /**
     * 部件参数解析
     *
     * @author ljx
     * @date 2024-05-30 17:09:08
     * @protected
     * @memberof ControlController
     */
    handleControlParams() {
        super.handleControlParams();
        if (this.controlParams.sliderdraggable) {
            this.state.sliderDraggable =
                this.controlParams.sliderdraggable === 'true';
        }
        if (this.controlParams.mustshowcolumns) {
            this.state.mustShowColumns = JSON.parse(this.controlParams.mustshowcolumns);
        }
        if (this.controlParams.unit) {
            this.state.unit = this.controlParams.unit;
        }
    }
    /**
     * 当数据放生变更时，若为当前应用实体数据。则多数据部件进行刷新
     * 临时重写 防止错误刷新整个甘特图
     * @protected
     * @param {IData} msg
     * @memberof GanttController
     */
    onDataChange(msg) { }
    /**
     * 初始化对应类型的部件服务
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof GanttController
     */
    async initService() {
        this.service = new GanttService(this.model);
        await this.service.init(this.context);
    }
    /**
     * @description 设置甘特图样式
     * @param {IGanttStyle} style
     * @memberof GanttController
     */
    setGanttStyle(style) {
        this.state.ganttStyle = style;
    }
    /**
     * @description 设置激活数据
     * @param {IGanttNodeData} item
     * @returns {*}  {Promise<void>}
     * @memberof GanttController
     */
    async setActive(item) {
        const nodeParams = this.parseTreeNodeData(item);
        if (item._nodeType === 'DE') {
            const res = await this.openData(item);
            if (!res.cancel)
                this.refreshNodeChildren(item, true);
        }
        return this.evt.emit('onActive', Object.assign(Object.assign({}, nodeParams), { nodeData: item }));
    }
    /**
     * @description 部件刷新，走初始加载(规避预置后续刷新和通知刷新同时进行)
     * @returns {*}  {Promise<void>}
     * @memberof GanttController
     */
    async refresh() {
        this.doNextActive(async () => {
            const nodes = (await this.load({
                isInitialLoad: false,
            }));
            const children = this.model.rootVisible ? nodes : nodes[0]._children;
            if (children) {
                await this.handleDefaultExpandNodes(children);
            }
        }, {
            key: 'refresh',
        });
    }
    /**
     * @description 刷新指定树节点的子节点数据
     * @param {{ _id?: string; srfkey?: string }} nodeData 指定树节点数据，可以是节点数据，也可以是对应的实体数据
     * @param {boolean} [refreshParent=false] 是否是刷新给定节点数据的父节点的子节点数据
     * @returns {*}  {Promise<void>}
     * @memberof GanttController
     */
    async refreshNodeChildren(nodeData, refreshParent = false) {
        const key = nodeData.srfkey ? 'srfkey' : '_id';
        const currentNode = this.state.items.find(item => item[key] === nodeData[key]);
        if (!currentNode) {
            ibiz.log.error(ibiz.i18n.t('runtime.controller.control.tree.notFoundTreeData'), nodeData);
            return;
        }
        // 刷新父，但是没父，刷新根
        if (refreshParent) {
            const { _parent } = currentNode;
            // 没有父，或者父是不显示的根节点，那么刷新所有
            if (!_parent ||
                (!this.model.rootVisible && this.state.rootNodes.includes(_parent))) {
                await this.refresh();
                return;
            }
        }
        const targetNode = (refreshParent ? currentNode._parent : currentNode);
        const nodes = (await this.loadNodes(targetNode));
        await this.handleDefaultExpandNodes(nodes);
        this.evt.emit('onAfterRefreshParent', {
            parentNode: targetNode,
            children: nodes,
        });
    }
    /**
     * @description 处理默认展开
     * @param {IGanttNodeData[]} data 节点数据
     * @returns {*}  {Promise<void>}
     * @memberof GanttController
     */
    async handleDefaultExpandNodes(data) {
        for (let i = 0; i < data.length; i++) {
            const nodeData = data[i];
            if (this.state.expandedKeys.includes(nodeData._id)) {
                const key = nodeData.srfkey ? 'srfkey' : '_id';
                const currentNode = this.state.items.find(item => item[key] === nodeData[key]);
                const nodes = (await this.loadNodes(currentNode));
                await this.handleDefaultExpandNodes(nodes);
            }
        }
    }
    /**
     * @description 甘特图树节点点击事件
     * @param {IGanttNodeData} _nodeData
     * @param {MouseEvent} event
     * @returns {*}  {Promise<void>}
     * @memberof GanttController
     */
    async onTreeNodeClick(_nodeData, event) {
        var _a, _b;
        const nodeData = this.getNodeData(_nodeData._id);
        if (!nodeData)
            return;
        // 节点有配置常用操作的上下文菜单时，触发界面行为，后续逻辑都不走
        const clickActionItem = (_a = this.contextMenuInfos[nodeData._nodeId]) === null || _a === void 0 ? void 0 : _a.clickTBUIActionItem;
        const onlyOneActionItem = (_b = this.contextMenuInfos[nodeData._nodeId]) === null || _b === void 0 ? void 0 : _b.onlyOneActionItem;
        if (clickActionItem && onlyOneActionItem) {
            return this.doUIAction(clickActionItem.uiactionId, nodeData, event, clickActionItem.appId);
        }
        // 导航的时候，没有导航视图的时候，节点后续点击逻辑都不走，也不选中
        if (this.state.navigational) {
            const nodeModel = this.getNodeModel(nodeData._nodeId);
            if (!(nodeModel === null || nodeModel === void 0 ? void 0 : nodeModel.navAppViewId))
                return;
        }
        // 单选时，单击才会触发选中逻辑,禁止选择的时候不触发
        if (this.state.singleSelect && !nodeData._disableSelect) {
            // 选中相关处理
            const { selectedData } = this.state;
            // 选中里没有则添加，有则删除
            const filterArr = selectedData.filter(item => item._id !== nodeData._id);
            if (filterArr.length === selectedData.length) {
                this.setSelection(this.state.singleSelect
                    ? [nodeData]
                    : selectedData.concat([nodeData]));
            }
            else {
                this.setSelection(filterArr);
            }
        }
        // 激活事件
        if (this.state.mdctrlActiveMode === 1) {
            await this.setActive(nodeData);
        }
    }
    /**
     * @description 设置行属性的值
     * @param {TreeGridExRowState} row
     * @param {string} name
     * @param {unknown} value
     * @param {boolean} [ignore=false]
     * @returns {*}  {Promise<void>}
     * @memberof GanttController
     */
    async setRowValue(row, name, value, ignore = false) {
        const { beginDataItemName, endDataItemName } = this.model;
        if (Object.prototype.hasOwnProperty.call(row.data, name) &&
            !isValueChange(row.data[name], value)) {
            // `表格行数据里没有属性${name}或者${name}的值未发生改变`
            return;
        }
        // 改变值
        row.data[name] = value;
        if (name === beginDataItemName) {
            row.data._beginDataItemValue = value;
        }
        else if (name === endDataItemName) {
            row.data._endDataItemValue = value;
        }
        if (!ignore) {
            row.modified = true;
        }
        row.processing = true;
        try {
            await this.dataChangeNotify(row, [name]);
        }
        finally {
            row.processing = false;
        }
    }
    /**
     * @description 修改节点时间
     * @param {IGanttNodeData} nodeData 节点数据
     * @param {{ begin?: string; end?: string }} { begin, end } 开始时间，结束时间
     * @returns {*}  {Promise<void>}
     * @memberof GanttController
     */
    async modifyNodeTime(nodeData, { begin, end }) {
        if (nodeData._nodeType !== 'DE') {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.gantt.noNode'));
        }
        const rowState = this.getRowState(nodeData._id);
        if (!rowState) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.common.md.rowData'));
        }
        const { beginDataItemName, endDataItemName } = this.model;
        this.setRowValue(rowState, beginDataItemName, begin);
        this.setRowValue(rowState, endDataItemName, end);
        await this.save(rowState.data);
    }
    /**
     * @description 保存数据
     * @param {IGanttNodeData} nodeData 节点数据
     * @returns {*}  {Promise<void>}
     * @memberof GanttController
     */
    async save(nodeData) {
        if (this.state.isSimple) {
            ibiz.log.debug(ibiz.i18n.t('runtime.controller.common.md.simpleMode'));
            return;
        }
        if (nodeData._nodeType !== 'DE') {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.gantt.nonentity'));
        }
        const rowState = this.state.rows[nodeData._uuid];
        if (!rowState) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.common.md.rowData'));
        }
        if (!rowState.modified) {
            ibiz.log.debug(ibiz.i18n.t('runtime.controller.common.md.noChange'));
            return;
        }
        // 如果数据正在处理中，则延迟保存
        if (rowState.processing) {
            await awaitTimeout(500, this.save.bind(this), [nodeData]);
            return;
        }
        const nodeModel = this.getNodeModel(nodeData._nodeId);
        const { appDataEntityId, updateAppDEActionId } = nodeModel;
        const isCreate = nodeData._deData.srfuf === Srfuf.CREATE;
        // 处理接口
        const deName = calcDeCodeNameById(appDataEntityId);
        const tempContext = this.context.clone();
        tempContext[deName] = nodeData._deData.srfkey;
        const app = ibiz.hub.getApp(this.context.srfappid);
        let res;
        const updateMethodName = updateAppDEActionId || 'update';
        try {
            res = await app.deService.exec(appDataEntityId, isCreate ? 'create' : updateMethodName, tempContext, nodeData._deData);
        }
        catch (error) {
            await this.evt.emit('onSaveError', undefined);
            this.actionNotification(`${isCreate ? 'CREATE' : 'UPDATE'}ERROR`, {
                error: error,
                data: rowState.data,
            });
            throw error;
        }
        // 后续处理
        rowState.data._deData = res.data;
        rowState.modified = false;
        this.gridStateNotify(rowState, TreeGridExNotifyState.SAVE);
        await this.updateRows(this.state.rows);
        await this.evt.emit('onSaveSuccess', undefined);
    }
    /**
     * @description 删除
     * @param {MDCtrlRemoveParams} [args]
     * @returns {*}  {Promise<void>}
     * @memberof GanttController
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
        await this.evt.emit('onBeforeRemove', undefined);
        await this.startLoading();
        let needRefresh = false;
        let refreshNode;
        try {
            const app = ibiz.hub.getApp(this.context.srfappid);
            await handleAllSettled(data.map(async (item) => {
                // 新建未保存的数据直接走后续删除处理逻辑
                if (item._nodeType === 'DE') {
                    const tempContext = context.clone();
                    const nodeModel = this.getNodeModel(item._nodeId);
                    // 新建未保存的数据直接走后续删除处理逻辑
                    if (nodeModel && item._deData.srfuf !== Srfuf.CREATE) {
                        const { appDataEntityId, removeAppDEActionId } = nodeModel;
                        const deName = calcDeCodeNameById(appDataEntityId);
                        tempContext[deName] = item.srfkey;
                        const removeMethodName = removeAppDEActionId || 'remove';
                        // 删除后台的数据
                        await app.deService.exec(appDataEntityId, removeMethodName, tempContext, params);
                        if (!refreshNode && item._parent) {
                            const parentNodeData = this.getNodeData(item._parent._id);
                            refreshNode = parentNodeData;
                        }
                        needRefresh = true;
                    }
                    this.afterRemove(item);
                }
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
            if (needRefresh && refreshNode && !(args === null || args === void 0 ? void 0 : args.notRefresh)) {
                await this.refreshNodeChildren(refreshNode);
            }
        }
        catch (error) {
            await this.evt.emit('onRemoveError', undefined);
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
        await this.evt.emit('onRemoveSuccess', undefined);
    }
    /**
     * @description 后台删除结束后界面删除逻辑
     * @param {GanttDataSetNodeData} data
     * @memberof GanttController
     */
    afterRemove(data) {
        var _a;
        // 删除 items 里的数据
        const index = this.state.items.findIndex(item => item._uuid === data._uuid);
        if (index !== -1) {
            this.state.items.splice(index, 1);
        }
        // 删除rows里面的数据
        if (this.state.rows[data._uuid]) {
            delete this.state.rows[data._uuid];
        }
        // 如果有父数据 从父中删除该项子数据
        if (data._parent) {
            const parentNodeData = this.getNodeData(data._parent._id);
            const childIndex = parentNodeData._children.findIndex(child => child._uuid === data._uuid);
            if (childIndex !== -1) {
                (_a = parentNodeData._children) === null || _a === void 0 ? void 0 : _a.splice(childIndex, 1);
            }
        }
    }
    /**
     * @description 新建行
     * @param {MDCtrlLoadParams} [args={}]
     * @returns {*}  {Promise<void>}
     * @memberof GanttController
     */
    async newRow(args = {}) {
        var _a;
        const { data } = args;
        if (this.editShowMode === 'row') {
            const editingRow = Object.values(this.state.rows).find(item => item.showRowEdit);
            if (editingRow) {
                throw new RuntimeError(ibiz.i18n.t('runtime.controller.common.md.firstComplete'));
            }
        }
        let parentModel;
        let parentNodeData;
        if (data) {
            const item = (Array.isArray(data) ? data[0] : data);
            parentNodeData = this.getNodeData(item._id);
            parentModel = this.getNodeModel(parentNodeData._nodeId);
        }
        else {
            parentNodeData = this.state.rootNodes[0];
            parentModel = getRootNode(this.model);
        }
        if (parentModel) {
            const nodeRSs = getChildNodeRSs(this.model, {
                parentId: parentModel.id,
                hasQuery: false,
            });
            let nodeRS;
            let nodeModel;
            nodeRSs.forEach(_nodeRS => {
                const childNode = this.getNodeModel(_nodeRS.childDETreeNodeId);
                if ((childNode === null || childNode === void 0 ? void 0 : childNode.treeNodeType) === 'DE' && childNode.appDataEntityId) {
                    nodeRS = _nodeRS;
                    nodeModel = childNode;
                }
            });
            if (nodeModel) {
                let draftData;
                try {
                    draftData = await this.service.getNodeDraft(nodeModel, nodeRS, parentNodeData, {
                        ctrl: this,
                        view: this.view,
                        hasQuery: false,
                        context: this.context.clone(),
                        params: this.params,
                    });
                }
                catch (error) {
                    this.actionNotification('GETDRAFTERROR', {
                        error: error,
                    });
                    throw error;
                }
                // 填充新建默认值
                const defaultVal = this.calcDefaultValue(draftData, true);
                Object.assign(draftData, defaultVal);
                // 将子数据挂载到父数据下
                const parentRow = this.getRowState(parentNodeData._id);
                if ((_a = parentNodeData._children) === null || _a === void 0 ? void 0 : _a.length) {
                    parentNodeData._children.push(draftData);
                }
                else {
                    parentNodeData._children = [draftData];
                }
                this.state.items.push(draftData);
                const rowState = new TreeGridExRowState(draftData, this);
                this.state.rows[draftData._uuid] = rowState;
                this.gridStateNotify(rowState, TreeGridExNotifyState.DRAFT);
                if (this.editShowMode === 'row') {
                    this.switchRowEdit(rowState, true);
                }
                this.evt.emit('onNewRow', { row: parentRow });
                this.actionNotification('GETDRAFTSUCCESS', { data: draftData });
            }
        }
    }
    onDEDataChange(msg) { }
    /**
     * @description 切换折叠，tag=指定分组标识(不传则全部)，expand=目标状态(不传则反转)
     * @param {{ tag?: string; expand?: boolean }} [params={}]
     * @memberof GanttController
     */
    changeCollapse(params = {}) {
        const { tag, expand } = params;
        // 存在分组id则展开/收缩分组
        if (tag) {
            const row = this.state.items.find(x => x.srfnodeid === tag);
            if (row) {
                this._evt.emit('onToggleRowExpansion', { row, expand });
            }
        }
        else if (this.state.rootNodes.length > 0) {
            // 不存在分组id时全展开/全收缩,且只对第一层节点生效
            const { _children = [] } = this.state.rootNodes[0];
            _children.forEach(item => {
                this._evt.emit('onToggleRowExpansion', { row: item, expand });
            });
        }
    }
    /**
     * 保存列状态
     *
     * @memberof GanttController
     */
    saveColumnState() {
        localStorage.setItem(`${this.view.model.id}.${this.model.name}.columnStates`, JSON.stringify(this.state.columnStates));
    }
    /**
     * 控制列显示
     * @param {IColumnState[]} columnStates
     * @return {*}
     * @memberof GanttController
     */
    setColumnVisible(columnStates) {
        this.state.columnStates = columnStates;
        const storageColumnStatesStr = localStorage.getItem(`${this.view.model.id}.${this.model.name}.columnStates`);
        // 在重新设置显示列后，就仅获取对应列缓存里面的列宽
        if (storageColumnStatesStr) {
            const storageColumnStates = JSON.parse(storageColumnStatesStr);
            this.state.columnStates.map((item) => {
                const column = storageColumnStates.find((state) => {
                    return state.key === item.key;
                });
                if (column) {
                    item.columnWidth = column.columnWidth;
                }
                return true;
            });
        }
        this.saveColumnState();
        this.calcColumnFixed();
    }
    /**
     * 初始化树表格（增强）列状态
     * @return {*}
     * @memberof GanttController
     */
    initColumnStates() {
        var _a;
        (_a = this.model.detreeColumns) === null || _a === void 0 ? void 0 : _a.forEach((column) => {
            // 列隐藏模式为始终隐藏则不初始化到表格列数据中
            if (column.hideMode !== 2) {
                this.state.columnStates.push({
                    key: column.codeName,
                    caption: column.caption,
                    hidden: !!column.hideDefault,
                    hideMode: column.hideMode || 0,
                    uaColumn: column.columnType === 'UAGRIDCOLUMN',
                    columnWidth: column.width,
                });
            }
        });
        const storageColumnStatesStr = localStorage.getItem(`${this.view.model.id}.${this.model.name}.columnStates`);
        // 有本地缓存从缓存里拿，拿完如果还是空数组再走模型
        if (storageColumnStatesStr) {
            const storageColumnStates = JSON.parse(storageColumnStatesStr);
            this.state.columnStates = this.mergeGridColumnStates(this.state.columnStates, storageColumnStates);
        }
        this.calcColumnFixed();
    }
    /**
     * 合并表格列状态数组
     * @param {IColumnState[]} base 基础表格列状态
     * @param {IColumnState[]} cache 缓存表格列状态
     * @returns 以基础表格列状态为主，缓存表格列状态修正基础表格列状态
     * @return {IColumnState[]}
     * @memberof GanttController
     */
    mergeGridColumnStates(base, cache) {
        const columnStates = [];
        if (base.length > 0) {
            base.forEach(baseColumnState => {
                const cacheColumnState = cache.find(item => {
                    return item.key === baseColumnState.key;
                });
                if (cacheColumnState) {
                    columnStates.push(cacheColumnState);
                }
                else {
                    columnStates.push(baseColumnState);
                }
            });
        }
        return columnStates;
    }
    /**
     * loadNodes加载完子数据之后的处理
     * @param {IGanttNodeData[]} nodes 加载回来的子数据
     * @return {*}  {Promise<void>}
     */
    async afterLoadNodes(nodes) {
        await super.afterLoadNodes(nodes);
        await this.updateLinks();
    }
    /**
     * @description 更新链接线数据
     * @returns {*}  {Promise<void>}
     * @memberof GanttController
     */
    async updateLinks() {
        const { linkdatasourcetype, linkappdataentityname, linkappdedatasetname, linknodedataname, fromdataitemname, todataitemname, } = this.controlParams;
        let result = [];
        const app = ibiz.hub.getApp(this.context.srfappid);
        // 适配数据源模式
        switch (linkdatasourcetype) {
            case 'DEDATASET':
                result = await this.service.getDEDatasByDEDataset({
                    appDataEntityId: `${app.id}.${linkappdataentityname}`,
                    appDEDataSetName: linkappdedatasetname,
                    context: this.context,
                    params: this.params,
                });
                break;
            case 'NODEDATA':
            default:
                recursiveIterate({ _children: this.state.rootNodes }, (node) => {
                    var _a, _b;
                    if ((_b = (_a = node._deData) === null || _a === void 0 ? void 0 : _a[linknodedataname]) === null || _b === void 0 ? void 0 : _b.length) {
                        result.push(...node._deData[linknodedataname]);
                    }
                }, { childrenFields: ['_children'] });
                break;
        }
        // 处理links数据
        const _links = [];
        result.forEach(data => {
            let fromData;
            let toData;
            this.state.items.find(_ganttNode => {
                if (data[fromdataitemname] === _ganttNode._value)
                    fromData = _ganttNode;
                if (data[todataitemname] === _ganttNode._value)
                    toData = _ganttNode;
                if (fromData && toData)
                    return true;
                return false;
            });
            // 起始节点或结束节点不存在时不显示链接线
            if (fromData && toData) {
                _links.push(new GanttNodeLinkData({
                    fromDataItemName: fromdataitemname,
                    toDataItemName: todataitemname,
                    fromData,
                    toData,
                    data,
                }));
            }
        });
        this.state.links = _links;
    }
}
