/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDETreeView } from '@ibiz/model-core';
import { IApiPickupTreeViewState } from '../../state';
import { IApiPickupTreeViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体选择树视图（部件视图）控制器接口
 * @export
 * @interface IApiPickupTreeViewController
 * @extends {IApiViewController<IAppDETreeView, IApiPickupTreeViewState>}
 */
export interface IApiPickupTreeViewController
  extends IApiViewController<IAppDETreeView, IApiPickupTreeViewState> {
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
   * @memberof IApiPickupTreeViewController
   */
  call<T extends IApiPickupTreeViewCall, K extends keyof T>(
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
