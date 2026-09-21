import { TreeStaticNodeData } from '../tree-node-data';
import { calcDataItemValue } from './gantt-node-data-util';
export class GanttStaticNodeData extends TreeStaticNodeData {
    constructor(model, nodeModel, parentNodeData, opts) {
        super(nodeModel, parentNodeData, opts);
        this._snDataItemValue = calcDataItemValue(model.sndataItemName, nodeModel);
        this._beginDataItemValue = calcDataItemValue(model.beginDataItemName, nodeModel);
        this._endDataItemValue = calcDataItemValue(model.endDataItemName, nodeModel);
        this._prevDataItemValue = calcDataItemValue(model.prevDataItemName, nodeModel);
        this._finishDataItemValue = calcDataItemValue(model.finishDataItemName, nodeModel);
        this._totalDataItemValue = calcDataItemValue(model.totalDataItemName, nodeModel);
    }
}
