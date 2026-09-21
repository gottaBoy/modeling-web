import { IApiTreeGridExRowState, IApiTreeGridExState } from '../../../api';
import { IButtonContainerState } from '../../common';
import { IColumnState } from './i-grid.state';
import { ITreeNodeData, ITreeState } from './i-tree.state';

/**
 * @description 树表格(增强)部件状态
 * @export
 * @interface ITreeGridExState
 * @extends {ITreeState}
 * @extends {IApiTreeGridExState}
 */
export interface ITreeGridExState extends ITreeState, IApiTreeGridExState {
  /**
   * @description 树节点集合
   * @type {ITreeNodeData[]}
   * @memberof ITreeGridExState
   */
  rootNodes: ITreeNodeData[];
  /**
   * @description 树节点集合
   * @type {ITreeNodeData[]}
   * @memberof ITreeGridExState
   */
  items: ITreeNodeData[];
  /**
   * @description 选中节点集合
   * @type {ITreeNodeData[]}
   * @memberof ITreeGridExState
   */
  selectedData: ITreeNodeData[];
  /**
   * 表格列状态数组
   * 顺序就是列的排序
   * @author zk
   * @date 2023-09-21 02:09:57
   * @type {IColumnState[]}
   * @memberof ITreeGridState
   */
  columnStates: IColumnState[];
  /**
   * 树表格(增强)行状态Map
   *
   * @author lxm
   * @date 2022-09-05 19:09:12
   * @type {IGridRowState[]}
   */
  rows: { [p: string]: ITreeGridExRowState };
}

/**
 * @description 树表格(增强)行状态
 * @export
 * @interface ITreeGridExRowState
 * @extends {IApiTreeGridExRowState}
 */
export interface ITreeGridExRowState extends IApiTreeGridExRowState {
  /**
   * @description 行数据（一般是树节点的数据）
   * @type {ITreeNodeData}
   * @memberof ITreeGridExRowState
   */
  data: ITreeNodeData;

  /**
   * @description 错误信息集合，p是对应属性名称
   * @type {({ [p: string]: string | null })}
   * @memberof ITreeGridExRowState
   */
  errors: { [p: string]: string | null };

  /**
   * @description 可能是以下两种类型状态
   * - 操作列按钮状态（p是操作列的标识）
   * - 属性列的内置界面行为组状态(p是属性列的标识)
   * @type {{ [p: string]: IButtonContainerState }}
   * @memberof ITreeGridExRowState
   */
  columnActionsStates: { [p: string]: IButtonContainerState };

  /**
   * @description 编辑列的状态
   * @type {{
   *     [p: string]: {
   *       disabled: boolean;
   *       readonly: boolean;
   *       editable: boolean;
   *       required: boolean;
   *     };
   *   }}
   * @memberof ITreeGridExRowState
   */
  editColStates: {
    [p: string]: {
      disabled: boolean;
      readonly: boolean;
      editable: boolean;
      required: boolean;
    };
  };

  /**
   * @description 是否被修改过
   * @type {boolean}
   * @memberof IApiTreeGridExRowState
   */
  modified: boolean;

  /**
   * @description 是否正在处理中(动态控制，值规则，表单项更新等逻辑中)
   * @type {boolean}
   * @memberof ITreeGridExRowState
   */
  processing: boolean;
}
