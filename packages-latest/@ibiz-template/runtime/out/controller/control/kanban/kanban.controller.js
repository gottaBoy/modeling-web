/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-destructuring */
import { clone, RuntimeError, isElementSame, RuntimeModelError, } from '@ibiz-template/core';
import { getParentTextAppDEFieldId } from '../../../model';
import { DataViewControlController } from '../data-view';
import { KanbanService } from './kanban.service';
import { UIActionUtil } from '../../../ui-action';
export class KanbanController extends DataViewControlController {
    /**
     * @description 是否支持全屏
     * @readonly
     * @type {boolean}
     * @memberof KanbanController
     */
    get enableFullScreen() {
        if (this.controlParams.enablefullscreen)
            return (this.controlParams.enablefullscreen === 'true' ||
                this.controlParams.enablefullscreen === true);
        return ibiz.config.kanban.enableFullScreen;
    }
    /**
     * @description 是否支持分组隐藏
     * @readonly
     * @type {boolean}
     * @memberof KanbanController
     */
    get enableGroupHidden() {
        if (this.controlParams.enablegrouphidden)
            return (this.controlParams.enablegrouphidden === 'true' ||
                this.controlParams.enablegrouphidden === true);
        return ibiz.config.kanban.enableGroupHidden;
    }
    /**
     * @description 拖拽模式
     * @readonly
     * @type {(0 | 1 | 2 | 3)} （无 | 仅分组 | 仅泳道 | 全部）
     * @memberof KanbanController
     */
    get draggableMode() {
        if (this.controlParams.draggablemode) {
            const draggablemode = Number(this.controlParams.draggablemode);
            if (!isNaN(draggablemode))
                return draggablemode;
        }
        return 3;
    }
    /**
     * @description 获取泳道描述
     * @readonly
     * @type {(string | undefined)}
     * @memberof KanbanController
     */
    get laneDescription() {
        var _a;
        if (this.controlParams.lanedescription)
            return ibiz.appUtil.resolveI18nText(this.controlParams.lanedescription);
        return (_a = this.dataEntity) === null || _a === void 0 ? void 0 : _a.logicName;
    }
    async initControlService() {
        this.service = new KanbanService(this.model);
        await this.service.init(this.context);
    }
    initState() {
        super.initState();
        this.state.size = this.model.pagingSize || 1000;
        this.state.batching = false;
        this.state.selectGroupKey = '';
        this.state.swimlanes = [];
    }
    /**
     * 初始化
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof KanbanController
     */
    async onCreated() {
        await super.onCreated();
        this.setToolbarHooks();
    }
    /**
     * @description 执行分组
     * @param {IApiMDGroupParams[]} _arg
     * @param {IParams} [_params]
     * @returns {*}  {Promise<void>}
     * @memberof KanbanController
     */
    async execGroup(_arg, _params) { }
    async afterLoad(args, items) {
        super.afterLoad(args, items);
        this.handleLaneData();
        return items;
    }
    /**
     * 当展开批操作工具栏时需进行行点击拦截
     *
     * @param {IData} data
     * @return {*}  {Promise<void>}
     * @memberof KanbanController
     */
    async onRowClick(_data) {
        const data = this.state.items.find(item => item.srfkey === _data.srfkey);
        if (!data) {
            return;
        }
        const { groupAppDEFieldId } = this.model;
        if (this.state.batching && groupAppDEFieldId) {
            const groupVal = data[groupAppDEFieldId];
            if (groupVal !== this.state.selectGroupKey) {
                // 激活事件
                if (this.state.mdctrlActiveMode === 1) {
                    await this.setActive(data);
                }
                return;
            }
        }
        super.onRowClick(data);
    }
    /**
     * @description 点击新建并设置设置选中分组
     * @param {MouseEvent} event
     * @param {(string | number)} group 分组
     * @param {IKanbanSwimlane} [lane] 泳道
     * @memberof KanbanController
     */
    onClickNew(event, group, lane) {
        this.setSelectGroup(group);
        const params = Object.assign(Object.assign({}, this.params), { srfgroup: group });
        if (lane)
            Object.assign(params, { srflane: lane.key });
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
     * @description 分组工具栏点击，需携带分组
     * @param {IUIActionGroupDetail} detail
     * @param {MouseEvent} event
     * @param {IKanbanGroupState} group
     * @returns {*}  {Promise<void>}
     * @memberof KanbanController
     */
    async onGroupToolbarClick(detail, event, group) {
        this.setSelectGroup(group.key);
        const actionId = detail.uiactionId;
        const params = Object.assign(Object.assign({}, this.params), { srfgroup: group.key });
        await UIActionUtil.execAndResolved(actionId, {
            context: this.context,
            params,
            data: group.selectedData || [],
            view: this.view,
            ctrl: this,
            event,
        }, detail.appId);
    }
    /**
     * @description 分组行为项点击, 需携带分组（有泳道时携带泳道）
     * @param {IUIActionGroupDetail} detail
     * @param {IData} item
     * @param {MouseEvent} event
     * @param {IKanbanGroupState} group
     * @param {IKanbanSwimlane} [lane]
     * @returns {*}  {Promise<void>}
     * @memberof KanbanController
     */
    async onGroupActionClick(detail, item, event, group, lane) {
        this.setSelectGroup(group.key);
        const params = Object.assign(Object.assign({}, this.params), { srfgroup: group });
        if (lane)
            Object.assign(params, { srflane: lane.key });
        const actionId = detail.uiactionId;
        await UIActionUtil.execAndResolved(actionId, {
            context: this.context,
            params,
            data: [item],
            view: this.view,
            ctrl: this,
            event,
        }, detail.appId);
    }
    /**
     * @description 处理数据分组
     * @returns {*}  {Promise<void>}
     * @memberof KanbanController
     */
    async handleDataGroup() {
        if (!this.model.enableGroup || this.model.groupMode === 'NONE') {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.kanban.groupedOn'));
        }
        return super.handleDataGroup();
    }
    /**
     * @description 处理泳道数据
     * @returns {*}  {Promise<void>}
     * @memberof KanbanController
     */
    async handleLaneData() {
        const { swimlaneCodeListId, swimlaneAppDEFieldId } = this.model;
        if (!swimlaneAppDEFieldId)
            return;
        let swimlanes = [];
        const unclassified = {
            count: 0,
            key: undefined,
            isExpand: true,
            caption: ibiz.i18n.t('runtime.controller.common.md.unclassified'),
        };
        const { items } = this.state;
        if (swimlaneCodeListId) {
            const app = ibiz.hub.getApp(this.context.srfappid);
            const codeListItems = await app.codeList.get(swimlaneCodeListId, this.context, this.params);
            swimlanes = codeListItems.map(item => {
                var _a;
                return {
                    count: 0,
                    isExpand: true,
                    key: (_a = item.value) === null || _a === void 0 ? void 0 : _a.toString(),
                    caption: item.text,
                };
            });
            items.forEach(item => {
                const lane = swimlanes.find(l => { var _a; return l.key === ((_a = item[swimlaneAppDEFieldId]) === null || _a === void 0 ? void 0 : _a.toLowerCase()); });
                if (lane) {
                    lane.count += 1;
                }
                else {
                    // 代码表没有的加入到未分类中
                    unclassified.count += 1;
                }
            });
        }
        else {
            const textDEFieldId = getParentTextAppDEFieldId(swimlaneAppDEFieldId, this.dataEntity) ||
                swimlaneAppDEFieldId;
            items.forEach(item => {
                if (item[swimlaneAppDEFieldId]) {
                    const lane = swimlanes.find(l => l.key === item[swimlaneAppDEFieldId]);
                    if (lane) {
                        lane.count += 1;
                    }
                    else {
                        swimlanes.push({
                            count: 1,
                            isExpand: true,
                            key: item[swimlaneAppDEFieldId],
                            caption: item[textDEFieldId],
                        });
                    }
                }
                else {
                    // 没有值的加入到未分类中
                    unclassified.count += 1;
                }
            });
        }
        // 将未分类移动到最后
        if (unclassified.count)
            swimlanes.push(unclassified);
        this.state.swimlanes = swimlanes;
    }
    /**
     * 处理代码表分组
     *
     * @return {*}  {Promise<void>}
     * @memberof KanbanController
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
                groupArr.push(item);
            }
            // 不在代码表里数据忽略
        });
        const groups = [];
        groupMap.forEach((arr, key) => {
            // 标题
            const codeListItem = this.groupCodeListItems.find(item => item.value === key);
            groups.push({
                caption: codeListItem.text,
                color: codeListItem.color,
                key: codeListItem.value,
                children: arr,
            });
        });
        this.state.groups = groups;
    }
    /**
     * @description 拖拽变更
     * @param {IDragChangeInfo} info
     * @returns {*}  {Promise<void>}
     * @memberof KanbanController
     */
    async onDragChange(info) {
        const { from, to, fromIndex, toIndex, fromLane, toLane } = info;
        if (!this.enableEditGroup && from !== to)
            return ibiz.message.warning(ibiz.i18n.t('runtime.controller.common.md.adjustmentsGroup'));
        if (!this.enableEditOrder && from === to && fromLane === toLane)
            return ibiz.message.warning(ibiz.i18n.t('runtime.controller.common.md.noAllowReorder'));
        const { groupAppDEFieldId = '', moveControlAction, swimlaneAppDEFieldId, minorSortAppDEFieldId, } = this.model;
        const fromGroup = this.state.groups.find(x => x.key === from);
        const toGroup = this.state.groups.find(x => x.key === to);
        const draggedItem = clone(fromGroup.children[fromIndex]);
        // 分组变更
        if (from !== to && groupAppDEFieldId)
            draggedItem[groupAppDEFieldId] = to;
        // 泳道变更
        if (fromLane !== toLane && swimlaneAppDEFieldId)
            draggedItem[swimlaneAppDEFieldId] = to;
        // 仅变更分组
        if (!this.enableEditOrder) {
            await this.updateChangedItems([draggedItem]);
        }
        else {
            // 排序变更
            if (!minorSortAppDEFieldId)
                throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.common.md.sortingProperties'));
            const moveAction = moveControlAction === null || moveControlAction === void 0 ? void 0 : moveControlAction.appDEMethodId;
            if (!moveAction)
                throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.common.md.noMoveDataCconfig'));
            // 存在移动数据行为，先变更分组或泳道再变更排序
            if (from !== to || fromLane !== toLane) {
                await this.updateChangedItems([draggedItem]);
            }
            const params = this.computeMoveDataParam(fromIndex, toIndex, draggedItem, toGroup.children, info.from !== info.to);
            await this.moveOrderItem(draggedItem, params);
        }
    }
    /**
     * 获取是否全屏
     *
     * @return {*}  {boolean}
     * @memberof KanbanController
     */
    getFullscreen() {
        const value = document.isFullScreen ||
            document.mozIsFullScreen ||
            document.webkitIsFullScreen;
        return value;
    }
    /**
     * 触发全屏
     *
     * @param {IData} container
     * @memberof KanbanController
     */
    onFullScreen(container) {
        const isFull = this.getFullscreen();
        if (!isFull) {
            if (container) {
                if (container.webkitRequestFullscreen) {
                    container.webkitRequestFullscreen();
                }
                else if (container.mozRequestFullScreen) {
                    container.mozRequestFullScreen();
                }
                else if (container.msRequestFullscreen) {
                    container.msRequestFullscreen();
                }
                else if (container.requestFullscreen) {
                    container.requestFullscreen();
                }
            }
        }
        else if (document.documentElement.requestFullScreen) {
            document.exitFullScreen();
        }
        else if (document.documentElement.webkitRequestFullScreen) {
            document.webkitCancelFullScreen();
        }
        else if (document.documentElement.mozRequestFullScreen) {
            document.mozCancelFullScreen();
        }
        return !isFull;
    }
    /**
     * 设置选中分组标识
     *
     * @param {(string | number)} key
     * @memberof KanbanController
     */
    setSelectGroup(key) {
        if (!this.state.batching)
            this.state.selectGroupKey = key;
    }
    /**
     * 设置分组控制器
     *
     * @param {string} groupKey
     * @param {('quickToolbarController' | 'batchToolbarController')} name
     * @param {IToolbarController} c
     * @memberof KanbanController
     */
    setGroupController(groupKey, name, c) {
        const group = this.state.groups.find(x => x.key === groupKey);
        if (group) {
            group[name] = c;
        }
    }
    /**
     * 设置工具栏hook
     *
     * @memberof KanbanController
     */
    setToolbarHooks() {
        this.listenNewController((name, c) => {
            if (name.startsWith(`${this.model.name}_quicktoolbar`) ||
                name.startsWith(`${this.model.name}_groupquicktoolbar`)) {
                this.setQuickToolbarClickHook(name, c);
            }
            if (name.startsWith(`${this.model.name}_batchtoolbar`)) {
                this.setBatchToolbarClickHook(name, c);
            }
        });
    }
    /**
     * 设置快捷工具栏点击事件hook
     *
     * @param {string} name
     * @param {IToolbarController} c
     * @memberof KanbanController
     */
    setQuickToolbarClickHook(name, c) {
        const key = name.split('quicktoolbar_')[1];
        this.setGroupController(key, 'quickToolbarController', c);
        c.evt.on('onClick', (event) => {
            const groupKey = event.targetName.split('quicktoolbar_')[1];
            this.setSelectGroup(groupKey);
            Object.assign(event.params, { srfgroup: groupKey });
        });
    }
    /**
     * 设置批工具栏点击事件hook
     *
     * @param {string} name
     * @param {IToolbarController} c
     * @memberof KanbanController
     */
    setBatchToolbarClickHook(name, c) {
        const key = name.split('batchtoolbar_')[1];
        this.setGroupController(key, 'batchToolbarController', c);
        c.evt.on('onClick', (event) => {
            const groupKey = event.targetName.split('batchtoolbar_')[1];
            this.setSelectGroup(groupKey);
            Object.assign(event.params, { srfgroup: groupKey });
        });
    }
    /**
     * 打开批操作工具栏
     *
     * @param {string | number} groupKey
     * @memberof KanbanController
     */
    openBatch(groupKey) {
        this.state.selectGroupKey = groupKey;
        this.state.batching = true;
        this.state.selectedData = [];
        // 清空分组选中数据
        this.state.groups.forEach(group => {
            group.selectedData = [];
        });
    }
    /**
     * 关闭批操作工具栏
     *
     * @memberof KanbanController
     */
    closeBatch() {
        this.state.selectGroupKey = '';
        this.state.batching = false;
        this.state.selectedData = [];
        // 清空分组选中数据
        this.state.groups.forEach(group => {
            group.selectedData = [];
        });
    }
    /**
     * @description 设置选中
     * @param {IData[]} selection
     * @param {boolean} [isEmit=true]
     * @memberof KanbanController
     */
    setSelection(selection, isEmit = true) {
        const { selectedData } = this.state;
        // 检查新的选中数据和旧的是否一致，不一致才变更。
        if (!isElementSame(selectedData, selection)) {
            this.state.selectedData = selection;
            if (isEmit) {
                this._evt.emit('onSelectionChange', {
                    data: selection,
                });
            }
        }
        // 根据数据计算工具栏权限和状态
        const data = selection === null || selection === void 0 ? void 0 : selection[0];
        const batchtoolbar = this.view.getController(`${this.model.name}_batchtoolbar_${this.state.selectGroupKey}`);
        const quicktoolbar = this.view.getController(`${this.model.name}_quicktoolbar_${this.state.selectGroupKey}`);
        batchtoolbar === null || batchtoolbar === void 0 ? void 0 : batchtoolbar.calcButtonState(data, this.model.appDataEntityId, {
            view: this.view,
            ctrl: this,
            data: selection,
        });
        quicktoolbar === null || quicktoolbar === void 0 ? void 0 : quicktoolbar.calcButtonState(data, this.model.appDataEntityId, {
            view: this.view,
            ctrl: this,
            data: selection,
        });
    }
}
