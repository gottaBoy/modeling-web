import { IApiTreeGridState } from '../../../api';
import { IGridRowState, IGridState } from './i-grid.state';

/**
 * @description 树表格部件状态
 * @export
 * @interface ITreeGridState
 * @extends {IGridState}
 * @extends {IApiTreeGridState}
 */
export interface ITreeGridState extends IGridState, IApiTreeGridState {
  /**
   * @description 表格行状态
   * @type {IGridRowState[]}
   * @memberof IGridState
   */
  rows: IGridRowState[];
}
