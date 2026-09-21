import { IDEGantt, IDETreeNode } from '@ibiz/model-core';
import { IGanttNodeData } from '../../../interface';
import { TreeStaticNodeData } from '../tree-node-data';
export declare class GanttStaticNodeData extends TreeStaticNodeData implements IGanttNodeData {
    _snDataItemValue: string;
    _beginDataItemValue: string;
    _endDataItemValue: string;
    _prevDataItemValue: string | number;
    _finishDataItemValue: string | number;
    _totalDataItemValue: string | number;
    _children?: IGanttNodeData[] | undefined;
    _parent?: IGanttNodeData;
    constructor(model: IDEGantt, nodeModel: IDETreeNode, parentNodeData: IGanttNodeData | undefined, opts: {
        parentValueLevel?: number;
        leaf: boolean;
        defaultExpand: boolean;
    });
}
//# sourceMappingURL=gantt-static-node-data.d.ts.map