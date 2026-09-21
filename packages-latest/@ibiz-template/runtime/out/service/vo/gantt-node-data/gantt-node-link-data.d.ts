import { IGanttNodeLinkData, IGanttNodeData } from '../../../interface';
export declare class GanttNodeLinkData implements IGanttNodeLinkData {
    _uuid: string;
    _from: string;
    _to: string;
    _fromValue: string;
    _toValue: string;
    _deData: IData;
    _fromData: IGanttNodeData;
    _toData: IGanttNodeData;
    constructor(opts: {
        fromDataItemName: string;
        toDataItemName: string;
        fromData: IGanttNodeData;
        toData: IGanttNodeData;
        data: IData;
    });
}
//# sourceMappingURL=gantt-node-link-data.d.ts.map