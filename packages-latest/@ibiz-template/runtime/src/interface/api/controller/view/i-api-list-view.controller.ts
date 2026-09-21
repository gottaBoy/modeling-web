/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEListView } from '@ibiz/model-core';
import { IApiListViewState } from '../../state';
import { IApiListViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体列表视图控制器接口
 * @export
 * @interface IApiListViewController
 * @extends {IApiViewController<IAppDEListView, IApiListViewState>}
 */
export interface IApiListViewController
  extends IApiViewController<IAppDEListView, IApiListViewState> {
  /**
   * @description 执行视图的能力
   * @template T
   * @template K
   * @param {K} key 视图能力的唯一标识
   * @param {...T[K] extends { args: infer A }
   *       ? A extends undefined
   *         ? []
   *         : [A]
   *       : T[K] extends { args?: infer A }
   *         ? A extends undefined
   *           ? []
   *           : [A?]
   *         : []} args 视图能力需要的参数
   * @returns {*}  {Promise<any>}
   * @memberof IApiListViewController
   */
  call<T extends IApiListViewCall, K extends keyof T>(
    key: K,
    ...args: T[K] extends { args: infer A }
      ? A extends undefined
        ? []
        : [A]
      : T[K] extends { args?: infer A }
        ? A extends undefined
          ? []
          : [A?]
        : []
  ): Promise<any>;
}
