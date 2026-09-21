import { RuntimeModelError } from '@ibiz-template/core';
import { isNil } from 'ramda';
import { isBoolean } from 'qx-util';
import { ControlVO } from '../../../service';
import { UIActionUtil } from '../../../ui-action';
import { MDControlController } from '../../common';
import { ButtonContainerState, UIActionButtonState, } from '../../utils';
import { DataViewControlService } from './data-view.service';
export class DataViewControlController extends MDControlController {
    /**
     * 是否允许新建
     * @author lxm
     * @date 2023-09-11 04:05:25
     * @readonly
     * @type {boolean}
     */
    get enableNew() {
        return this.model.enableCardNew === true;
    }
    /**
     * 初始化State
     *
     * @protected
     * @memberof DataViewControlController
     */
    initState() {
        super.initState();
        this.state.noSort = this.model.noSort === true;
        this.state.size = this.model.pagingSize || 20;
        this.state.singleSelect = this.model.singleSelect === true;
        this.state.sortItems = [];
        this.state.collapseKeys = [];
        const { enablePagingBar } = this.model;
        this.state.enablePagingBar = enablePagingBar;
    }
    /**
     * 初始化
     *
     * @protected
     * @return {*}  {Promise<void>}
     * @memberof DataViewControlController
     */
    async onCreated() {
        await super.onCreated();
        await this.initControlService();
        this.initSortItems();
    }
    /**
     * 初始化部件服务
     * @author lxm
     * @date 2023-08-29 04:13:05
     * @protected
     * @return {*}  {Promise<void>}
     */
    async initControlService() {
        this.service = new DataViewControlService(this.model);
        await this.service.init(this.context);
    }
    /**
     * 初始化分组右侧界面行为按钮的状态
     *
     * @author chitanda
     * @date 2023-08-02 17:08:04
     * @return {*}  {Promise<void>}
     */
    async initGroupActionStates() {
        var _a;
        const { groupUIActionGroup } = this.model;
        if (!((_a = groupUIActionGroup === null || groupUIActionGroup === void 0 ? void 0 : groupUIActionGroup.uiactionGroupDetails) === null || _a === void 0 ? void 0 : _a.length)) {
            return;
        }
        this.state.groups.forEach(async (group) => {
            const containerState = new ButtonContainerState();
            groupUIActionGroup.uiactionGroupDetails.forEach(detail => {
                const actionid = detail.uiactionId;
                if (actionid) {
                    const buttonState = new UIActionButtonState(detail.id, this.context.srfappid, actionid, detail);
                    containerState.addState(detail.id, buttonState);
                }
            });
            await containerState.update(this.context, undefined, this.model.appDataEntityId);
            group.groupActionGroupState = containerState;
        });
    }
    /**
     * 行单击事件
     *
     * @author lxm
     * @date 2022-08-18 22:08:16
     * @param {IData} _data 选中的单条数据
     */
    async onRowClick(_data) {
        var _a;
        const data = this.state.items.find(item => item.srfkey === _data.srfkey);
        if (!data) {
            return;
        }
        super.onRowClick(data);
        const { groupAppDEFieldId } = this.model;
        if (groupAppDEFieldId) {
            // 根据selectedData填充分组的选中数据
            this.state.groups.forEach(group => {
                group.selectedData = [];
            });
            this.state.selectedData.forEach(select => {
                const groupVal = select[groupAppDEFieldId];
                const selectGroup = this.state.groups.find(group => group.key === groupVal);
                if (selectGroup) {
                    selectGroup.selectedData.push(select);
                }
            });
            // 根据分组选中的数据更新分组的按钮状态
            if (this.state.singleSelect) {
                // 单选情况下只有点击的分组的按钮会激活
                this.state.groups.forEach(group => {
                    var _a, _b;
                    let tempData = data;
                    if (group.selectedData.indexOf(tempData) !== -1) {
                        if (tempData && tempData instanceof ControlVO) {
                            tempData = tempData.getOrigin();
                        }
                        if (tempData) {
                            (_a = group.groupActionGroupState) === null || _a === void 0 ? void 0 : _a.update(this.context, tempData, this.model.appDataEntityId);
                        }
                    }
                    else {
                        (_b = group.groupActionGroupState) === null || _b === void 0 ? void 0 : _b.update(this.context, undefined, this.model.appDataEntityId);
                    }
                });
            }
            else {
                // 多选情况下可能有多组分组按钮会激活
                const actionGroup = this.state.groups.find(group => {
                    return group.children.indexOf(data) !== -1;
                });
                if (actionGroup) {
                    (_a = actionGroup.groupActionGroupState) === null || _a === void 0 ? void 0 : _a.update(this.context, actionGroup.selectedData[0], this.model.appDataEntityId);
                }
            }
        }
    }
    /**
     * 计算表格展示模式
     * @author fzh
     * @date 2024-05-29 19:18:42
     * @return {*}  {void}
     */
    calcShowMode(items) {
        const { enablePagingBar } = this.model;
        this.state.hideNoDataImage = false;
        this.state.enablePagingBar = enablePagingBar;
        // SHOWMODE = 'DEFAULT'|'ONLYDATA'|'MIXIN'
        // DEFAULT  默认逻辑
        const showmode = this.controlParams.showmode || 'DEFAULT';
        // ONLYDATA 无论有无数据 仅仅显示数据区域，表格头和分页栏都不要
        if (showmode === 'ONLYDATA') {
            this.state.enablePagingBar = false;
            if (items.length === 0) {
                this.state.hideNoDataImage = true;
            }
        }
        // MIXIN 无数据时，仅仅显示数据区域，表格头和分页栏都不要；有数据时，展示还是和默认一样
        if (showmode === 'MIXIN') {
            if (items.length === 0) {
                this.state.enablePagingBar = false;
                this.state.hideNoDataImage = true;
            }
        }
    }
    /**
     * 滚动到顶部
     *
     * @memberof DataViewControlController
     */
    scrollToTop() {
        this.evt.emit('onScrollToTop', undefined);
    }
    /**
     * 特殊处理，加载模式为滚动加载或者点击加载，刷新时加载数据条数为分页乘以默认条数
     *
     * @return {*}  {Promise<void>}
     * @memberof DataViewControlController
     */
    async refresh() {
        const param = {
            isInitialLoad: false,
        };
        if (this.model.pagingMode === 2 || this.model.pagingMode === 3) {
            const size = this.state.size * this.state.curPage;
            Object.assign(param, { viewParam: { page: 0, size } });
        }
        this.doNextActive(() => this.load(param), {
            key: 'refresh',
        });
    }
    async afterLoad(args, items) {
        await this.initGroupCodeListItems();
        await this.handleDataGroup();
        await this.initGroupActionStates();
        this.calcShowMode(items);
        return items;
    }
    /**
     * 获取操作项模型
     *
     * @return {*}  {(IDEDataViewItem | null)}
     * @memberof DataViewControlController
     */
    getOptItemModel() {
        let optItemModel = null;
        const { dedataViewItems } = this.model;
        if (dedataViewItems) {
            for (let index = 0; index < dedataViewItems.length; index++) {
                if (dedataViewItems[index].itemType === 'ACTIONITEM') {
                    optItemModel = dedataViewItems[index];
                }
            }
        }
        return optItemModel;
    }
    /**
     * 获取操作项行为
     *
     * @param {IData} item
     * @return {*}
     * @memberof DataViewControlController
     */
    getOptItemAction(item) {
        var _a;
        const containerState = new ButtonContainerState();
        const optItemModel = this.getOptItemModel();
        if (optItemModel) {
            if (!optItemModel.deuiactionGroup) {
                throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.control.dataView.noBehaviourGroup'));
            }
            if (!((_a = optItemModel.deuiactionGroup.uiactionGroupDetails) === null || _a === void 0 ? void 0 : _a.length)) {
                ibiz.log.debug(ibiz.i18n.t('runtime.controller.control.dataView.noBehaviourGroupAction'));
                return containerState;
            }
            optItemModel.deuiactionGroup.uiactionGroupDetails.forEach(detail => {
                const actionid = detail.uiactionId;
                if (actionid) {
                    const buttonState = new UIActionButtonState(detail.id, this.context.srfappid, actionid, detail);
                    containerState.addState(detail.id, buttonState);
                }
            });
            containerState.update(this.context, item.getOrigin());
        }
        return containerState;
    }
    /**
     * 行为点击
     *
     * @param {IUIActionGroupDetail} detail
     * @param {IData} item
     * @param {MouseEvent} event
     * @return {*}  {Promise<void>}
     * @memberof DataViewControlController
     */
    async onActionClick(detail, item, event) {
        const actionId = detail.uiactionId;
        await UIActionUtil.execAndResolved(actionId, {
            context: this.context,
            params: this.params,
            data: [item],
            view: this.view,
            ctrl: this,
            event,
        }, detail.appId);
    }
    /**
     * 处理数据分组
     *
     * @memberof DataViewControlController
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
     * @memberof DataViewControlController
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
            items.forEach((item) => {
                const groupVal = item[groupAppDEFieldId];
                if (isNil(groupVal)) {
                    // 分组无值的不显示
                    return;
                }
                if (!groupMap.has(groupVal)) {
                    groupMap.set(groupVal, []);
                }
                groupMap.get(groupVal).push(item);
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
     * @memberof DataViewControlController
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
                key: codeListItem.value,
                children: arr,
            });
        });
        this.state.groups = groups;
    }
    /**
     * 获取部件默认排序模型
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-12-28 18:43:27
     */
    getSortModel() {
        return {
            minorSortAppDEFieldId: this.model.minorSortAppDEFieldId,
            minorSortDir: this.model.minorSortDir,
        };
    }
    /**
     * 点击新建
     * @author lxm
     * @date 2023-09-11 07:22:33
     * @param {MouseEvent} event
     * @param {(string | number)} group 分组标识
     */
    onClickNew(event, group) {
        const params = Object.assign(Object.assign({}, this.params), { srfgroup: group });
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
     * 分组工具栏点击处理回调
     * @author lxm
     * @date 2023-09-11 04:48:06
     * @param {IUIActionGroupDetail} detail
     * @param {MouseEvent} event
     * @return {*}  {Promise<void>}
     */
    async onGroupToolbarClick(detail, event, group) {
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
     * 初始化排序项集合
     * @author lxm
     * @date 2023-10-24 06:11:02
     * @return {*}  {void}
     */
    initSortItems() {
        var _a;
        if (!((_a = this.model.dedataViewItems) === null || _a === void 0 ? void 0 : _a.length)) {
            return;
        }
        const sortItems = [];
        const { minorSortAppDEFieldId, minorSortDir } = this.model;
        const hasDefaultSort = minorSortAppDEFieldId && minorSortDir;
        this.model.dedataViewItems.forEach(item => {
            if (!item.enableSort) {
                return;
            }
            let { caption } = item;
            if (item.capLanguageRes) {
                caption = ibiz.i18n.t(item.capLanguageRes.lanResTag, item.caption);
            }
            if (!item.appDEFieldId) {
                throw new RuntimeModelError(item, ibiz.i18n.t('runtime.controller.control.dataView.sortingItems'));
            }
            const tempItem = {
                caption: caption,
                key: item.appDEFieldId,
            };
            // 默认排序
            if (hasDefaultSort && minorSortAppDEFieldId === item.appDEFieldId) {
                tempItem.order = minorSortDir.toLowerCase();
            }
            // 当前排序回显
            if (this.state.sortQuery) {
                const [appDEFieldId, order] = this.state.sortQuery.split(',');
                if (appDEFieldId === item.appDEFieldId) {
                    tempItem.order = order;
                }
            }
            sortItems.push(tempItem);
        });
        if (sortItems.length > 0) {
            this.state.sortItems = sortItems;
        }
    }
    /**
     * @description 切换分组折叠
     * @param {IData} [params={}]
     * @memberof DataViewControlController
     */
    changeCollapse(params = {}) {
        const { tag, expand } = params;
        if (tag) {
            const collapseKeysSet = new Set(this.state.collapseKeys);
            const collapse = isBoolean(expand) ? !expand : !collapseKeysSet.has(tag);
            if (collapse) {
                collapseKeysSet.add(tag);
            }
            else {
                collapseKeysSet.delete(tag);
            }
            this.state.collapseKeys = Array.from(collapseKeysSet);
        }
        else if (expand) {
            this.state.collapseKeys = [];
        }
        else {
            this.state.collapseKeys = this.state.groups.map(x => x.key.toString());
        }
    }
}
