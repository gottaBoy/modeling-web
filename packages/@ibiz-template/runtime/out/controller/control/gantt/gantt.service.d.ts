import { IDETreeCodeListNode, IDETreeDataSetNode, IDETreeNode, IDETreeNodeRS } from '@ibiz/model-core';
import { IGanttNodeData } from '../../../interface';
import { TreeFetchOpts, TreeService } from '../tree';
/**
 * 甘特图服务
 *
 * @author tony001
 * @date 2023-12-11 16:12:57
 * @export
 * @class GanttService
 * @extends {TreeService}
 */
export declare class GanttService extends TreeService {
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
    getNodeDraft(nodeModel: IDETreeDataSetNode, nodeRS: IDETreeNodeRS | undefined, parentNodeData: IGanttNodeData | undefined, opts: TreeFetchOpts): Promise<IGanttNodeData>;
    /**
     * 获取子节点数据
     *
     * @author tony001
     * @date 2023-12-11 18:12:58
     * @param {(IGanttNodeData | undefined)} parentNodeData
     * @param {TreeFetchOpts} opts
     * @return {*}  {(Promise<IGanttNodeData[] | undefined>)}
     */
    fetchChildNodes(parentNodeData: IGanttNodeData | undefined, opts: TreeFetchOpts): Promise<IGanttNodeData[] | undefined>;
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
    protected fetchNodeDatasByType(nodeModel: IDETreeNode, nodeRS: IDETreeNodeRS | undefined, parentNodeData: IGanttNodeData | undefined, opts: TreeFetchOpts): Promise<IGanttNodeData[]>;
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
    protected getStaticGanttNodeData(nodeModel: IDETreeNode, nodeRS: IDETreeNodeRS | undefined, parentNodeData: IGanttNodeData | undefined, opts: TreeFetchOpts): Promise<IGanttNodeData>;
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
    protected getDEGanttNodeDatas(nodeModel: IDETreeDataSetNode, nodeRS: IDETreeNodeRS | undefined, parentNodeData: IGanttNodeData | undefined, opts: TreeFetchOpts): Promise<IGanttNodeData[]>;
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
    protected getCodeListGanttNodeDatas(nodeModel: IDETreeCodeListNode, nodeRS: IDETreeNodeRS | undefined, parentNodeData: IGanttNodeData | undefined, opts: TreeFetchOpts): Promise<IGanttNodeData[]>;
}
//# sourceMappingURL=gantt.service.d.ts.map