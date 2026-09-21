import { IDEGantt, IDETreeDataSetNode } from '@ibiz/model-core';
import { CodeListItem, IGanttNodeData } from '../../../interface';
import { TreeCodeListNodeData } from '../tree-node-data';
export declare class GanttCodeListNodeData extends TreeCodeListNodeData implements IGanttNodeData {
    _snDataItemValue: string;
    _beginDataItemValue: string;
    _endDataItemValue: string;
    _prevDataItemValue: string | number;
    _finishDataItemValue: string | number;
    _totalDataItemValue: string | number;
    _children?: IGanttNodeData[] | undefined;
    _parent?: IGanttNodeData;
    constructor(model: IDEGantt, nodeModel: IDETreeDataSetNode, parentNodeData: IGanttNodeData | undefined, opts: {
        data: CodeListItem;
        leaf: boolean;
        defaultExpand: boolean;
        navContext?: IParams;
        navParams?: IParams;
    });
}
//# sourceMappingURL=gantt-code-list-node-data.d.ts.map