import { IDEGantt, IDETreeNode } from '@ibiz/model-core';
import { IGanttNodeData } from '../../../interface';
import { TreeStaticNodeData } from '../tree-node-data';
import { calcDataItemValue } from './gantt-node-data-util';

export class GanttStaticNodeData
  extends TreeStaticNodeData
  implements IGanttNodeData
{
  _snDataItemValue: string;

  _beginDataItemValue: string;

  _endDataItemValue: string;

  _prevDataItemValue: string | number;

  _finishDataItemValue: string | number;

  _totalDataItemValue: string | number;

  _children?: IGanttNodeData[] | undefined;

  _parent?: IGanttNodeData;

  constructor(
    model: IDEGantt,
    nodeModel: IDETreeNode,
    parentNodeData: IGanttNodeData | undefined,
    opts: { parentValueLevel?: number; leaf: boolean; defaultExpand: boolean },
  ) {
    super(nodeModel, parentNodeData, opts);
    this._snDataItemValue = calcDataItemValue(model.sndataItemName, nodeModel);
    this._beginDataItemValue = calcDataItemValue(
      model.beginDataItemName,
      nodeModel,
    );
    this._endDataItemValue = calcDataItemValue(
      model.endDataItemName,
      nodeModel,
    );
    this._prevDataItemValue = calcDataItemValue(
      model.prevDataItemName,
      nodeModel,
    );
    this._finishDataItemValue = calcDataItemValue(
      model.finishDataItemName,
      nodeModel,
    );
    this._totalDataItemValue = calcDataItemValue(
      model.totalDataItemName,
      nodeModel,
    );
  }
}
