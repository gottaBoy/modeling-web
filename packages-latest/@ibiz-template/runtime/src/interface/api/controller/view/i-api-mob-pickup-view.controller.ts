/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEMobPickupView } from '@ibiz/model-core';
import { IApiPickupViewState } from '../../state';
import { IApiMobPickupViewCall } from '../../call';
import { IApiMobViewController } from './i-api-mob-view.controller';

/**
 * @description 实体移动端数据选择视图控制器接口
 * @export
 * @interface IApiMobPickupViewController
 * @extends {IApiMobViewController<IAppDEMobPickupView, IApiPickupViewState>}
 */
export interface IApiMobPickupViewController
  extends IApiMobViewController<IAppDEMobPickupView, IApiPickupViewState> {
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
   * @memberof IApiMobPickupViewController
   */
  call<T extends IApiMobPickupViewCall, K extends keyof T>(
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
