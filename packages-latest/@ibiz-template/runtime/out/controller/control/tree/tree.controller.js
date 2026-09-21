/* eslint-disable no-param-reassign */
/* eslint-disable no-lonely-if */
/* eslint-disable no-else-return */
import { RuntimeError, recursiveIterate, RuntimeModelError, } from '@ibiz-template/core';
import { isNil } from 'ramda';
import { isBoolean } from 'qx-util';
import { UIActionUtil } from '../../../ui-action';
import { MDControlController } from '../../common';
import { ContextMenuController } from '../context-menu';
import { TreeService } from './tree.service';
import { getTreeNode, getChildNodeRSs, getUIActionById, calcDeCodeNameById, calcUIActionGroup, } from '../../../model';
import { CounterService, Srfuf } from '../../../service';
import { convertNavData } from '../../../utils';
import { OpenAppViewCommand } from '../../../command';
import { PresetIdentifier } from '../../../constant';
/**
 * 树部件控制器
 * @author lxm
 * @date 2023-05-26 08:20:46
 * @export
 * @class TreeController
 * @extends {MDControlController<IDETree, ITreeState, ITreeEvent>}
 * @implements {ITreeController}
 */
export class TreeController extends MDControlController {
    constructor() {
        super(...arguments);
        /**
         * 上下文菜单控制器
         * @author lxm
         * @date 2023-08-21 10:56:24
         * @type {{ [p: string]: ContextMenuController }}
         */
        this.contextMenus = {};
        /**
         * 是否启用快速搜索
         * @author lxm
         * @date 2023-12-04 03:33:32
         * @type {boolean}
         */
        this.enableQuickSearch = false;
        /**
         * 拖入节点关系处理
         * @author lxm
         * @date 2023-12-14 03:05:38
         */
        this.dropNodeRss = new Map();
        /**
         * 节点上下文解析后信息`
         * @author lxm
         * @date 2023-12-29 10:38:37
         */
        this.contextMenuInfos = {};
    }
    get _evt() {
        return this.evt;
    }
    /**
     * @description 快速搜索提示分隔符
     * @readonly
     * @type {string}
     * @memberof TreeController
     */
    get searchPhSeparator() {
        if (this.controlParams.searchphseparator) {
            return this.controlParams.searchphseparator;
        }
        return ibiz.config.common.searchPhSeparator;
    }
    /**
     * @description 是否启用点击导航
     * @readonly
     * @type {boolean}
     * @memberof TreeController
     */
    get enableClickNav() {
        if (!ibiz.env.isMob)
            return true;
        if (this.controlParams.enableclicknav) {
            return this.controlParams.enableclicknav === 'true';
        }
        return ibiz.config.tree.enableClickNav;
    }
    /**
     * @description 面包屑显示模式
     * @readonly
     * @type {('DEFAULT' | 'HEADERSTYLE')}
     * @memberof TreeController
     */
    get crumbShowMode() {
        return this.controlParams.crumbshowmode || 'DEFAULT';
    }
    initState() {
        super.initState();
        // 根节点初始化
        this.state.defaultExpandedKeys = [];
        this.state.expandedKeys = [];
        this.state.navigational = false;
        this.state.size = 0;
        this.state.query = '';
        this.state.mobExpandedKey = '';
        this.state.counterData = {};
    }
    async onCreated() {
        await super.onCreated();
        this.state.expandedKeys = [...this.state.defaultExpandedKeys];
        this.initDropNodeRss();
        this.initViewScheduler();
        this.initNodeClickTBUIActionItem();
        await this.initQuickSearch();
        await this.initService();
        await this.initCounter();
        // 初始化上下文菜单控制器
        this.model.detreeNodes.forEach(node => {
            var _a, _b;
            if ((_b = (_a = node.decontextMenu) === null || _a === void 0 ? void 0 : _a.detoolbarItems) === null || _b === void 0 ? void 0 : _b.length) {
                this.contextMenus[node.decontextMenu.id] = new ContextMenuController(node.decontextMenu, this.context, this.params, this.ctx);
            }
        });
        // 上下文菜单控制器初始化
        await Promise.all(Object.values(this.contextMenus).map(menu => menu.created()));
    }
    /**
     * @description 初始化界面行为组
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof TreeController
     */
    async initUIActions() {
        // 收集所有遍历过程中的异步任务
        const asyncTasks = [];
        this.model.detreeNodes.forEach(node => {
            var _a, _b;
            if ((_b = (_a = node.decontextMenu) === null || _a === void 0 ? void 0 : _a.detoolbarItems) === null || _b === void 0 ? void 0 : _b.length) {
                // 初始化工具栏模型
                recursiveIterate(node.decontextMenu, (item) => {
                    const groupItem = item;
                    // 适配行为组展开模式及分组项配置了界面行为组
                    if (groupItem.groupExtractMode && groupItem.uiactionGroup) {
                        const calcTask = calcUIActionGroup(groupItem.uiactionGroup, this.context, this.params);
                        asyncTasks.push(calcTask);
                    }
                }, { childrenFields: ['detoolbarItems'] });
            }
        });
        // 所有上下文菜单
        await Promise.all(asyncTasks);
    }
    /**
     * @description 初始化部件视图逻辑
     * @protected
     * @memberof TreeController
     */
    initViewScheduler() {
        const viewLogics = this.model.appViewLogics || [];
        if (viewLogics.length !== 0) {
            this.viewScheduler = ibiz.scheduler.createViewScheduler(viewLogics);
            this.viewScheduler.defaultParamsCb = () => {
                return this.getEventArgs();
            };
            if (this.viewScheduler.hasViewEventTrigger) {
                // 监听视图事件触发视图事件触发器
                this.evt.onAll(async (_eventName, event) => {
                    await this.viewScheduler.triggerViewEvent(event);
                });
            }
        }
    }
    /**
     * 初始化快速搜索
     *
     * @protected
     * @memberof TreeController
     */
    async initQuickSearch() {
        var _a;
        const { detreeNodes } = this.model;
        if (detreeNodes) {
            // 快速搜索
            if (detreeNodes[0].enableQuickSearch) {
                this.enableQuickSearch = true;
            }
            // 支持快速搜索的节点
            const quickSearchNode = detreeNodes
                .filter(node => node.treeNodeType === 'DE' && node.enableQuickSearch)
                .map(node => node);
            const placeHolders = [];
            for (let index = 0; index < quickSearchNode.length; index++) {
                const { appDataEntityId, appId } = quickSearchNode[index];
                if (appDataEntityId) {
                    const dataEntity = await ibiz.hub.getAppDataEntity(appDataEntityId, appId);
                    const searchFields = (_a = dataEntity.appDEFields) === null || _a === void 0 ? void 0 : _a.filter(field => {
                        return field.enableQuickSearch;
                    });
                    searchFields === null || searchFields === void 0 ? void 0 : searchFields.forEach(searchField => {
                        if ((searchField === null || searchField === void 0 ? void 0 : searchField.lnlanguageRes) &&
                            searchField.lnlanguageRes.lanResTag) {
                            placeHolders.push(ibiz.i18n.t(searchField.lnlanguageRes.lanResTag, searchField.logicName));
                        }
                        else if (searchField === null || searchField === void 0 ? void 0 : searchField.logicName) {
                            placeHolders.push(searchField.logicName);
                        }
                    });
                }
            }
            if (placeHolders.length > 0) {
                // 使用set去重
                this.state.placeHolder = [...new Set(placeHolders)].join(this.searchPhSeparator);
            }
        }
    }
    /**
     * @description 生命周期-销毁完成
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof TreeController
     */
    async onDestroyed() {
        var _a, _b;
        await super.onDestroyed();
        (_a = this.counter) === null || _a === void 0 ? void 0 : _a.offChange(this.handleCounterChange);
        (_b = this.counter) === null || _b === void 0 ? void 0 : _b.destroy();
    }
    /**
     * 初始化对应类型的部件服务
     * @author lxm
     * @date 2023-12-21 11:25:33
     * @protected
     * @return {*}  {Promise<void>}
     */
    async initService() {
        this.service = new TreeService(this.model);
        await this.service.init(this.context);
    }
    /**
     * 初始化计数器
     * @author lxm
     * @date 2024-01-18 05:12:02
     * @protected
     * @return {*}  {Promise<void>}
     */
    async initCounter() {
        var _a;
        this.handleCounterChange = this.handleCounterChange.bind(this);
        if (this.state.isCounterDisabled)
            return;
        const { appCounterRefs } = this.model;
        const appCounterRef = appCounterRefs === null || appCounterRefs === void 0 ? void 0 : appCounterRefs[0];
        if (appCounterRef) {
            this.counter = await CounterService.getCounterByRef(appCounterRef, this.context, Object.assign({}, this.params));
        }
        (_a = this.counter) === null || _a === void 0 ? void 0 : _a.onChange(this.handleCounterChange);
    }
    /**
     * @description 处理计数器值变更
     * @protected
     * @param {IData} data
     * @memberof TreeController
     */
    handleCounterChange(data) {
        this.state.counterData = data;
    }
    /**
     * 初始化节点拖入关系处理
     * @author lxm
     * @date 2023-12-14 03:13:42
     * @protected
     */
    initDropNodeRss() {
        var _a;
        (_a = this.model.detreeNodes) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            // 代码表节点不可拖入，静态节点默认可拖入，动态节点允许拖入才可拖入
            if (node.treeNodeType === 'CODELIST' ||
                (node.treeNodeType === 'DE' && !node.allowDrop)) {
                return;
            }
            const infos = [];
            const nodeRSs = getChildNodeRSs(this.model, {
                parentId: node.id,
                hasQuery: false,
            });
            nodeRSs.forEach(nodeRS => {
                var _a;
                if ((_a = nodeRS.parentDER1N) === null || _a === void 0 ? void 0 : _a.pickupDEFName) {
                    const childNode = this.getNodeModel(nodeRS.childDETreeNodeId);
                    if ((childNode === null || childNode === void 0 ? void 0 : childNode.treeNodeType) === 'DE' && childNode.appDataEntityId) {
                        infos.push({
                            minorEntityId: childNode.appDataEntityId,
                            pickupDEFName: nodeRS.parentDER1N.pickupDEFName.toLowerCase(),
                            childDETreeNodeId: nodeRS.childDETreeNodeId,
                        });
                    }
                }
            });
            if (infos.length > 0) {
                this.dropNodeRss.set(node.id, infos);
            }
        });
    }
    /**
     * 初始化节点点击后触发的第一个常用操作的上下文菜单项
     * @author lxm
     * @date 2023-12-19 03:18:43
     * @protected
     */
    initNodeClickTBUIActionItem() {
        var _a;
        (_a = this.model.detreeNodes) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            var _a;
            const contextMenu = node.decontextMenu;
            if ((_a = contextMenu === null || contextMenu === void 0 ? void 0 : contextMenu.detoolbarItems) === null || _a === void 0 ? void 0 : _a.length) {
                let itemNum = 0;
                const items = [];
                recursiveIterate(contextMenu, (item) => {
                    if (item.itemType === 'DEUIACTION') {
                        itemNum += 1;
                        const uiItem = item;
                        if (uiItem.actionLevel === 200) {
                            items.push(uiItem);
                        }
                    }
                }, { childrenFields: ['detoolbarItems'] });
                this.contextMenuInfos[node.id] = {
                    onlyOneActionItem: itemNum === 1,
                    clickTBUIActionItem: items[0],
                };
            }
        });
    }
    /**
     * 树部件加载，从根节点开始重新加载
     *
     * @author lxm
     * @date 2022-08-19 14:08:50
     */
    async load(args = {}) {
        // 适配移动端搜索功能，移动端有展开节点的时候,刷新当前展开节点
        if (ibiz.env.isMob && this.state.mobExpandedKey) {
            const parentNode = this.getNodeData(this.state.mobExpandedKey);
            if (parentNode) {
                await this.refreshNodeChildren(parentNode);
                return parentNode._children;
            }
        }
        const isInitialLoad = args.isInitialLoad === true;
        const nodes = await this.loadNodes();
        await this.afterLoad(args, nodes);
        this.state.isLoaded = true;
        await this._evt.emit('onLoadSuccess', {
            isInitialLoad,
        });
        return nodes;
    }
    async getFetchParams(extraParams) {
        const params = await super.getFetchParams(extraParams);
        if (this.state.query) {
            params.query = this.state.query;
        }
        return params;
    }
    /**
     * 加载子节点数据
     *
     * @param {(ITreeNodeData | undefined)} parentNode
     * @returns {*}
     * @memberof TreeController
     */
    async loadNodes(parentNode, isLoadMore = false) {
        const params = await this.getFetchParams();
        const hasQuery = !!params.query;
        this.state.isLoading = true;
        let nodes;
        try {
            // 请求服务获取子节点数据
            const children = (await this.service.fetchChildNodes(parentNode, {
                context: this.context.clone(),
                params,
                hasQuery,
                isLoadMore,
                ctrl: this,
                view: this.view,
                defaultExpandedKeys: this.state.expandedKeys,
            })) || [];
            const targetNodes = [];
            children.forEach((child) => {
                var _a;
                const targetNode = (_a = this.model.detreeNodes) === null || _a === void 0 ? void 0 : _a.find((item) => {
                    return item.id === child._nodeId;
                });
                // 开启了排除重复值,并且配置了标识属性
                if (targetNode &&
                    targetNode.distinctMode &&
                    targetNode.idAppDEFieldId) {
                    // 同批次数据排重
                    const index = targetNodes.findIndex((item) => {
                        var _a, _b;
                        const id = targetNode.idAppDEFieldId;
                        if (id) {
                            return ((_a = item._deData) === null || _a === void 0 ? void 0 : _a[id]) === ((_b = child._deData) === null || _b === void 0 ? void 0 : _b[id]);
                        }
                        return false;
                    });
                    if (index < 0) {
                        targetNodes.push(child);
                    }
                }
                else {
                    targetNodes.push(child);
                }
            });
            nodes = targetNodes;
        }
        finally {
            this.state.isLoading = false;
        }
        // 有父节点绑定到父节点数据上，无父节点替换rootNodes
        if (parentNode) {
            if (isLoadMore) {
                parentNode._children = this.getLoadMoreNodes(parentNode, hasQuery);
            }
            else {
                parentNode._children = nodes;
            }
        }
        else {
            if (isLoadMore) {
                nodes.forEach(node => {
                    node._children = this.getLoadMoreNodes(node, hasQuery);
                });
            }
            this.state.rootNodes = nodes;
        }
        await this.afterLoadNodes(nodes);
        return nodes;
    }
    /**
     * loadNodes加载完子数据之后的处理
     * @author lxm
     * @date 2023-12-22 02:37:50
     * @param {ITreeNodeData[]} nodes 加载回来的子数据
     * @return {*}  {Promise<void>}
     */
    async afterLoadNodes(nodes) {
        // 更新items
        this.state.items = [];
        recursiveIterate({ _children: this.state.rootNodes }, (node) => {
            this.state.items.push(node);
        }, { childrenFields: ['_children'] });
        // 重新计算展开节点标识
        this.state.expandedKeys = this.calcExpandedKeys(nodes);
        this.calcSelectDataBySelectKey();
    }
    /**
     * 树节点点击事件
     *
     * @param {ITreeNodeData} nodeData
     * @returns {*}  {Promise<void>}
     * @memberof TreeController
     */
    async onTreeNodeClick(_nodeData, event) {
        var _a, _b;
        const nodeData = this.getNodeData(_nodeData._id);
        if (!nodeData)
            return;
        // 设置导航数据
        this.setNavData(nodeData);
        // 节点有配置常用操作的上下文菜单时，触发界面行为，后续逻辑都不走
        const clickActionItem = (_a = this.contextMenuInfos[nodeData._nodeId]) === null || _a === void 0 ? void 0 : _a.clickTBUIActionItem;
        const onlyOneActionItem = (_b = this.contextMenuInfos[nodeData._nodeId]) === null || _b === void 0 ? void 0 : _b.onlyOneActionItem;
        // 只有一个界面行为项，且是常用操作界面行为时，执行界面行为
        if (clickActionItem && onlyOneActionItem) {
            return this.doUIAction(clickActionItem.uiactionId, nodeData, event, clickActionItem.appId);
        }
        // 导航的时候，没有导航视图的时候，节点后续点击逻辑都不走，也不选中
        const nodeModel = this.getNodeModel(nodeData._nodeId);
        if (this.state.navigational && !(nodeModel === null || nodeModel === void 0 ? void 0 : nodeModel.navAppViewId)) {
            return;
        }
        // 不是导航树上的树，且不是内置导航模式，但是有配置导航视图的时候，直接打开导航视图
        if (this.enableClickNav &&
            !this.state.enableNavView &&
            !this.state.navigational &&
            (nodeModel === null || nodeModel === void 0 ? void 0 : nodeModel.navAppViewId)) {
            const resultContext = this.context.clone();
            const resultParams = Object.assign({}, this.params);
            const navContexts = [...(nodeModel.navigateContexts || [])];
            const navParams = [...(nodeModel.navigateParams || [])];
            const { tempContext, tempParams } = this.handleNavParams(navContexts, navParams, nodeData);
            Object.assign(resultContext, tempContext);
            Object.assign(resultParams, tempParams);
            await ibiz.commands.execute(OpenAppViewCommand.TAG, nodeModel === null || nodeModel === void 0 ? void 0 : nodeModel.navAppViewId, resultContext, resultParams, { ctx: this.view.getCtx(), event });
            return;
        }
        // 单选时，单击才会触发选中逻辑,禁止选择的时候不触发
        if (this.state.singleSelect && !nodeData._disableSelect)
            this.setSelection([nodeData]);
        // 激活事件
        if (this.state.mdctrlActiveMode === 1) {
            await this.setActive(nodeData);
        }
    }
    /**
     * @description 处理导航参数
     * @memberof TreeController
     */
    handleNavParams(navContexts, navParams, data) {
        // 处理自定义导航上下文
        const tempContext = convertNavData(navContexts, data, this.params, this.context);
        // 处理自定义导航参数
        const tempParams = convertNavData(navParams, data, this.params, this.context);
        return { tempContext, tempParams };
    }
    /**
     * 树节点数据变更事件处理
     * @author lxm
     * @date 2023-09-28 01:48:05
     * @param {ITreeNodeData} nodeData
     * @param {boolean} isExpand true为展开，false为折叠
     */
    onExpandChange(nodeData, isExpand) {
        nodeData.srfcollapsestate = isExpand ? 1 : 0;
        const hasKey = this.state.expandedKeys.includes(nodeData._id);
        if (isExpand && !hasKey) {
            this.state.expandedKeys.push(nodeData._id);
        }
        else if (!isExpand && hasKey) {
            const index = this.state.expandedKeys.indexOf(nodeData._id);
            if (index !== -1) {
                this.state.expandedKeys.splice(index, 1);
            }
        }
    }
    /**
     * 树节点双击事件
     * @author lxm
     * @date 2023-05-29 10:01:36
     * @param {ITreeNodeData} nodeData
     * @return {*}  {Promise<void>}
     */
    async onDbTreeNodeClick(_nodeData) {
        const nodeData = this.getNodeData(_nodeData._id);
        if (!nodeData)
            return;
        // 多选时，双击节点才选中数据
        if (!this.state.singleSelect && !nodeData._disableSelect)
            this.setSelection([nodeData]);
        if (this.state.mdctrlActiveMode === 2) {
            await this.setActive(nodeData);
        }
    }
    setActive(item) {
        const nodeParams = this.parseTreeNodeData(item);
        return this._evt.emit('onActive', Object.assign(Object.assign({}, nodeParams), { nodeData: item }));
    }
    setSelection(selection) {
        // todo 当自己点选中时，父节点选不选中，如果选中需要在这边优化
        // 通过id过滤出原始的树节点数据，避免外部使用的时候传入的选中数据有问题。
        const selectionIds = selection.map(item => item._id);
        const filterArr = this.state.items.filter(item => selectionIds.includes(item._id));
        super.setSelection(filterArr);
    }
    /**
     * 获取节点模型
     * @author lxm
     * @date 2023-07-27 10:47:58
     * @param {string} id
     * @return {*}  {(IDETreeNode | undefined)}
     */
    getNodeModel(id) {
        var _a;
        return (_a = this.model.detreeNodes) === null || _a === void 0 ? void 0 : _a.find(item => item.id === id);
    }
    /**
     * 通过标识获取节点数据
     * @author lxm
     * @date 2023-12-22 02:21:38
     * @param {string} key 可以是节点_id也可以是_uuid
     * @return {*}  {(ITreeNodeData | undefined)}
     */
    getNodeData(key) {
        const find = this.state.items.find(item => item._id === key);
        if (find)
            return find;
        return this.state.items.find(item => item._uuid === key);
    }
    /**
     * 执行界面行为
     *
     * @author chitanda
     * @date 2023-12-07 15:12:26
     * @param {string} uiActionId
     * @param {ITreeNodeData} nodeData
     * @param {MouseEvent} event
     * @param {string} appId
     * @return {*}  {Promise<void>}
     */
    async doUIAction(uiActionId, nodeData, event, appId) {
        var _a;
        const eventArgs = this.getEventArgs();
        const nodeParams = this.parseTreeNodeData(nodeData);
        const result = await UIActionUtil.exec(uiActionId, Object.assign(Object.assign(Object.assign({}, eventArgs), nodeParams), { event, noWaitRoute: true }), appId);
        if (result.closeView) {
            this.view.closeView();
        }
        else if (result.refresh) {
            switch (result.refreshMode) {
                // 刷新当前节点的子
                case 1:
                    this.refreshNodeChildren(nodeData);
                    break;
                // 刷新当前节点的父节点的子
                case 2:
                    this.refreshNodeChildren(nodeData, true);
                    break;
                // 刷新所有节点数据
                case 3:
                    this.refresh();
                    break;
                default:
            }
        }
        // 异步行为处理
        const action = await getUIActionById(uiActionId, appId);
        if ((action.asyncAction && !result.cancel) ||
            ((_a = action.uiactionParamJO) === null || _a === void 0 ? void 0 : _a.srfasyncaction)) {
            if (!event || !event.target) {
                return;
            }
            await ibiz.util.anime.moveAndResize(event.target, `#${PresetIdentifier.MESSAGE}`);
        }
    }
    /**
     * 解析树节点获取通用数据，和完整的上下文和视图参数。
     * @author lxm
     * @date 2023-08-09 11:45:34
     * @protected
     * @param {ITreeNodeData} nodeData
     */
    parseTreeNodeData(nodeData) {
        let tempData = null;
        if (nodeData._nodeType === 'DE') {
            tempData = nodeData;
        }
        else {
            tempData = Object.assign(Object.assign({}, nodeData), (nodeData._deData || {}));
        }
        return {
            data: [tempData],
            context: Object.assign(this.context.clone(), nodeData._context || {}),
            params: Object.assign(Object.assign({}, this.params), (nodeData._params || {})),
        };
    }
    /**
     * 计算展开节点集合(根据加载的子节点计算所有的展开节点标识集合)
     * @author lxm
     * @date 2023-08-09 05:19:36
     * @param {ITreeNodeData[]} nodes
     * @param {boolean} [isRoot=false]
     * @return {*}  {string[]}
     */
    calcExpandedKeys(nodes) {
        // 用户操作的添加的要保留
        let expandedKeys = [...this.state.expandedKeys];
        // 计算加载回来的里面带的默认展开
        recursiveIterate({ _children: nodes }, (node) => {
            var _a;
            if ((_a = node._children) === null || _a === void 0 ? void 0 : _a.length) {
                expandedKeys.push(node._id);
            }
        }, { childrenFields: ['_children'] });
        // 去重
        expandedKeys = Array.from(new Set(expandedKeys));
        return expandedKeys;
    }
    /**
     * 刷新指定树节点的子节点数据
     * @author lxm
     * @date 2023-08-23 08:23:59
     * @param {(ITreeNodeData | IData)} nodeData 指定树节点数据，可以是节点数据，也可以是对应的实体数据
     * @param {boolean} [refreshParent=false] 是否是刷新给定节点数据的父节点的子节点数据
     * @return {*}  {Promise<void>}
     */
    async refreshNodeChildren(nodeData, refreshParent = false) {
        const key = nodeData.srfkey ? 'srfkey' : '_id';
        const currentNode = this.state.items.find(item => item[key] === nodeData[key]);
        if (!currentNode) {
            ibiz.log.error(ibiz.i18n.t('runtime.controller.control.tree.noFoundTreeData'), nodeData);
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
        const targetNode = refreshParent ? currentNode._parent : currentNode;
        const nodes = await this.loadNodes(targetNode);
        this._evt.emit('onAfterRefreshParent', {
            parentNode: targetNode,
            children: nodes,
        });
    }
    async expandNodeByKey(expandKeys) {
        const noExpandKeys = expandKeys.filter(key => !this.state.expandedKeys.includes(key));
        if (noExpandKeys.length === 0) {
            return;
        }
        // 找到已存在的要展开的节点
        const existNodes = this.state.items.filter(item => noExpandKeys.includes(item._id));
        // 补充所有未展开的节点标识，查询过程中会自动加载后续展开
        this.state.expandedKeys.push(...noExpandKeys);
        if (existNodes.length === 0) {
            return;
        }
        // 展开加载节点
        await Promise.all(existNodes.map(node => {
            return this.loadNodes(node);
        }));
    }
    /**
     * 计算是否允许拖动
     * @author lxm
     * @date 2023-12-14 11:28:07
     * @param {ITreeNodeData} draggingNode
     * @return {*}  {boolean}
     */
    calcAllowDrag(draggingNode) {
        const nodeModel = this.getNodeModel(draggingNode._nodeId);
        return (nodeModel === null || nodeModel === void 0 ? void 0 : nodeModel.allowDrag) === true;
    }
    /**
     * 验证是否可拖入
     *
     * - 放入节点不能是拖拽节点或其子项，以免造成异常递归问题
     *
     * @protected
     * @param {ITreeNodeData} draggingNode 拖拽节点
     * @param {ITreeNodeData} dropNode 放入节点
     * @return {*}  {boolean}
     * @memberof TreeController
     */
    validateDrop(draggingNode, dropNode) {
        let state = true;
        recursiveIterate({ _children: [draggingNode] }, (node) => {
            if (node._id === dropNode._id) {
                state = false;
                return true;
            }
        }, { childrenFields: ['_children'] });
        return state;
    }
    /**
     * 计算是否允许拖入
     * @author lxm
     * @date 2023-12-14 02:04:15
     * @param {ITreeNodeData} draggingNode
     * @param {ITreeNodeData} dropNode
     * @param {('inner' | 'prev' | 'next')} type
     * @return {*}  {boolean}
     */
    calcAllowDrop(draggingNode, dropNode, type) {
        var _a, _b;
        if (!this.validateDrop(draggingNode, dropNode))
            return false;
        const draggingNodeModel = this.getNodeModel(draggingNode._nodeId);
        const dropNodeModel = this.getNodeModel(dropNode._nodeId);
        // * 移入的情况
        if (type === 'inner') {
            return !!this.findDropNodeRS(dropNode._nodeId, draggingNodeModel.appDataEntityId);
        }
        else {
            // * 前后的情况，不同实体之间不能排序
            if (draggingNodeModel.appDataEntityId !== dropNodeModel.appDataEntityId) {
                return false;
            }
        }
        // 父相同的情况下,就是排序，看当前节点是否能排序
        if (((_a = draggingNode._parent) === null || _a === void 0 ? void 0 : _a._id) === ((_b = dropNode._parent) === null || _b === void 0 ? void 0 : _b._id)) {
            const currentNodeModel = this.getNodeModel(dropNode._nodeId);
            return (currentNodeModel === null || currentNodeModel === void 0 ? void 0 : currentNodeModel.allowOrder) === true;
        }
        // 没有父就是根节点，根节点没有上层关系，无法换父
        if (!dropNode._parent) {
            return false;
        }
        // 父不一样的时候需要判断能否移入到对方的父节点内
        return !!this.findDropNodeRS(dropNode._parent._nodeId, draggingNodeModel.appDataEntityId);
    }
    /**
     * 找到指定父节点下的节点关系里面
     * 配置的实体关系的子实体是指定实体的
     * @author lxm
     * @date 2023-12-14 01:43:41
     * @protected
     * @param {string} parentId 父节点模型id
     * @param {string} appDataEntityId
     * @return {*}  {(IDETreeNodeRS | undefined)}
     */
    findDropNodeRS(parentId, appDataEntityId) {
        const nodeRSs = this.dropNodeRss.get(parentId);
        return nodeRSs === null || nodeRSs === void 0 ? void 0 : nodeRSs.find(item => item.minorEntityId === appDataEntityId);
    }
    /**
     * 处理节点拖入事件
     * @author lxm
     * @date 2023-12-15 04:23:29
     * @param {ITreeNodeData} draggingNode
     * @param {ITreeNodeData} dropNode
     * @param {('inner' | 'prev' | 'next')} dropType
     * @return {*}  {Promise<void>}
     */
    async onNodeDrop(draggingNode, dropNode, dropType) {
        var _a, _b;
        if (dropType === 'inner' &&
            !dropNode._leaf &&
            dropNode._children === undefined) {
            await this.expandNodeByKey([dropNode._id]);
        }
        const draggingNodeModel = this.getNodeModel(draggingNode._nodeId);
        const dropInNode = dropType === 'inner' ? dropNode : dropNode._parent;
        const isChangedParent = dropType === 'inner' ||
            ((_a = dropNode._parent) === null || _a === void 0 ? void 0 : _a._id) !== ((_b = draggingNode._parent) === null || _b === void 0 ? void 0 : _b._id);
        let orderNodeModel = this.getNodeModel(dropNode._nodeId);
        const isEntityChange = draggingNodeModel.appDataEntityId !== orderNodeModel.appDataEntityId;
        // * 处理切换父节点
        if (isChangedParent) {
            const dropNodeRs = this.findDropNodeRS(dropInNode._nodeId, draggingNodeModel.appDataEntityId);
            if (dropNodeRs) {
                // 修改关系属性的值为父节点的主键和树节点id
                draggingNode._deData[dropNodeRs.pickupDEFName] =
                    dropInNode._nodeType === 'STATIC' ? null : dropInNode._value;
                orderNodeModel = this.getNodeModel(dropNodeRs.childDETreeNodeId);
            }
            // 维护拖拽的节点和其子孙的展开，维护拖入节点的展开
            this.state.expandedKeys = this.calcExpandedKeys([dropInNode]);
            await this.updateDeNodeData([draggingNode]);
        }
        // 拖入节点或实体不同时刷新父节点
        if (dropType === 'inner' || isEntityChange) {
            if (isChangedParent) {
                await this.refreshNodeChildren(draggingNode, true);
            }
            await this.refreshNodeChildren(dropInNode, true);
        }
        else {
            // 移动排序
            const { moveAppDEActionId, appDataEntityId, allowOrder } = orderNodeModel;
            if (allowOrder) {
                if (!moveAppDEActionId) {
                    throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.common.md.noMoveDataCconfig'));
                }
                const moveParams = {
                    srftargetkey: dropNode.srfkey,
                    srfmovetype: dropType === 'prev' ? 'MOVEBEFORE' : 'MOVEAFTER',
                };
                const app = ibiz.hub.getApp(this.context.srfappid);
                const deName = calcDeCodeNameById(appDataEntityId);
                const tempContext = this.context.clone();
                tempContext[deName] = draggingNode.srfkey;
                try {
                    const res = await app.deService.exec(appDataEntityId, moveAppDEActionId, tempContext, moveParams);
                    if (res.ok) {
                        this.emitDEDataChange('update', draggingNode._deData);
                        if (isChangedParent) {
                            await this.refreshNodeChildren(draggingNode, true);
                        }
                        await this.refreshNodeChildren(dropInNode);
                    }
                }
                catch (error) {
                    // 拖动失败重置位置
                    await this.refreshNodeChildren(dropInNode);
                    this.actionNotification('DROPERROR', {
                        error: error,
                    });
                }
            }
        }
        // *通知界面修改移入的父节点的子节点数据
        this._evt.emit('onAfterNodeDrop', { isChangedParent });
    }
    /**
     * 更新实体节点数据
     * @author lxm
     * @date 2023-12-15 04:19:36
     * @protected
     * @param {ITreeNodeData[]} nodeDatas 节点数据集合
     * @return {*}  {Promise<void>}
     */
    async updateDeNodeData(nodeDatas) {
        const app = ibiz.hub.getApp(this.context.srfappid);
        await Promise.all(nodeDatas.map(async (node) => {
            const model = this.getNodeModel(node._nodeId);
            let deData = node._deData;
            if (node._changedOnly) {
                deData = node.getDiffData();
            }
            // 往上下文添加主键
            const deName = calcDeCodeNameById(model.appDataEntityId);
            const tempContext = this.context.clone();
            tempContext[deName] = deData.srfkey;
            // 调用接口修改数据
            const res = await app.deService.exec(model.appDataEntityId, model.updateAppDEActionId || 'update', tempContext, deData);
            // 更新完之后更新state里的数据。
            if (res.ok) {
                node._deData = res.data;
                node._oldDeData = res.data.clone();
                // 通知实体数据变更
                this.emitDEDataChange('update', node._deData);
            }
        }));
    }
    /**
     * 修改节点文本
     * @author lxm
     * @date 2023-12-15 04:32:52
     * @param {ITreeNodeData} nodeData
     * @param {string} text
     * @return {*}  {Promise<void>}
     */
    async modifyNodeText(nodeData, text) {
        const model = this.getNodeModel(nodeData._nodeId);
        if (!model.allowEditText) {
            throw new RuntimeModelError(model, ibiz.i18n.t('runtime.controller.control.tree.editMode'));
        }
        if (nodeData._nodeType !== 'DE') {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.tree.nodeData'));
        }
        nodeData._text = text;
        await this.updateDeNodeData([nodeData]);
    }
    /**
     * @description 处理项删除
     * @param {IData} item
     * @param {IContext} context
     * @param {IParams} params
     * @returns {*}  {Promise<boolean>}
     * @memberof TreeController
     */
    async handleItemRemove(item, context, params) {
        let needRefresh = false;
        const treeNode = this.getNodeModel(item._nodeId);
        if (!treeNode) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.tree.noFoundTreeNode'));
        }
        const nodeAppDataEntityId = treeNode.appDataEntityId;
        if (nodeAppDataEntityId) {
            const deName = calcDeCodeNameById(nodeAppDataEntityId);
            if (item.srfuf !== Srfuf.CREATE) {
                const tempContext = context.clone();
                tempContext[deName] = item.srfkey;
                // 删除后台的数据
                await this.service.removeItem(nodeAppDataEntityId, tempContext, params, treeNode.removeAppDEActionId);
                needRefresh = true;
            }
        }
        return needRefresh;
    }
    /**
     * 检测实体数据变更
     *
     * @author tony001
     * @date 2024-03-28 18:03:09
     * @protected
     * @param {IPortalMessage} msg
     * @return {*}  {void}
     */
    onDEDataChange(msg) {
        // msg.triggerKey 不为空，且与当前控制器的triggerKey一致时，则不处理
        if (!isNil(msg.triggerKey) && msg.triggerKey === this.triggerKey) {
            return;
        }
        // 新增数据不刷新
        if (msg.subtype === 'OBJECTCREATED') {
            return;
        }
        const data = msg.data;
        const findNode = this.state.items.find(item => item._nodeType === 'DE' &&
            item._deData &&
            data &&
            item._deData.srfdecodename === data.srfdecodename &&
            item._deData.srfkey === data.srfkey);
        if (!findNode) {
            return;
        }
        this.doNextActive(() => !this.ctx.isDestroyed && this.refreshNodeChildren(findNode, true), {
            key: `refresh${findNode._id}`,
        });
    }
    /**
     * @description 切换折叠，tag=指定分组标识(不传则全部)，expand=目标状态(不传则反转)
     * @param {{ tag?: string; expand?: boolean }} [params={}]
     * @memberof TreeController
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
        else if (this.state.rootNodes.length > 0) {
            // 全部展开只对第一层节点生效
            if (expand) {
                const { _children = [] } = this.state.rootNodes[0];
                this.state.expandedKeys = _children.map(x => x.srfnodeid);
            }
            else {
                this.state.expandedKeys = [];
            }
        }
    }
    /**
     * 新建树节点
     *
     * @author tony001
     * @date 2024-12-24 17:12:00
     * @param {IApiNewTreeNodeParams} _params 新建树节点需要的参数
     */
    newTreeNode(_params) {
        const { parentKey = '', nodeType, defaultValue = {} } = _params;
        const nodeModel = this.getNodeModel(nodeType);
        const parentNodeData = this.getNodeData(parentKey);
        if (!nodeModel) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.control.tree.noFoundTreeNode'));
        }
        this._evt.emit('onNewTreeNode', {
            nodeModel,
            parentNodeData,
            defaultValue,
        });
    }
    /**
     * 新建树节点数据
     *
     * @author tony001
     * @date 2024-12-24 18:12:31
     * @param {IData[]} nodeDatas
     * @return {*}  {Promise<void>}
     */
    async createDeNodeData(nodeDatas) {
        const app = ibiz.hub.getApp(this.context.srfappid);
        await Promise.all(nodeDatas.map(async (node) => {
            const model = this.getNodeModel(node._nodeId);
            const _deData = node._deData;
            const tempContext = this.context.clone();
            const res = await app.deService.exec(model.appDataEntityId, 'create', tempContext, _deData);
            // 更新完之后更新state里的数据。
            if (res.data) {
                this.refresh();
            }
        }));
    }
    /**
     * @description 获取加载更多信息项
     * @param {string} id
     * @returns {*}  {(LoadMoreInfoItem[] | undefined)}
     * @memberof TreeController
     */
    getLoadMoreInfoItems(id) {
        return this.service.loadMoreMap[id];
    }
    /**
     * @description 获取加载更多最终节点数据
     * @param {ITreeNodeData} parentNode
     * @param {boolean} hasQuery
     * @returns {*}  {ITreeNodeData[]}
     * @memberof TreeController
     */
    getLoadMoreNodes(parentNode, hasQuery) {
        const items = [];
        const infoItems = this.getLoadMoreInfoItems(parentNode._id);
        if (infoItems) {
            const childNodeRSs = getChildNodeRSs(this.model, {
                parentId: parentNode._nodeId,
                hasQuery,
            });
            childNodeRSs === null || childNodeRSs === void 0 ? void 0 : childNodeRSs.forEach(item => {
                const nodeModel = getTreeNode(this.model, item.childDETreeNodeId);
                if (!nodeModel) {
                    return;
                }
                const infoItem = infoItems.find(_item => _item.nodeModelId === nodeModel.id);
                if (!infoItem) {
                    return;
                }
                items.push(...(infoItem.items || []));
            });
        }
        const targetNodes = [];
        items.forEach((child) => {
            var _a;
            const targetNode = (_a = this.model.detreeNodes) === null || _a === void 0 ? void 0 : _a.find((item) => {
                return item.id === child._nodeId;
            });
            // 开启了排除重复值,并且配置了标识属性
            if (targetNode &&
                targetNode.distinctMode &&
                targetNode.idAppDEFieldId) {
                // 同批次数据排重
                const index = targetNodes.findIndex((item) => {
                    var _a, _b;
                    const id = targetNode.idAppDEFieldId;
                    if (id) {
                        return ((_a = item._deData) === null || _a === void 0 ? void 0 : _a[id]) === ((_b = child._deData) === null || _b === void 0 ? void 0 : _b[id]);
                    }
                    return false;
                });
                if (index < 0) {
                    targetNodes.push(child);
                }
            }
            else {
                targetNodes.push(child);
            }
        });
        return targetNodes;
    }
    /**
     * @description 打开编辑数据视图
     * @param {ITreeNodeData} node
     * @param {MouseEvent} [event]
     * @returns {*}  {Promise<IUIActionResult>}
     * @memberof TreeController
     */
    async openData(item, event) {
        var _a;
        const nodeModel = this.getNodeModel(item._nodeId);
        if (!nodeModel) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.tree.noFoundTreeNode'));
        }
        const { context, params, data } = this.parseTreeNodeData(item);
        const { appDataEntityId } = nodeModel;
        if (!appDataEntityId)
            return { cancel: true };
        const deName = calcDeCodeNameById(appDataEntityId);
        context[deName.toLowerCase()] = item.srfkey;
        context.srfnavctrlid = this.ctrlId;
        const result = await ((_a = this.viewScheduler) === null || _a === void 0 ? void 0 : _a.triggerCustom(`${nodeModel.id.toLowerCase()}_opendata`, {
            data,
            event,
            params,
            context,
            view: this.view,
            ctrl: this,
        }));
        if (result === -1) {
            ibiz.log.error(ibiz.i18n.t('runtime.engine.logicOpendata'));
            return {
                cancel: true,
            };
        }
        return {
            cancel: result ? !result.ok : true,
        };
    }
    /**
     * @description 打开新建编辑视图
     * @param {ITreeNodeData} node
     * @param {MouseEvent} [event]
     * @returns {*}  {Promise<IUIActionResult>}
     * @memberof TreeController
     */
    async newData(item, event) {
        var _a;
        const nodeModel = this.getNodeModel(item._nodeId);
        if (!nodeModel) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.tree.noFoundTreeNode'));
        }
        const { context, params, data } = this.parseTreeNodeData(item);
        context.srfnavctrlid = this.ctrlId;
        const result = await ((_a = this.viewScheduler) === null || _a === void 0 ? void 0 : _a.triggerCustom(`${item._nodeId.toLowerCase()}_newdata`, {
            data,
            event,
            params,
            context,
            view: this.view,
            ctrl: this,
        }));
        if (result === -1) {
            ibiz.log.error(ibiz.i18n.t('runtime.engine.logicNewdata'));
            return {
                cancel: true,
            };
        }
        return {
            cancel: result ? !result.ok : true,
        };
    }
    /**
     * @description 跳转第一页
     * @returns {*}  {Promise<IData[]>}
     * @memberof TreeController
     */
    async goToFirstPage() {
        return [];
    }
    /**
     * @description 跳转上一页
     * @returns {*}  {Promise<IData[]>}
     * @memberof TreeController
     */
    async goToPreviousPage() {
        return [];
    }
    /**
     * @description 跳转下一页
     * @returns {*}  {Promise<IData[]>}
     * @memberof TreeController
     */
    async goToNextPage() {
        return [];
    }
    /**
     * @description 跳转最后一页
     * @returns {*}  {Promise<IData[]>}
     * @memberof TreeController
     */
    async goToLastPage() {
        return [];
    }
    /**
     * @description 更新UI
     * @memberof TreeController
     */
    updateUI() {
        this._evt.emit('onUpdateUI', undefined);
    }
    /**
     * @description 转换各类多语言
     * @protected
     * @memberof TreeController
     */
    convertMultipleLanguages() {
        const { detreeNodes = [], emptyTextLanguageRes, emptyText } = this.model;
        if (emptyTextLanguageRes === null || emptyTextLanguageRes === void 0 ? void 0 : emptyTextLanguageRes.lanResTag) {
            this.model.emptyText = ibiz.i18n.t(emptyTextLanguageRes.lanResTag, emptyText);
        }
        detreeNodes.forEach((item) => {
            var _a;
            // 只转化静态节点多语言
            if (item.treeNodeType === 'STATIC' && ((_a = item.nameLanguageRes) === null || _a === void 0 ? void 0 : _a.lanResTag)) {
                item.name = ibiz.i18n.t(item.nameLanguageRes.lanResTag, item.name);
                item.text = ibiz.i18n.t(item.nameLanguageRes.lanResTag, item.text);
            }
        });
    }
}
