/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEPickupView } from '@ibiz/model-core';
import { IApiMPickupViewState } from '../../state';
import { IApiMPickupViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体多项数据选择视图（左右关系）控制器接口
 * @export
 * @interface IApiMPickupView2Controller
 * @extends {IApiViewController<IAppDEPickupView, IApiMPickupViewState>}
 */
export interface IApiMPickupView2Controller
  extends IApiViewController<IAppDEPickupView, IApiMPickupViewState> {
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
   * @memberof IApiMPickupView2Controller
   */
  call<T extends IApiMPickupViewCall, K extends keyof T>(
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
