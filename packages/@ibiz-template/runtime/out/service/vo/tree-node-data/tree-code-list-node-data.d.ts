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
    constructor(model: IDETreeDataSetNode, parentNodeData: ITreeNodeData | undefined, opts: {
        data: CodeListItem;
        leaf: boolean;
        defaultExpand: boolean;
        navContext?: IParams;
        navParams?: IParams;
    });
}
//# sourceMappingURL=tree-code-list-node-data.d.ts.map