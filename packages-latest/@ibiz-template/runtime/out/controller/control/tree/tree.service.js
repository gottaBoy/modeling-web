/* eslint-disable no-nested-ternary */
import { ModelError } from '@ibiz-template/core';
import { getRootNode, getChildNodeRSs, getTreeNode, calcDeCodeNameById, findDELogic, } from '../../../model';
import { MDControlService, TreeStaticNodeData, TreeDataSetNodeData, TreeCodeListNodeData, AppDataEntity, } from '../../../service';
import { ScriptFactory, calcNavParams, handleAllSettled } from '../../../utils';
import { execDELogicAction } from '../../../de-logic';
/**
 * 树部件服务
 * @author lxm
 * @date 2023-05-15 09:53:35
 * @export
 * @class GridService
 * @extends {MDControlService<IDETree>}
 */
export class TreeService extends MDControlService {
    constructor() {
        super(...arguments);
        /**
         * @description 加载更多信息项映射
         * @type {{
         *     [parentDataId: string]: LoadMoreInfoItem[];
         *   }}
         * @memberof TreeService
         */
        this.loadMoreMap = {};
    }
    /**
     * 获取子节点数据
     *
     * @param {ITreeNodeData} [parentNodeData] 父节点数据
     * @param {boolean} [hasQuery=false] 是否搜索
     * @returns {*}
     * @memberof TreeService
     */
    async fetchChildNodes(parentNodeData, opts) {
        const { hasQuery } = opts;
        let childrenNodes = [];
        if (!parentNodeData) {
            // 没有父节点的加载根节点数据
            const rootNode = getRootNode(this.model);
            childrenNodes = await this.fetchNodeDatasByType(rootNode, undefined, undefined, opts);
        }
        else {
            // 有父节点的计算节点关系查询对应节点数据并合并
            const childNodeRSs = getChildNodeRSs(this.model, {
                parentId: parentNodeData === null || parentNodeData === void 0 ? void 0 : parentNodeData._nodeId,
                hasQuery,
            });
            if (childNodeRSs.length === 0) {
                return;
            }
            const results = await handleAllSettled(childNodeRSs.map(async (childNodeRS) => {
                const childNode = getTreeNode(this.model, childNodeRS.childDETreeNodeId);
                return this.fetchNodeDatasByType(childNode, childNodeRS, parentNodeData, opts);
            }), false);
            results.forEach(result => {
                childrenNodes.push(...result);
            });
        }
        return childrenNodes;
    }
    /**
     * 通过节点类型加载节点数据
     * @author lxm
     * @date 2023-08-09 03:22:47
     * @protected
     * @param {IDETreeNode} nodeModel 节点模型
     * @param {(IDETreeNodeRS | undefined)} nodeRS 与上层节点的节点关系
     * @param {(ITreeNodeData | undefined)} parentNodeData 上层节点数据
     * @param {TreeFetchOpts} opts 额外参数
     * @return {*}  {Promise<ITreeNodeData[]>}
     */
    async fetchNodeDatasByType(nodeModel, nodeRS, parentNodeData, opts) {
        // 有没有下级
        const leaf = getChildNodeRSs(this.model, {
            parentId: nodeModel.id,
            hasQuery: opts.hasQuery,
        }).length === 0;
        const tempOpts = Object.assign(Object.assign({}, opts), { leaf });
        // 根据类型查询节点数据
        let result = [];
        // 通过统一资源标识计算权限
        if (nodeModel.accessKey) {
            const permitted = this.app.authority.calcByResCode(nodeModel.accessKey);
            if (!permitted) {
                return result;
            }
        }
        // 如果父节点是叶子节点，那么子节点不加载
        if (parentNodeData && parentNodeData._leaf) {
            return result;
        }
        switch (nodeModel.treeNodeType) {
            case 'STATIC':
                {
                    const nodeData = await this.getStaticNodeData(nodeModel, nodeRS, parentNodeData, tempOpts);
                    result = [nodeData];
                }
                break;
            case 'DE':
                result = await this.getDENodeDatas(nodeModel, nodeRS, parentNodeData, tempOpts);
                break;
            case 'CODELIST':
                result = await this.getCodeListNodeDatas(nodeModel, nodeRS, parentNodeData, tempOpts);
                break;
            default:
                throw new ModelError(nodeModel, ibiz.i18n.t('runtime.controller.control.gantt.noSupport', {
                    treeNodeType: nodeModel.treeNodeType,
                }));
        }
        // *查询回来之后,如果有子节点，看默认展开相关配置有时每个节点数据走一遍展开逻辑
        const { rootNode } = nodeModel;
        const isExpandedRoot = rootNode && !this.model.rootVisible; // root节点不显示的时候默认展开其子节点
        if (!leaf) {
            await Promise.all(result.map(async (childNode, index) => {
                var _a;
                if (this.calcExpand(nodeModel, index) ||
                    (((_a = opts.defaultExpandedKeys) === null || _a === void 0 ? void 0 : _a.length) &&
                        opts.defaultExpandedKeys.includes(childNode._id)) || // 外部回显给的默认展开节点集合有的展开
                    isExpandedRoot) {
                    const subChildrenNodes = await this.fetchChildNodes(childNode, opts);
                    childNode._children = subChildrenNodes;
                }
            }));
        }
        return result;
    }
    /**
     * 获取静态节点数据
     *
     * @protected
     * @param {TreeStaticNodeModel} nodeModel
     * @param {boolean} [hasQuery=false]
     * @returns {*}
     * @memberof TreeService
     */
    async getStaticNodeData(nodeModel, nodeRS, parentNodeData, opts) {
        const defaultExpand = this.calcStaticExpand(nodeModel);
        const nodeData = new TreeStaticNodeData(nodeModel, parentNodeData, {
            parentValueLevel: nodeRS === null || nodeRS === void 0 ? void 0 : nodeRS.parentValueLevel,
            leaf: !!opts.leaf,
            defaultExpand,
        });
        return nodeData;
    }
    /**
     * 获取节点关系过滤的上下文和视图参数
     *
     * @param {TreeNodeRSModel} nodeRS 节点关系模型
     * @param {(ITreeNodeData | undefined)} parentNodeData 父节点数据
     * @returns {*}  {(IParams | undefined)}
     * @memberof TreeService
     */
    getNodeRSFilterParams(nodeRS, parentNodeData, opts) {
        // 处理父值过滤项
        const { parentValueLevel, navigateContexts: navContexts, navigateParams: navParams, parentFilter: navFilter, parentDER1N, } = nodeRS;
        const pickupDEFName = parentDER1N === null || parentDER1N === void 0 ? void 0 : parentDER1N.pickupDEFName;
        const params = Object.assign({}, opts.params);
        // 合并部件上下文和父节点资源上下文
        const context = Object.assign(Object.assign({}, opts.context), ((parentNodeData === null || parentNodeData === void 0 ? void 0 : parentNodeData._context) || {}));
        // 计算关系过滤用到的实体数据
        let data = {};
        let parentData;
        // 根据父值级别查找父数据
        if (parentNodeData) {
            parentData = parentNodeData;
            for (let index = 1; index < parentValueLevel; index++) {
                parentData = parentData === null || parentData === void 0 ? void 0 : parentData._parent;
            }
        }
        let derValue;
        let deName;
        if (parentData) {
            data = parentData._deData || {};
            const parentNodeModel = getTreeNode(this.model, parentData._nodeId);
            if (parentNodeModel && parentNodeModel.appDataEntityId) {
                deName = calcDeCodeNameById(parentNodeModel.appDataEntityId);
            }
            derValue = parentData._value;
            // 附加父节点的父节点数据主键
            if (parentData._parentValue) {
                Object.assign(data, { srfparentkey: parentData._parentValue });
            }
        }
        // 导航相关参数处理
        const { resultContext, resultParams } = calcNavParams({
            deName,
            navFilter: navFilter ? `n_${navFilter.toLowerCase()}_eq` : undefined,
            pickupDEFName,
            navParams,
            navContexts,
        }, { derValue, context, params, data });
        Object.assign(context, resultContext);
        Object.assign(params, resultParams);
        return {
            context,
            params,
            navContext: resultContext,
            navParams: resultParams,
        };
    }
    /**
     * 获取实体数据集数据
     *
     * @protected
     * @param {TreeNodeRSModel} nodeRS
     * @param {TreeFetchOpts} opts
     * @returns {*}
     * @memberof TreeService
     */
    async getDENodeDatas(nodeModel, nodeRS, parentNodeData, opts) {
        const { appId, dataSourceType, appDataEntityId, enableQuickSearch } = nodeModel;
        // 处理查询参数,没有关系的时候不处理参数了
        const { context, params, navContext, navParams } = nodeRS
            ? this.getNodeRSFilterParams(nodeRS, parentNodeData, opts)
            : {
                context: opts.context,
                params: opts.params,
                navContext: {},
                navParams: {},
            };
        // 设置查询长度
        params.size = nodeModel.maxSize || 1000;
        this.initPageParams(nodeModel, parentNodeData, opts, params);
        // 排序属性
        if (nodeModel.sortAppDEFieldId) {
            Object.assign(params, {
                sort: `${nodeModel.sortAppDEFieldId.toLowerCase()},${nodeModel.sortDir ? nodeModel.sortDir.toLowerCase() : 'asc'}`,
            });
        }
        // 树节点未启用快速搜索时不携带快速查询参数query
        if (opts.hasQuery && !enableQuickSearch) {
            delete params.query;
        }
        // 更正应用标识(适配多应用树合并)
        context.srfappid = appId;
        opts.context = context;
        opts.params = params;
        let result = [];
        switch (dataSourceType) {
            case 'DEACTION':
                result = await this.getDENodeDatasByDEAction(nodeModel, parentNodeData, opts);
                break;
            case 'DELOGIC':
                result = await this.getDENodeDatasByDELogic(nodeModel, parentNodeData, opts);
                break;
            case 'PARENTDATAPARAM':
            case 'APPGLOBALPARAM':
            case 'TOPVIEWSESSIONPARAM':
            case 'VIEWSESSIONPARAM':
                result = await this.getDENodeDatasByParams(nodeModel, parentNodeData, opts);
                break;
            case 'CUSTOM':
                result = await this.getDENodeDatasByCustom(nodeModel, parentNodeData, opts);
                break;
            case 'DEDATASET':
            default:
                result = await this.getDENodeDatasByDEDataset(nodeModel, parentNodeData, opts);
                break;
        }
        if (result.length) {
            const entityModel = await ibiz.hub.getAppDataEntity(appDataEntityId, appId);
            const nodeDatas = [];
            for (let index = 0; index < result.length; index++) {
                const item = result[index];
                const defaultExpand = this.calcExpand(nodeModel, index);
                let data = item;
                // 不是应用数据实体对象的数据项必须转为应用数据实体对象
                if (!(item instanceof AppDataEntity)) {
                    data = new AppDataEntity(entityModel, item);
                }
                const nodeData = new TreeDataSetNodeData(nodeModel, parentNodeData, {
                    data,
                    leaf: !!opts.leaf,
                    context: opts.context,
                    params: opts.params,
                    navContext,
                    navParams,
                    defaultExpand,
                });
                await nodeData.initAsyncData(nodeModel);
                nodeDatas.push(nodeData);
            }
            this.updatePageItems(nodeModel, parentNodeData, opts, dataSourceType, nodeDatas);
            return nodeDatas;
        }
        return [];
    }
    /**
     * 通过参数获取实体节点数据
     *
     * @protected
     * @param {IDETreeDataSetNode} nodeModel
     * @param {(ITreeNodeData | undefined)} parentNodeData
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {Promise<IData[]>}
     * @memberof TreeService
     */
    async getDENodeDatasByParams(nodeModel, parentNodeData, opts) {
        const { dataName, dataSourceType } = nodeModel;
        const { view } = opts;
        let params;
        switch (dataSourceType) {
            case 'PARENTDATAPARAM':
                params = parentNodeData === null || parentNodeData === void 0 ? void 0 : parentNodeData._deData;
                break;
            case 'APPGLOBALPARAM':
                params = ibiz.util.getGlobalParam();
                break;
            case 'TOPVIEWSESSIONPARAM':
                params = view === null || view === void 0 ? void 0 : view.getTopView().state;
                break;
            case 'VIEWSESSIONPARAM':
                params = view === null || view === void 0 ? void 0 : view.state;
                break;
            default:
                break;
        }
        let result = [];
        if (params) {
            const data = dataName ? params[dataName] : params;
            result = data ? (Array.isArray(data) ? data : [data]) : [];
        }
        return result;
    }
    /**
     * 通过自定义代码获取实体节点数据
     *
     * @protected
     * @param {IDETreeDataSetNode} nodeModel
     * @param {(ITreeNodeData | undefined)} parentNodeData
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {Promise<IData[]>}
     * @memberof TreeService
     */
    async getDENodeDatasByCustom(nodeModel, parentNodeData, opts) {
        const { scriptCode } = nodeModel;
        const { context, params, view, ctrl } = opts;
        let result = [];
        if (scriptCode) {
            const _result = await ScriptFactory.asyncExecScriptFn({
                view,
                ctrl,
                params,
                context,
                nodeModel,
                data: parentNodeData,
            }, scriptCode);
            if (_result) {
                result = Array.isArray(_result) ? _result : [_result];
            }
        }
        return result;
    }
    /**
     * 通过实体逻辑获取实体节点数据
     *
     * @protected
     * @param {IDETreeDataSetNode} nodeModel
     * @param {(ITreeNodeData | undefined)} parentNodeData
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {Promise<IData[]>}
     * @memberof TreeService
     */
    async getDENodeDatasByDELogic(nodeModel, parentNodeData, opts) {
        const { appDELogicId, appDataEntityId, appId } = nodeModel;
        const { context, params } = opts;
        let result = [];
        if (appDELogicId && appDataEntityId) {
            const entityModel = await ibiz.hub.getAppDataEntity(appDataEntityId, appId);
            const deLogic = findDELogic(appDELogicId, entityModel);
            if (deLogic) {
                const response = await execDELogicAction(deLogic, entityModel, context, parentNodeData === null || parentNodeData === void 0 ? void 0 : parentNodeData._deData, params);
                if (response.ok && response.data) {
                    result = Array.isArray(response.data)
                        ? response.data
                        : [response.data];
                }
            }
        }
        return result;
    }
    /**
     * 通过实体行为获取实体节点数据
     *
     * @protected
     * @param {IDETreeDataSetNode} nodeModel
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {Promise<IData[]>}
     * @memberof TreeService
     */
    async getDENodeDatasByDEAction(nodeModel, parentNodeData, opts) {
        const { appDEActionId, appDataEntityId } = nodeModel;
        const { context, params } = opts;
        const result = [];
        if (appDEActionId && appDataEntityId) {
            const response = await this.app.deService.exec(appDataEntityId, appDEActionId, context, params);
            if (response.ok && response.data) {
                result.push(response.data);
            }
        }
        return result;
    }
    /**
     * 通过实体数据集获取实体节点数据
     *
     * @protected
     * @param {IDETreeDataSetNode} nodeModel
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {Promise<IData[]>}
     * @memberof TreeService
     */
    async getDENodeDatasByDEDataset(nodeModel, parentNodeData, opts) {
        var _a;
        const { appDEDataSetId, appDataEntityId } = nodeModel;
        const { context, params } = opts;
        let result = [];
        if (appDEDataSetId && appDataEntityId) {
            const response = await this.app.deService.exec(appDataEntityId, appDEDataSetId, context, params);
            if (response.ok && response.data) {
                this.updatePageInfo(nodeModel, parentNodeData, opts, Number((_a = response.headers) === null || _a === void 0 ? void 0 : _a['x-total-pages']) || 0);
                result = response.data;
            }
        }
        return result;
    }
    /**
     * 获取代码表节点数据
     *
     * @protected
     * @param {TreeCodeListNodeModel} _nodeModel
     * @param {TreeFetchOpts} _opts
     * @memberof TreeService
     */
    async getCodeListNodeDatas(nodeModel, nodeRS, parentNodeData, opts) {
        // 处理查询参数,没有关系的时候不处理参数了
        const { context, params, navContext, navParams } = nodeRS
            ? this.getNodeRSFilterParams(nodeRS, parentNodeData, opts)
            : {
                context: opts.context,
                params: opts.params,
                navContext: {},
                navParams: {},
            };
        // 更正应用标识(适配多应用树合并)
        context.srfappid = nodeRS.appId;
        // 请求实体数据
        const items = await this.app.codeList.get(nodeModel.codeListId, context, params);
        if (items.length) {
            const nodeDatas = items.map((item, index) => {
                // 处理多层级代码表，递归填充子节点数据
                const fillChildren = (codeListItem, parent, i) => {
                    var _a;
                    const defaultExpand = this.calcExpand(nodeModel, i);
                    const node = new TreeCodeListNodeData(nodeModel, parent, {
                        data: codeListItem,
                        leaf: !!opts.leaf && !((_a = codeListItem.children) === null || _a === void 0 ? void 0 : _a.length),
                        context: opts.context,
                        params: opts.params,
                        navContext,
                        navParams,
                        defaultExpand,
                    });
                    if (codeListItem.children && codeListItem.children.length) {
                        node._children = codeListItem.children.map((child, j) => {
                            return fillChildren(child, node, j);
                        });
                    }
                    return node;
                };
                return fillChildren(item, parentNodeData, index);
            });
            return nodeDatas;
        }
        return [];
    }
    /**
     * 删除单条数据
     *
     * @author lxm
     * @date 2022-09-07 19:09:48
     * @param {IContext} context 上下文
     * @param {IParams} [params={}] 视图参数
     * @param {string | undefined} [removeAppDEActionId] 树节点删除实体行为标识
     * @returns {*}
     */
    async removeItem(appDataEntityId, context, params = {}, removeAppDEActionId = undefined) {
        var _a;
        const removeAction = removeAppDEActionId ||
            ((_a = this.model.removeControlAction) === null || _a === void 0 ? void 0 : _a.appDEMethodId) ||
            'remove';
        const res = await this.execWithEntityId(appDataEntityId, removeAction, context, undefined, params);
        return res;
    }
    /**
     * 执行服务方法(带实体id)
     *
     * @author lxm
     * @date 2022-08-31 17:08:41
     * @param {string} methodName 方法名
     * @param {IContext} context 上下文
     * @param {IParams} [params={}] 视图参数或数据
     * @returns {*}  {Promise<IHttpResponse>}
     */
    async execWithEntityId(appDataEntityId, methodName, context, data, params) {
        const header = this.handleCustomRequestHeader();
        const res = await this.app.deService.exec(appDataEntityId, methodName, context, data, params, header);
        return res;
    }
    /**
     * 计算展开逻辑（全展开和只展开首节点expanded都为true）
     *
     * @author ljx
     * @date 2024-06-04 15:08:41
     * @param {IModel} nodeModel 方法名
     * @param {number} index 节点下标
     */
    calcExpand(nodeModel, index) {
        const { expandFirstOnly, expanded } = nodeModel;
        return !!expanded && (!expandFirstOnly || (expandFirstOnly && index === 0));
    }
    /**
     * 计算静态展开逻辑（全展开和只展开首节点为true）
     *
     * @author ljx
     * @date 2024-06-04 15:08:41
     * @param {IModel} nodeModel 方法名
     */
    calcStaticExpand(nodeModel) {
        const { expandFirstOnly, expanded } = nodeModel;
        return !!expanded || !!expandFirstOnly;
    }
    /**
     * @description 初始化分页参数
     * @param {IDETreeDataSetNode} nodeModel
     * @param {(ITreeNodeData | undefined)} parentNodeData
     * @param {TreeFetchOpts} opts
     * @param {IParams} params
     * @memberof TreeService
     */
    initPageParams(nodeModel, parentNodeData, opts, params) {
        if (nodeModel.enablePaging && nodeModel.pagingSize) {
            params.size = nodeModel.pagingSize;
        }
        if (parentNodeData) {
            if (!this.loadMoreMap[parentNodeData._id]) {
                this.loadMoreMap[parentNodeData._id] = [];
            }
            if (opts.isLoadMore) {
                let info = this.loadMoreMap[parentNodeData._id].find(item => item.nodeModelId === nodeModel.id);
                if (!info) {
                    info = {
                        nodeModelId: nodeModel.id,
                        curPage: 0,
                        totalPage: 0,
                        items: [],
                    };
                    this.loadMoreMap[parentNodeData._id].push(info);
                }
                params.page = info.curPage + 1;
            }
            else {
                const index = this.loadMoreMap[parentNodeData._id].findIndex(item => item.nodeModelId === nodeModel.id);
                if (index === -1) {
                    this.loadMoreMap[parentNodeData._id].push({
                        nodeModelId: nodeModel.id,
                        curPage: 0,
                        totalPage: 0,
                        items: [],
                    });
                }
                else {
                    this.loadMoreMap[parentNodeData._id][index] = {
                        nodeModelId: nodeModel.id,
                        curPage: 0,
                        totalPage: 0,
                        items: [],
                    };
                }
            }
        }
    }
    /**
     * @description 更新分页节点数据
     * @param {IDETreeDataSetNode} nodeModel
     * @param {(ITreeNodeData | undefined)} parentNodeData
     * @param {TreeFetchOpts} opts
     * @param {(string | undefined)} dataSourceType
     * @param {TreeDataSetNodeData[]} nodeDatas
     * @memberof TreeService
     */
    updatePageItems(nodeModel, parentNodeData, opts, dataSourceType, nodeDatas) {
        if (parentNodeData) {
            if (!this.loadMoreMap[parentNodeData._id]) {
                this.loadMoreMap[parentNodeData._id] = [];
            }
            let info = this.loadMoreMap[parentNodeData._id].find(item => item.nodeModelId === nodeModel.id);
            if (!info) {
                info = {
                    nodeModelId: nodeModel.id,
                    curPage: 0,
                    totalPage: 0,
                    items: [],
                };
                this.loadMoreMap[parentNodeData._id].push(info);
            }
            if (dataSourceType === 'DEDATASET' && opts.isLoadMore) {
                info.items.push(...nodeDatas);
            }
            else {
                info.items = [...nodeDatas];
            }
        }
    }
    /**
     * @description 更新分页信息
     * @param {IDETreeDataSetNode} nodeModel
     * @param {(ITreeNodeData | undefined)} parentNodeData
     * @param {TreeFetchOpts} opts
     * @param {number} totalPage
     * @memberof TreeService
     */
    updatePageInfo(nodeModel, parentNodeData, opts, totalPage) {
        if (parentNodeData && nodeModel.enablePaging && nodeModel.pagingSize) {
            if (!this.loadMoreMap[parentNodeData._id]) {
                this.loadMoreMap[parentNodeData._id] = [];
            }
            let info = this.loadMoreMap[parentNodeData._id].find(item => item.nodeModelId === nodeModel.id);
            if (!info) {
                info = {
                    nodeModelId: nodeModel.id,
                    curPage: 0,
                    totalPage: 0,
                    items: [],
                };
                this.loadMoreMap[parentNodeData._id].push(info);
            }
            if (opts.isLoadMore) {
                info.curPage += 1;
            }
            info.totalPage = totalPage;
        }
    }
}
