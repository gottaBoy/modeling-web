import { TreeCodeListNodeData } from '../tree-node-data';
import { calcDataItemValue } from './gantt-node-data-util';
export class GanttCodeListNodeData extends TreeCodeListNodeData {
    constructor(model, nodeModel, parentNodeData, opts) {
        super(nodeModel, parentNodeData, opts);
        const { data } = opts;
        this._snDataItemValue = calcDataItemValue(model.sndataItemName, nodeModel, data);
        this._beginDataItemValue = calcDataItemValue(model.beginDataItemName, nodeModel, data);
        this._endDataItemValue = calcDataItemValue(model.endDataItemName, nodeModel, data);
        this._prevDataItemValue = calcDataItemValue(model.prevDataItemName, nodeModel, data);
        this._finishDataItemValue = calcDataItemValue(model.finishDataItemName, nodeModel, data);
        this._totalDataItemValue = calcDataItemValue(model.totalDataItemName, nodeModel, data);
    }
}
