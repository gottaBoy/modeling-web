import { IDEGantt, IDETreeDataSetNode } from '@ibiz/model-core';
import { IGanttNodeData } from '../../../interface';
import { TreeDataSetNodeData } from '../tree-node-data';
import { calcDataItemValue } from './gantt-node-data-util';

export class GanttDataSetNodeData
  extends TreeDataSetNodeData
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
      data: IData;
      leaf: boolean; // 是否有子节点关系
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
