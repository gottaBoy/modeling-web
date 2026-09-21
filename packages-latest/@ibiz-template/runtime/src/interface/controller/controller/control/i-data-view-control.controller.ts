import { IDEDataView } from '@ibiz/model-core';
import { IDataViewControlEvent } from '../../event';
import { IDataViewControlState } from '../../state';
import { IMDControlController } from './i-md-control.controller';
import { IApiDataViewControlController } from '../../../api';
import { IViewController } from '../view';

/**
 * @description 数据视图（卡片）控制器
 * @export
 * @interface IDataViewControlController
 * @extends {IMDControlController<T, S, E>}
 * @template T
 * @template S
 * @template E
 */
export interface IDataViewControlController<
  T extends IDEDataView = IDEDataView,
  S extends IDataViewControlState = IDataViewControlState,
  E extends IDataViewControlEvent = IDataViewControlEvent,
> extends IMDControlController<T, S, E>,
    IApiDataViewControlController<T, S> {
  /**
   * @description 视图控制器
   * @type {IViewController}
   * @memberof IDataViewControlController
   */
  view: IViewController;
}
