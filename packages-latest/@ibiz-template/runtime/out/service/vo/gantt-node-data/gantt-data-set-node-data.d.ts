import { IDEGantt, IDETreeDataSetNode } from '@ibiz/model-core';
import { IGanttNodeData } from '../../../interface';
import { TreeDataSetNodeData } from '../tree-node-data';
export declare class GanttDataSetNodeData extends TreeDataSetNodeData implements IGanttNodeData {
    _snDataItemValue: string;
    _beginDataItemValue: string;
    _endDataItemValue: string;
    _prevDataItemValue: string | number;
    _finishDataItemValue: string | number;
    _totalDataItemValue: string | number;
    _children?: IGanttNodeData[] | undefined;
    _parent?: IGanttNodeData;
    constructor(model: IDEGantt, nodeModel: IDETreeDataSetNode, parentNodeData: IGanttNodeData | undefined, opts: {
        data: IData;
        leaf: boolean;
        defaultExpand: boolean;
        navContext?: IParams;
        navParams?: IParams;
    });
}
//# sourceMappingURL=gantt-data-set-node-data.d.ts.map