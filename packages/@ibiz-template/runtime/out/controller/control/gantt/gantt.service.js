import { ModelError } from '@ibiz-template/core';
import { getChildNodeRSs, getRootNode, getTreeNode } from '../../../model';
import { handleAllSettled } from '../../../utils';
import { TreeService } from '../tree';
import { AppDataEntity, GanttCodeListNodeData, GanttDataSetNodeData, GanttStaticNodeData, } from '../../../service';
/**
 * 甘特图服务
 *
 * @author tony001
 * @date 2023-12-11 16:12:57
 * @export
 * @class GanttService
 * @extends {TreeService}
 */
export class GanttService extends TreeService {
    /**
     * 获取节点草稿
     *
     * @param {IDETreeDataSetNode} nodeModel
     * @param {(IDETreeNodeRS | undefined)} nodeRS
     * @param {(IGanttNodeData | undefined)} parentNodeData
     * @param {TreeFetchOpts} opts
     * @return {*}  {Promise<IGanttNodeData>}
     * @memberof GanttService
     */
    async getNodeDraft(nodeModel, nodeRS, parentNodeData, opts) {
        var _a;
        const { appDataEntityId } = nodeModel;
        // 处理查询参数,没有关系的时候不处理参数了
        const { context, params, navContext, navParams } = nodeRS
            ? this.getNodeRSFilterParams(nodeRS, parentNodeData, opts)
            : {
                context: opts.context,
                params: opts.params,
                navContext: {},
                navParams: {},
            };
        const response = await this.app.deService.exec(appDataEntityId, 'getdraft', context, params);
        const { data } = response;
        if (((_a = nodeRS === null || nodeRS === void 0 ? void 0 : nodeRS.parentDER1N) === null || _a === void 0 ? void 0 : _a.pickupDEFName) && parentNodeData) {
            data[nodeRS.parentDER1N.pickupDEFName] = parentNodeData._value;
        }
        return new GanttDataSetNodeData(this.model, nodeModel, parentNodeData, {
            data: response.data,
            leaf: true,
            navContext,
            navParams,
            defaultExpand: false,
        });
    }
    /**
     * 获取子节点数据
     *
     * @author tony001
     * @date 2023-12-11 18:12:58
     * @param {(IGanttNodeData | undefined)} parentNodeData
     * @param {TreeFetchOpts} opts
     * @return {*}  {(Promise<IGanttNodeData[] | undefined>)}
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
                parentId: parentNodeData._nodeId,
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
     *
     * @author tony001
     * @date 2023-12-11 18:12:35
     * @protected
     * @param {IDETreeNode} nodeModel
     * @param {(IDETreeNodeRS | undefined)} nodeRS
     * @param {(ITreeNodeData | undefined)} parentNodeData
     * @param {TreeFetchOpts} opts
     * @return {*}  {Promise<IGanttNodeData[]>}
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
        switch (nodeModel.treeNodeType) {
            case 'STATIC':
                {
                    const nodeData = await this.getStaticGanttNodeData(nodeModel, nodeRS, parentNodeData, tempOpts);
                    result = [nodeData];
                }
                break;
            case 'DE':
                result = await this.getDEGanttNodeDatas(nodeModel, nodeRS, parentNodeData, tempOpts);
                break;
            case 'CODELIST':
                result = await this.getCodeListGanttNodeDatas(nodeModel, nodeRS, parentNodeData, tempOpts);
                break;
            default:
                throw new ModelError(nodeModel, ibiz.i18n.t('runtime.controller.control.gantt.noSupport', {
                    treeNodeType: nodeModel.treeNodeType,
                }));
        }
        // *查询回来之后,如果有子节点，看默认展开相关配置有时每个节点数据走一遍展开逻辑
        const { expandFirstOnly, expanded, rootNode } = nodeModel;
        const isExpandedRoot = rootNode && !this.model.rootVisible; // root节点不显示的时候默认展开其子节点
        if (!leaf) {
            await Promise.all(result.map(async (childNode, index) => {
                if ((expanded && // 全展开合只展开首节点expanded都为true
                    (!expandFirstOnly || (expandFirstOnly && index === 0))) ||
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
     * @author tony001
     * @date 2023-12-11 18:12:06
     * @protected
     * @param {IDETreeNode} nodeModel
     * @param {(IDETreeNodeRS | undefined)} nodeRS
     * @param {(IGanttNodeData | undefined)} parentNodeData
     * @param {TreeFetchOpts} opts
     * @return {*}  {Promise<IGanttNodeData>}
     */
    async getStaticGanttNodeData(nodeModel, nodeRS, parentNodeData, opts) {
        const defaultExpand = this.calcStaticExpand(nodeModel);
        const nodeData = new GanttStaticNodeData(this.model, nodeModel, parentNodeData, {
            parentValueLevel: nodeRS === null || nodeRS === void 0 ? void 0 : nodeRS.parentValueLevel,
            leaf: !!opts.leaf,
            defaultExpand,
        });
        return nodeData;
    }
    /**
     * 获取实体数据集数据
     *
     * @author tony001
     * @date 2023-12-11 18:12:23
     * @protected
     * @param {IDETreeDataSetNode} nodeModel
     * @param {(IDETreeNodeRS | undefined)} nodeRS
     * @param {(IGanttNodeData | undefined)} parentNodeData
     * @param {TreeFetchOpts} opts
     * @return {*}  {Promise<IGanttNodeData[]>}
     */
    async getDEGanttNodeDatas(nodeModel, nodeRS, parentNodeData, opts) {
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
            const nodeDatas = result.map((item, index) => {
                const defaultExpand = this.calcExpand(nodeModel, index);
                let data = item;
                // 不是应用数据实体对象的数据项必须转为应用数据实体对象
                if (!(item instanceof AppDataEntity)) {
                    data = new AppDataEntity(entityModel, item);
                }
                return new GanttDataSetNodeData(this.model, nodeModel, parentNodeData, {
                    data,
                    leaf: !!opts.leaf,
                    navContext,
                    navParams,
                    defaultExpand,
                });
            });
            return nodeDatas;
        }
        return [];
    }
    /**
     * 获取代码表节点数据
     *
     * @author tony001
     * @date 2023-12-11 18:12:35
     * @protected
     * @param {IDETreeCodeListNode} nodeModel
     * @param {(IDETreeNodeRS | undefined)} nodeRS
     * @param {(IGanttNodeData | undefined)} parentNodeData
     * @param {TreeFetchOpts} opts
     * @return {*}  {Promise<IGanttNodeData[]>}
     */
    async getCodeListGanttNodeDatas(nodeModel, nodeRS, parentNodeData, opts) {
        // 处理查询参数,没有关系的时候不处理参数了
        const { context, params, navContext, navParams } = nodeRS
            ? this.getNodeRSFilterParams(nodeRS, parentNodeData, opts)
            : {
                context: opts.context,
                params: opts.params,
                navContext: {},
                navParams: {},
            };
        // 请求实体数据
        const items = await this.app.codeList.get(nodeModel.codeListId, context, params);
        if (items.length) {
            const nodeDatas = items.map((item, index) => {
                const defaultExpand = this.calcExpand(nodeModel, index);
                return new GanttCodeListNodeData(this.model, nodeModel, parentNodeData, {
                    data: item,
                    leaf: !!opts.leaf,
                    navContext,
                    navParams,
                    defaultExpand,
                });
            });
            return nodeDatas;
        }
        return [];
    }
}
