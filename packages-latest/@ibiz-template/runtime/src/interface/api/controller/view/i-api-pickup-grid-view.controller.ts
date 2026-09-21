/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEGridView } from '@ibiz/model-core';
import { IApiPickupGridViewState } from '../../state';
import { IApiPickupGridViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体选择表格视图（部件视图）控制器接口
 * @export
 * @interface IApiPickupGridViewController
 * @extends {IApiViewController<IAppDEGridView, IApiPickupGridViewState>}
 */
export interface IApiPickupGridViewController
  extends IApiViewController<IAppDEGridView, IApiPickupGridViewState> {
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
   * @memberof IApiPickupGridViewController
   */
  call<T extends IApiPickupGridViewCall, K extends keyof T>(
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
