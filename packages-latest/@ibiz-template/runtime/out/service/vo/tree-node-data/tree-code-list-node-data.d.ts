import { IDETreeDataSetNode } from '@ibiz/model-core';
import { CodeListItem, ITreeNodeData } from '../../../interface';
import { TreeNodeData } from './tree-node-data';
/**
 * 实体动态代码表树节点数据
 *
 * @export
 * @class TreeCodeListNodeData
 * @extends {TreeNodeData}
 * @implements {ITreeNodeData}
 */
export declare class TreeCodeListNodeData extends TreeNodeData implements ITreeNodeData {
    _text: string;
    _id: string;
    _value: string;
    _deData: IData;
    constructor(model: IDETreeDataSetNode, parentNodeData: ITreeNodeData | undefined, opts: {
        data: CodeListItem;
        leaf: boolean;
        defaultExpand: boolean;
        context?: IContext;
        params?: IParams;
        navContext?: IParams;
        navParams?: IParams;
    });
    /**
     * 获取原始数据
     */
    getOrigin(): IData;
}
//# sourceMappingURL=tree-code-list-node-data.d.ts.map