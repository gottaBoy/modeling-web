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
export class TreeStaticNodeData extends TreeNodeData implements ITreeNodeData {
  _text: string;

  _id!: string;

  _value?: string;

  _deData?: IData;

  constructor(
    model: IDETreeStaticNode,
    parentNodeData: ITreeNodeData | undefined,
    opts: { parentValueLevel?: number; leaf: boolean; defaultExpand: boolean },
  ) {
    super(model, parentNodeData, opts);
    // !!根节点的默认节点值root排除掉
    const nodeValue = model.nodeValue === 'root' ? undefined : model.nodeValue;

    // id小写
    const selfId = `${model.id}`.toLowerCase();

    Object.defineProperty(this, '_id', {
      get() {
        return this._parent ? `${this._parent._id}:${selfId}` : selfId;
      },
      enumerable: true,
      configurable: true,
    });

    this._text = model.text!;
    this._value = nodeValue;

    // 静态节点数据去对应级别的父节点数据
    if (parentNodeData && opts.parentValueLevel) {
      // 根据父值级别查找父数据
      let parent: ITreeNodeData | undefined = parentNodeData;
      for (let index = 1; index < opts.parentValueLevel!; index++) {
        parent = parent?._parent;
      }
      if (parent?._deData) {
        this._deData = parent._deData;
      }
      // 静态节点值不存在时，取父数据的值
      this._value = nodeValue || parent?._value;
    }

    this.srfkey = this._deData?.srfkey || this._value;
    this.srfmajortext = this._deData?.srfmajortext || this._text;

    this._icon = this.calcIcon(model);
    this.calcDynaClass(model);
    this.calcShapeDynaClass(model);
  }
}
