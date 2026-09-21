import { ControlVO } from '../../../../service';
import {
  IApiColumnState,
  IApiGridRowState,
  IApiGridState,
  IApiStorageColumnStates,
} from '../../../api';
import { IButtonContainerState } from '../../common';
import { IMDControlState } from './i-md-control.state';

/**
 * @description 行数据状态
 * @export
 * @interface IGridRowState
 * @extends {IApiGridRowState}
 */
export interface IGridRowState extends IApiGridRowState {
  /**
   * @description 数据
   * @type {ControlVO}
   * @memberof IGridRowState
   */
  data: ControlVO;

  /**
   * @description 旧数据
   * @type {ControlVO}
   * @memberof IGridRowState
   */
  oldData: ControlVO;

  /**
   * @description 操作列状态(p是操作列的标识)
   * @type {{ [p: string]: IButtonContainerState }}
   * @memberof IGridRowState
   */
  uaColStates: { [p: string]: IButtonContainerState };

  /**
   * @description 界面行为组状态(p是界面行为的标识)
   * @type {{ [p: string]: IButtonContainerState }}
   * @memberof IGridRowState
   */
  uiActionGroupStates: { [p: string]: IButtonContainerState };

  /**
   * @description 缓存的数据对象
   * @type {ControlVO}
   * @memberof IGridRowState
   */
  cacheData?: ControlVO;

  /**
   * @description 获取改变数据
   * @returns {*}  {ControlVO}
   * @memberof IGridRowState
   */
  getDiffData(): ControlVO;
}

/**
 * @description 表格列状态
 * @export
 * @interface IColumnState
 * @extends {IApiColumnState}
 */
export interface IColumnState extends IApiColumnState {}

/**
 * @description 本地存储表格列状态对象
 * @export
 * @interface IStorageColumnStates
 * @extends {IApiStorageColumnStates}
 */
export interface IStorageColumnStates extends IApiStorageColumnStates {}

/**
 * @description 表格UI状态接口
 * @export
 * @interface IGridState
 * @extends {IMDControlState}
 * @extends {IApiGridState}
 */
export interface IGridState extends IMDControlState, IApiGridState {
  /**
   * @description 表格行状态
   * @type {IGridRowState[]}
   * @memberof IGridState
   */
  rows: IGridRowState[];

  /**
   * @description 表格列过滤数据
   * @type {IData}
   * @memberof IGridState
   */
  columnFilter: IData;
}
