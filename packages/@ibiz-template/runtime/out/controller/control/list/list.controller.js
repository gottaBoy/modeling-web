import { isBoolean } from 'qx-util';
import { MDControlController } from '../../common';
import { ListService } from './list.service';
import { ButtonContainerState, UIActionButtonState } from '../../utils';
import { UIActionUtil } from '../../../ui-action';
export class ListController extends MDControlController {
    initState() {
        super.initState();
        this.state.noSort = this.model.noSort === true;
        this.state.singleSelect = this.model.singleSelect === true;
        this.state.expandedKeys = [];
        const { enablePagingBar } = this.model;
        this.state.enablePagingBar = enablePagingBar;
    }
    async onCreated() {
        await super.onCreated();
        this.state.size = this.model.pagingSize || 20;
        this.service = new ListService(this.model);
        await this.service.init(this.context);
    }
    /**
     * @description 初始化分组界面行为组
     * @return {*}  {Promise<void>}
     * @memberof ListController
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
     * @description 分组界面行为点击
     * @param {IUIActionGroupDetail} detail
     * @param {MouseEvent} event
     * @param {IMDControlGroupState} group
     * @return {*}  {Promise<void>}
     * @memberof ListController
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
     * @memberof ListController
     */
    scrollToTop() {
        this.evt.emit('onScrollToTop', undefined);
    }
    /**
     * 特殊处理，加载模式为滚动加载或者点击加载，刷新时加载数据条数为分页乘以默认条数
     *
     * @return {*}  {Promise<void>}
     * @memberof ListController
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
        await this.handleDataGroup();
        await this.initGroupActionStates();
        this.calcShowMode(items);
        return items;
    }
    /**
     * 设置列表数据
     *
     * @author zk
     * @date 2023-05-26 02:05:46
     * @param {IData[]} items
     * @memberof ListController
     */
    setData(items) {
        this.state.items = items;
    }
    /**
     * 获取列表数据
     *
     * @author zk
     * @date 2023-05-26 02:05:35
     * @return {*}  {IData[]}
     * @memberof ListController
     */
    getAllData() {
        return this.state.items;
    }
    /**
     * 处理数据分组
     *
     * @memberof DataViewControlController
     */
    async handleDataGroup() {
        const { enableGroup, groupMode } = this.model;
        if (enableGroup && groupMode) {
            if (groupMode === 'AUTO') {
                await this.handleAutoGroup();
            }
            else if (groupMode === 'CODELIST') {
                await this.handleCodeListGroup();
            }
        }
        if (this.controlParams.defaultexpandall === 'true') {
            this.state.expandedKeys = this.state.groups.map(x => x.key.toString());
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
            const childrenMap = new Map();
            items.forEach((item) => {
                const children = childrenMap.get(item[groupAppDEFieldId]) || [];
                children.push(item);
                childrenMap.set(item[groupAppDEFieldId], children);
            });
            const groups = [];
            childrenMap.forEach((value, key) => {
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
     * 处理代码表分组
     *
     * @memberof DataViewControlController
     */
    async handleCodeListGroup() {
        const { groupAppDEFieldId, groupCodeListId } = this.model;
        if (groupAppDEFieldId && groupCodeListId) {
            const { items } = this.state;
            const groups = [];
            const app = ibiz.hub.getApp(this.context.srfappid);
            const codeList = await app.codeList.get(groupCodeListId, this.context, this.params);
            const keys = [];
            codeList.forEach((codeListItem) => {
                const value = items.filter((item) => item[groupAppDEFieldId] === codeListItem.value);
                groups.push({
                    caption: codeListItem.text,
                    key: codeListItem.value,
                    children: [...value],
                });
                keys.push(codeListItem.value);
            });
            const otherGroup = items.filter((item) => keys.indexOf(item[groupAppDEFieldId]) === -1);
            if (otherGroup.length > 0) {
                groups.push({
                    caption: '其他',
                    key: '其他',
                    children: [...otherGroup],
                });
            }
            this.state.groups = groups;
        }
    }
    /**
     * @description 切换分组折叠
     * @param {IData} [params={}]
     * @memberof ListController
     */
    changeCollapse(params = {}) {
        const { tag, expand } = params;
        if (tag) {
            const expandedKeysSet = new Set(this.state.expandedKeys);
            const expanded = isBoolean(expand) ? expand : !expandedKeysSet.has(tag);
            if (expanded) {
                expandedKeysSet.add(tag);
            }
            else {
                expandedKeysSet.delete(tag);
            }
            this.state.expandedKeys = Array.from(expandedKeysSet);
        }
        else if (expand) {
            this.state.expandedKeys = this.state.groups.map(x => x.key.toString());
        }
        else {
            this.state.expandedKeys = [];
        }
    }
}
