/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEMobPickupView } from '@ibiz/model-core';
import { IApiMPickupViewState } from '../../state';
import { IApiMobMPickupViewCall } from '../../call';
import { IApiMobViewController } from './i-api-mob-view.controller';

/**
 * @description 实体移动端多数据选择视图控制器接口
 * @export
 * @interface IApiMobMPickupViewController
 * @extends {IApiMobViewController<IAppDEMobPickupView, IApiMPickupViewState>}
 */
export interface IApiMobMPickupViewController
  extends IApiMobViewController<IAppDEMobPickupView, IApiMPickupViewState> {
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
   * @memberof IApiMobMPickupViewController
   */
  call<T extends IApiMobMPickupViewCall, K extends keyof T>(
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
