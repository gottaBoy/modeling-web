/* eslint-disable no-nested-ternary */
/* eslint-disable prefer-destructuring */
import { RuntimeError, RuntimeModelError } from '@ibiz-template/core';
import { clone, isNil } from 'ramda';
import { calcDeCodeNameById } from '../../../model';
import { DataViewControlController } from '../data-view';
import { KanbanService } from './kanban.service';
import { UIActionUtil } from '../../../ui-action';
import { ButtonContainerState, UIActionButtonState } from '../../utils';
export class KanbanController extends DataViewControlController {
    /**
     * 允许调整顺序
     * @author lxm
     * @date 2023-09-11 04:02:39
     * @readonly
     * @type {boolean}
     */
    get enableEditOrder() {
        return this.model.enableCardEditOrder === true;
    }
    /**
     * 是否支持调整分组。
     * @author lxm
     * @date 2023-09-11 04:04:00
     * @readonly
     * @type {boolean}
     */
    get enableEditGroup() {
        return this.model.enableCardEditGroup === true;
    }
    async initControlService() {
        this.service = new KanbanService(this.model);
        await this.service.init(this.context);
    }
    initState() {
        super.initState();
        this.state.size = this.model.pagingSize || 1000;
        this.state.updating = false;
        this.state.batching = false;
        this.state.selectGroupKey = '';
        this.state.readonly = !!(this.context.srfreadonly === true || this.context.srfreadonly === 'true');
        // 支持调整顺序和分组时
        this.state.draggable = this.enableEditOrder || this.enableEditGroup;
        this.state.uaState = {};
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
     * 本地排序items
     * @author lxm
     * @date 2023-09-04 09:30:55
     * @param {IData[]} items
     */
    sortItems(items) {
        const sortField = this.model.minorSortAppDEFieldId;
        const { minorSortDir } = this.model;
        if (!sortField) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.control.kanban.sortingProperties'));
        }
        if (!minorSortDir) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.control.kanban.sortDirection'));
        }
        const isAsc = minorSortDir === 'ASC';
        // 格式化排序属性的值
        items.forEach(item => {
            const sortValue = item[sortField];
            if (isNil(sortValue)) {
                item[sortField] = 0;
            }
            else {
                const toNum = Number(sortValue);
                if (Number.isNaN(toNum)) {
                    throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.grid.convertedValue', {
                        srfmajortext: item.srfmajortext,
                    }));
                }
            }
        });
        // 排序
        items.sort((a, b) => isAsc ? a[sortField] - b[sortField] : b[sortField] - a[sortField]);
    }
    async afterLoad(args, items) {
        var _a;
        // 每次加载回来先本地排序，把数据的排序属性规范一下
        this.sortItems(this.state.items);
        super.afterLoad(args, items);
        const actions = [];
        (_a = this.model.dedataViewItems) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
            if (item.itemType === 'ACTIONITEM') {
                if (item.deuiactionGroup && item.deuiactionGroup.uiactionGroupDetails) {
                    actions.push(...item.deuiactionGroup.uiactionGroupDetails);
                }
            }
        });
        if (actions && actions.length > 0) {
            items.forEach((item) => {
                const containerState = new ButtonContainerState();
                actions.forEach((action) => {
                    const actionid = action.uiactionId;
                    if (actionid) {
                        const buttonState = new UIActionButtonState(action.id, this.context.srfappid, actionid);
                        containerState.addState(action.id, buttonState);
                    }
                });
                this.state.uaState[item.srfkey] = containerState;
            });
        }
        items.forEach((item) => {
            if (this.state.uaState[item.srfkey] &&
                Object.keys(this.state.uaState[item.srfkey]).length > 0) {
                this.state.uaState[item.srfkey].update(this.context, item.getOrigin(), this.model.appDataEntityId);
            }
        });
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
     * 点击新建时设置选中分组
     *
     * @param {MouseEvent} event
     * @param {(string | number)} group
     * @memberof KanbanController
     */
    onClickNew(event, group) {
        this.setSelectGroup(group);
        super.onClickNew(event, group);
    }
    /**
     * 分组工具栏需设置选中分组
     *
     * @param {IUIActionGroupDetail} detail
     * @param {MouseEvent} event
     * @param {IKanbanGroupState} group
     * @return {*}  {Promise<void>}
     * @memberof KanbanController
     */
    async onGroupToolbarClick(detail, event, group) {
        this.setSelectGroup(group.key);
        super.onGroupToolbarClick(detail, event, group);
    }
    /**
     * 分组行为项点击，需携带分组标识
     *
     * @param {IUIActionGroupDetail} detail
     * @param {IData} item
     * @param {MouseEvent} event
     * @param {IKanbanGroupState} group
     * @return {*}  {Promise<void>}
     * @memberof KanbanController
     */
    async onGroupActionClick(detail, item, event, group) {
        this.setSelectGroup(group.key);
        const params = Object.assign(Object.assign({}, this.params), { srfgroup: group });
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
    handleDataGroup() {
        if (!this.model.enableGroup || this.model.groupMode === 'NONE') {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.kanban.groupedOn'));
        }
        return super.handleDataGroup();
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
     * 拖拽变更事件处理回调
     * @author lxm
     * @date 2023-09-11 04:12:58
     * @param {IDragChangeInfo} info
     * @return {*}  {Promise<void>}
     */
    async onDragChange(info) {
        var _a;
        if (!this.enableEditGroup) {
            if (info.from !== info.to) {
                ibiz.message.warning(ibiz.i18n.t('runtime.controller.control.kanban.adjustmentsGroup'));
                return;
            }
        }
        const { from, to, fromIndex, toIndex } = info;
        const groupField = this.model.groupAppDEFieldId;
        const sortField = this.model.minorSortAppDEFieldId;
        const fromGroup = this.state.groups.find(x => x.key === from);
        const toGroup = this.state.groups.find(x => x.key === to);
        if (!this.enableEditOrder) {
            if (info.from === info.to) {
                ibiz.message.warning(ibiz.i18n.t('runtime.controller.control.kanban.noAllowReorder'));
                return;
            }
            // 只修改分组不管排序
            const draggedItem = fromGroup.children[fromIndex];
            draggedItem[groupField] = info.to; // 变更分组
            return this.updateChangedItems([draggedItem]);
        }
        const originArr = [...toGroup.children];
        const moveAction = (_a = this.model.moveControlAction) === null || _a === void 0 ? void 0 : _a.appDEMethodId;
        if (!moveAction) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.common.md.noMoveDataCconfig'));
        }
        this.state.updating = true;
        // 计算移动数据,目标分组指定位置存在数据，则添加到目标分组指定位置之前，若没有，则添加到当前分组数据排序值最大的后面
        const computeMoveData = (_fromIndex, _toIndex, _draggedItem, targetArray, isCrossGroup) => {
            let moveData = {};
            const targetItem = targetArray[_toIndex];
            if (!targetItem) {
                let tempArray = [];
                if (targetArray.length > 0) {
                    tempArray = targetArray;
                }
                if (tempArray.length > 0) {
                    const maxItem = tempArray.reduce((prev, curr) => {
                        const sortCondition = prev[sortField] > curr[sortField];
                        if (sortCondition &&
                            prev[this.dataEntity.keyAppDEFieldId] !== _draggedItem.srfkey) {
                            return prev;
                        }
                        if (!sortCondition &&
                            curr[this.dataEntity.keyAppDEFieldId] !== _draggedItem.srfkey) {
                            return curr;
                        }
                        return prev;
                    });
                    if (maxItem &&
                        maxItem[this.dataEntity.keyAppDEFieldId] !== _draggedItem.srfkey) {
                        moveData = {
                            srftargetkey: maxItem.srfkey,
                            srfmovetype: 'MOVEAFTER',
                        };
                    }
                }
            }
            else {
                moveData = {
                    srftargetkey: targetItem.srfkey,
                    srfmovetype: _toIndex < targetArray.length - 1
                        ? 'MOVEBEFORE'
                        : isCrossGroup
                            ? 'MOVEBEFORE'
                            : 'MOVEAFTER',
                };
            }
            return moveData;
        };
        // 拖拽数据
        const draggedItem = clone(fromGroup.children[fromIndex]);
        // 前台先改值
        const removeItems = fromGroup.children.splice(fromIndex, 1);
        toGroup.children.splice(toIndex, 0, ...removeItems);
        if (info.from !== info.to) {
            // 变更分组
            draggedItem[groupField] = info.to;
            // 存在移动数据行为，先变更分组再变更排序
            const app = ibiz.hub.getApp(this.model.appId);
            const deName = calcDeCodeNameById(this.model.appDataEntityId);
            const tempContext = this.context.clone();
            tempContext[deName] = draggedItem.srfkey;
            try {
                await app.deService.exec(this.model.appDataEntityId, 'update', tempContext, draggedItem);
                const index = this.state.items.findIndex(x => x.srfkey === draggedItem[this.dataEntity.keyAppDEFieldId]);
                if (index !== -1) {
                    this.state.items.splice(index, 1, draggedItem);
                }
            }
            catch (error) {
                this.state.updating = false;
                throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.common.md.changeGroupError'));
            }
        }
        // 移动排序
        const params = computeMoveData(fromIndex, toIndex, draggedItem, originArr, info.from !== info.to);
        try {
            const { ok, result } = await this.moveOrderItem(draggedItem, params);
            if (ok) {
                // 通知实体数据变更
                this.emitDEDataChange('update', draggedItem);
                // 返回空数组不做处理，非空数组同步界面数据,无数据界面重刷新
                if (Array.isArray(result) && result.length > 0) {
                    result.forEach(item => {
                        const index = this.state.items.findIndex(x => x.srfkey === item[this.dataEntity.keyAppDEFieldId]);
                        if (index !== -1) {
                            this.state.items[index][sortField] = item[sortField];
                        }
                    });
                }
                else {
                    await this.refresh();
                }
            }
        }
        catch (error) {
            this.state.updating = false;
            this.actionNotification(`MOVEERROR`, {
                error: error,
            });
        }
        finally {
            await this.afterLoad({}, this.state.items);
            this.state.updating = false;
        }
    }
    /**
     * 移动并排序数据
     *
     * @author tony001
     * @date 2024-06-17 15:06:22
     * @param {IData} draggedItem
     * @param {IData} moveMeta
     * @return {*}  {Promise<ControlVO[]>}
     */
    async moveOrderItem(draggedItem, moveMeta) {
        const deName = calcDeCodeNameById(this.model.appDataEntityId);
        const tempContext = this.context.clone();
        tempContext[deName] = draggedItem.srfkey;
        if (!moveMeta.srftargetkey || !moveMeta.srfmovetype) {
            ibiz.log.error(ibiz.i18n.t('runtime.controller.common.md.computeMoveMetaError'));
            return { ok: false };
        }
        const res = await this.service.moveOrderItem(tempContext, draggedItem, moveMeta);
        return { ok: true, result: res.data };
    }
    /**
     * 批量更新修改的项，并更新后台返回的数据，然后重新计算分组和排序
     * @author lxm
     * @date 2023-09-11 04:13:15
     * @param {ControlVO[]} changedItems
     * @return {*}  {Promise<void>}
     */
    async updateChangedItems(changedItems) {
        try {
            this.state.updating = true;
            await Promise.all(changedItems.map(async (item) => {
                // 往上下文添加主键
                const deName = calcDeCodeNameById(this.model.appDataEntityId);
                const tempContext = this.context.clone();
                tempContext[deName] = item.srfkey;
                // 调用接口修改数据
                const res = await this.service.updateGroup(tempContext, item);
                // 更新完之后更新state里的数据。
                if (res.ok) {
                    // 通知实体数据变更
                    this.emitDEDataChange('update', res.data);
                    const index = this.state.items.findIndex(x => x.srfkey === item.srfkey);
                    this.state.items.splice(index, 1, res.data);
                }
            }));
        }
        finally {
            this.state.updating = false;
            await this.afterLoad({}, this.state.items);
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
        if (!this.state.batching) {
            this.state.selectGroupKey = key;
        }
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
}
