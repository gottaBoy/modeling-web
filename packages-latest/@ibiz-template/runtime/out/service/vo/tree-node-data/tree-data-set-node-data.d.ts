import { IDETreeDataSetNode, IDETreeNodeDataItem } from '@ibiz/model-core';
import { IIcon, ITreeNodeData } from '../../../interface';
import { TreeNodeData } from './tree-node-data';
/**
 * 实体数据集树节点数据
 *
 * @export
 * @class TreeDataSetNodeData
 * @extends {TreeNodeData}
 * @implements {ITreeNodeData}
 */
export declare class TreeDataSetNodeData extends TreeNodeData implements ITreeNodeData {
    _text: string;
    _id: string;
    _value: string;
    _deData: IData;
    _oldDeData: IData;
    /**
     * 克隆方法
     * @author lxm
     * @date 2024-01-12 02:37:46
     */
    clone: () => TreeDataSetNodeData;
    constructor(model: IDETreeDataSetNode, parentNodeData: ITreeNodeData | undefined, opts: {
        data: IData;
        leaf: boolean;
        defaultExpand: boolean;
        context?: IContext;
        params?: IParams;
        navContext?: IParams;
        navParams?: IParams;
    });
    /**
     * 初始化异步数据
     * @param model 节点模型
     */
    initAsyncData(model: IDETreeDataSetNode): Promise<void>;
    /**
     * 初始化节点图标
     * @author ljx
     * @date 2024-01-16 18:41:31
     * @protected
     * @param {IDETreeDataSetNode} model
     * @return {*}  {(Promise<undefined>)}
     */
    protected initIcon(model: IDETreeDataSetNode): Promise<undefined>;
    /**
     * 初始化节点文本html内容
     * @author ljx
     * @date 2024-01-16 18:41:31
     * @protected
     * @param {IDETreeDataSetNode} model
     * @return {*}  {(Promise<undefined>)}
     */
    protected initTextHtml(model: IDETreeDataSetNode): Promise<undefined>;
    protected calcIcon(model: IDETreeDataSetNode): IIcon | undefined;
    /**
     * @description 计算动态样式表（附加实体节点样式表属性）
     * @protected
     * @param {IDETreeDataSetNode} model
     * @memberof TreeDataSetNodeData
     */
    protected calcDynaClass(model: IDETreeDataSetNode): void;
    /**
     * @description 计算图形动态样式表（附加实体节点图形样式表属性）
     * @protected
     * @param {IDETreeDataSetNode} model
     * @memberof TreeDataSetNodeData
     */
    protected calcShapeDynaClass(model: IDETreeDataSetNode): void;
    /**
     * 计算节点数据项的自定义脚本内容
     * @author lxm
     * @date 2023-08-15 02:37:29
     * @protected
     * @param {IDETreeNodeDataItem} dataItem
     * @return {*}  {(string | undefined)}
     */
    protected calcDataItemScript(dataItem: IDETreeNodeDataItem): Promise<string | undefined>;
    /**
     * 计算节点文本html内容
     * @author lxm
     * @date 2023-08-15 02:41:31
     * @protected
     * @param {IDETreeDataSetNode} model
     * @return {*}  {(string | undefined)}
     */
    protected calcTextHtml(model: IDETreeDataSetNode): Promise<string | undefined>;
    /**
     * 获取原始数据
     */
    getOrigin(): IData;
}
//# sourceMappingURL=tree-data-set-node-data.d.ts.map