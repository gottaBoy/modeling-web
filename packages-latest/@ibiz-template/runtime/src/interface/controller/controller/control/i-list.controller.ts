import { IDEList } from '@ibiz/model-core';
import { IListEvent } from '../../event';
import { IListState } from '../../state';
import { IMDControlController } from './i-md-control.controller';
import { IApiListController } from '../../../api';
import { IViewController } from '../view';

/**
 * @description 列表控制器接口
 * @export
 * @interface IListController
 * @extends {IMDControlController<T, S, E>}
 * @extends {IApiListController<T, S>}
 * @template T
 * @template S
 * @template E
 */
export interface IListController<
  T extends IDEList = IDEList,
  S extends IListState = IListState,
  E extends IListEvent = IListEvent,
> extends IMDControlController<T, S, E>,
    IApiListController<T, S> {
  /**
   * @description 视图控制器
   * @type {IViewController}
   * @memberof IListController
   */
  view: IViewController;

  /**
   * @description 设置列表数据
   * @param {IData[]} items
   * @memberof IListController
   */
  setData(items: IData[]): void;
}
