import { IDETreeStaticNode } from '@ibiz/model-core';
import { ITreeNodeData } from '../../../interface';
import { TreeNodeData } from './tree-node-data';
/**
 * 静态树节点数据
 *
 * @export
 * @class TreeStaticNodeData
 * @extends {TreeNodeData}
 * @implements {ITreeNodeData}
 */
export declare class TreeStaticNodeData extends TreeNodeData implements ITreeNodeData {
    _text: string;
    _id: string;
    _value?: string;
    _deData?: IData;
    constructor(model: IDETreeStaticNode, parentNodeData: ITreeNodeData | undefined, opts: {
        parentValueLevel?: number;
        leaf: boolean;
        defaultExpand: boolean;
    });
}
//# sourceMappingURL=tree-static-node-data.d.ts.map