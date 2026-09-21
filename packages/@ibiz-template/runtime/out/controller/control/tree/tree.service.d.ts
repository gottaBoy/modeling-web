import { IHttpResponse } from '@ibiz-template/core';
import { IDETree, IDETreeCodeListNode, IDETreeDataSetNode, IDETreeNode, IDETreeNodeRS } from '@ibiz/model-core';
import { ITreeController, ITreeNodeData, IViewController } from '../../../interface';
import { MDControlService, TreeDataSetNodeData, TreeCodeListNodeData } from '../../../service';
export interface TreeFetchOpts {
    /**
     * 是否有过滤搜索
     *
     * @type {boolean}
     * @memberof TreeFetchOpts
     */
    hasQuery: boolean;
    /**
     * 上下文
     *
     * @type {IParams}
     * @memberof TreeFetchOpts
     */
    context: IContext;
    /**
     * 视图参数
     *
     * @type {IParams}
     * @memberof TreeFetchOpts
     */
    params: IParams;
    /**
     * 默认展开节点集合
     * @author lxm
     * @date 2023-08-08 03:23:52
     * @type {string[]}
     */
    defaultExpandedKeys?: string[];
    /**
     * 是否是叶子节点
     * @author lxm
     * @date 2023-05-29 02:26:44
     * @type {boolean}
     */
    leaf?: boolean;
    /**
     * 视图控制器
     *
     * @type {IViewController}
     * @memberof TreeFetchOpts
     */
    view?: IViewController;
    /**
     * 树部件控制器
     *
     * @type {ITreeController}
     * @memberof TreeFetchOpts
     */
    ctrl?: ITreeController;
}
/**
 * 树部件服务
 * @author lxm
 * @date 2023-05-15 09:53:35
 * @export
 * @class GridService
 * @extends {MDControlService<IDETree>}
 */
export declare class TreeService<T extends IDETree = IDETree> extends MDControlService<T> {
    /**
     * 获取子节点数据
     *
     * @param {ITreeNodeData} [parentNodeData] 父节点数据
     * @param {boolean} [hasQuery=false] 是否搜索
     * @returns {*}
     * @memberof TreeService
     */
    fetchChildNodes(parentNodeData: ITreeNodeData | undefined, opts: TreeFetchOpts): Promise<ITreeNodeData[] | undefined>;
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
    protected fetchNodeDatasByType(nodeModel: IDETreeNode, nodeRS: IDETreeNodeRS | undefined, parentNodeData: ITreeNodeData | undefined, opts: TreeFetchOpts): Promise<ITreeNodeData[]>;
    /**
     * 获取静态节点数据
     *
     * @protected
     * @param {TreeStaticNodeModel} nodeModel
     * @param {boolean} [hasQuery=false]
     * @returns {*}
     * @memberof TreeService
     */
    protected getStaticNodeData(nodeModel: IDETreeNode, nodeRS: IDETreeNodeRS | undefined, parentNodeData: ITreeNodeData | undefined, opts: TreeFetchOpts): Promise<ITreeNodeData>;
    /**
     * 获取节点关系过滤的上下文和视图参数
     *
     * @param {TreeNodeRSModel} nodeRS 节点关系模型
     * @param {(ITreeNodeData | undefined)} parentNodeData 父节点数据
     * @returns {*}  {(IParams | undefined)}
     * @memberof TreeService
     */
    getNodeRSFilterParams(nodeRS: IDETreeNodeRS, parentNodeData: ITreeNodeData | undefined, opts: TreeFetchOpts): {
        context: IContext;
        params: IParams;
        navContext: IParams;
        navParams: IParams;
    };
    /**
     * 获取实体数据集数据
     *
     * @protected
     * @param {TreeNodeRSModel} nodeRS
     * @param {TreeFetchOpts} opts
     * @returns {*}
     * @memberof TreeService
     */
    protected getDENodeDatas(nodeModel: IDETreeDataSetNode, nodeRS: IDETreeNodeRS | undefined, parentNodeData: ITreeNodeData | undefined, opts: TreeFetchOpts): Promise<TreeDataSetNodeData[]>;
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
    protected getDENodeDatasByParams(nodeModel: IDETreeDataSetNode, parentNodeData: ITreeNodeData | undefined, opts: TreeFetchOpts): Promise<IData[]>;
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
    protected getDENodeDatasByCustom(nodeModel: IDETreeDataSetNode, parentNodeData: ITreeNodeData | undefined, opts: TreeFetchOpts): Promise<IData[]>;
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
    protected getDENodeDatasByDELogic(nodeModel: IDETreeDataSetNode, parentNodeData: ITreeNodeData | undefined, opts: TreeFetchOpts): Promise<IData[]>;
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
    protected getDENodeDatasByDEAction(nodeModel: IDETreeDataSetNode, parentNodeData: ITreeNodeData | undefined, opts: TreeFetchOpts): Promise<IData[]>;
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
    protected getDENodeDatasByDEDataset(nodeModel: IDETreeDataSetNode, parentNodeData: ITreeNodeData | undefined, opts: TreeFetchOpts): Promise<IData[]>;
    /**
     * 获取代码表节点数据
     *
     * @protected
     * @param {TreeCodeListNodeModel} _nodeModel
     * @param {TreeFetchOpts} _opts
     * @memberof TreeService
     */
    protected getCodeListNodeDatas(nodeModel: IDETreeCodeListNode, nodeRS: IDETreeNodeRS | undefined, parentNodeData: ITreeNodeData | undefined, opts: TreeFetchOpts): Promise<TreeCodeListNodeData[]>;
    /**
     * 删除单条数据
     *
     * @author lxm
     * @date 2022-09-07 19:09:48
     * @param {IContext} context 上下文
     * @param {IParams} [params={}] 视图参数
     * @returns {*}
     */
    removeItem(appDataEntityId: string, context: IContext, params?: IParams): Promise<IHttpResponse>;
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
    execWithEntityId(appDataEntityId: string, methodName: string, context: IContext, data?: IData, params?: IParams): Promise<IHttpResponse>;
    /**
     * 计算展开逻辑（全展开和只展开首节点expanded都为true）
     *
     * @author ljx
     * @date 2024-06-04 15:08:41
     * @param {IModel} nodeModel 方法名
     * @param {number} index 节点下标
     */
    calcExpand(nodeModel: IModel, index: number): boolean;
    /**
     * 计算静态展开逻辑（全展开和只展开首节点为true）
     *
     * @author ljx
     * @date 2024-06-04 15:08:41
     * @param {IModel} nodeModel 方法名
     */
    calcStaticExpand(nodeModel: IModel): boolean;
}
//# sourceMappingURL=tree.service.d.ts.map