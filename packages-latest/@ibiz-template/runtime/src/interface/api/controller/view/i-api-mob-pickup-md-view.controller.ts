/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEDataView } from '@ibiz/model-core';
import { IApiPickupMDViewState } from '../../state';
import { IApiMobPickupMDViewCall } from '../../call';
import { IApiMobViewController } from './i-api-mob-view.controller';

/**
 * @description 实体移动端选择多数据视图（部件视图）控制器接口
 * @export
 * @interface IApiMobPickupMDViewController
 * @extends {IApiMobViewController<IAppDEDataView, IApiPickupMDViewState>}
 */
export interface IApiMobPickupMDViewController
  extends IApiMobViewController<IAppDEDataView, IApiPickupMDViewState> {
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
   * @memberof IApiMobPickupMDViewController
   */
  call<T extends IApiMobPickupMDViewCall, K extends keyof T>(
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
