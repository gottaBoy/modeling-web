import { IApiTreeNodeData, IApiTreeState } from './i-api-tree.state';
import { IApiButtonContainerState } from '../common';
import { IApiColumnState } from './i-api-grid.state';

/**
 * @description 树表格(增强)部件状态
 * @primary
 * @export
 * @interface IApiTreeGridExState
 * @extends {IApiTreeState}
 */
export interface IApiTreeGridExState extends IApiTreeState {
  /**
   * @description 开启表格行编辑
   * @type {boolean}
   * @default true
   * @memberof IApiTreeGridExState
   */
  rowEditOpen: boolean;
  /**
   * @description 树表格列状态，用于界面绑定，响应式数据
   * @type {IApiColumnState[]}
   * @memberof IApiTreeGridExState
   */
  columnStates: IApiColumnState[];
}

export interface IApiTreeGridExRowState {
  /**
   * @description 行数据（一般是树节点的数据）
   * @type {IApiTreeNodeData}
   * @memberof IApiTreeGridExRowState
   */
  data: IApiTreeNodeData;

  /**
   * @description key 为列 codeName，value 为该列的按钮容器状态(操作列：控制行操作按钮的显隐/禁用，属性列：控制列内嵌按钮组的状态)
   * @type {{ [p: string]: IApiButtonContainerState }}
   * @memberof IApiTreeGridExRowState
   */
  columnActionsStates: { [p: string]: IApiButtonContainerState };

  /**
   * @description 是否显示行编辑
   * @type {boolean}
   * @memberof IApiTreeGridExRowState
   */
  showRowEdit: boolean;
}
