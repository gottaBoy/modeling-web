import { IDETreeGrid } from '@ibiz/model-core';
import { IGridController } from './i-grid.controller';
import { IGridRowState, ITreeGridState } from '../../state';
import { ITreeGridEvent } from '../../event';
import { IApiTreeGridController } from '../../../api';
import { IViewController } from '../view';

/**
 * @description 树表格部件控制器
 * @export
 * @interface ITreeGridController
 * @extends {IGridController<T, S, E>}
 * @extends {IApiTreeGridController<T, S>}
 * @template T
 * @template S
 * @template E
 */
export interface ITreeGridController<
  T extends IDETreeGrid = IDETreeGrid,
  S extends ITreeGridState = ITreeGridState,
  E extends ITreeGridEvent = ITreeGridEvent,
> extends IGridController<T, S, E>,
    IApiTreeGridController<T, S> {
  /**
   * @description 当前上下文环境的视图控制器
   * @type {IViewController}
   * @memberof ITreeGridController
   */
  view: IViewController;

  /**
   * @description 验证单条数据
   * @param {IGridRowState} row
   * @returns {*}  {Promise<boolean>}
   * @memberof ITreeGridController
   */
  validate(row: IGridRowState): Promise<boolean>;

  /**
   * @description 保存单条数据
   * @param {IData} data
   * @returns {*}  {Promise<void>}
   * @memberof ITreeGridController
   */
  save(data: IData): Promise<void>;
}
