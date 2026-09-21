import { IDEGantt, IDETreeDataSetNode } from '@ibiz/model-core';
import { CodeListItem, IGanttNodeData } from '../../../interface';
import { TreeCodeListNodeData } from '../tree-node-data';
import { calcDataItemValue } from './gantt-node-data-util';

export class GanttCodeListNodeData
  extends TreeCodeListNodeData
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
    nodeModel: IDETreeDataSetNode,
    parentNodeData: IGanttNodeData | undefined,
    opts: {
      data: CodeListItem;
      leaf: boolean;
      defaultExpand: boolean;
      navContext?: IParams;
      navParams?: IParams;
    },
  ) {
    super(nodeModel, parentNodeData, opts);
    const { data } = opts;
    this._snDataItemValue = calcDataItemValue(
      model.sndataItemName,
      nodeModel,
      data,
    );
    this._beginDataItemValue = calcDataItemValue(
      model.beginDataItemName,
      nodeModel,
      data,
    );
    this._endDataItemValue = calcDataItemValue(
      model.endDataItemName,
      nodeModel,
      data,
    );
    this._prevDataItemValue = calcDataItemValue(
      model.prevDataItemName,
      nodeModel,
      data,
    );
    this._finishDataItemValue = calcDataItemValue(
      model.finishDataItemName,
      nodeModel,
      data,
    );
    this._totalDataItemValue = calcDataItemValue(
      model.totalDataItemName,
      nodeModel,
      data,
    );
  }
}
