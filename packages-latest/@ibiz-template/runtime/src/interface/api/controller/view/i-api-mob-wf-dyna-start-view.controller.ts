/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEMobWFDynaStartView } from '@ibiz/model-core';
import { IApiWFDynaStartViewState } from '../../state';
import { IApiMobWFDynaStartViewCall } from '../../call';
import { IApiMobViewController } from './i-api-mob-view.controller';

/**
 * @description 实体移动端工作流动态启动视图控制器接口
 * @export
 * @interface IApiMobWFDynaStartViewController
 * @extends {IApiMobViewController<IAppDEMobWFDynaStartView, IApiWFDynaStartViewState>}
 */
export interface IApiMobWFDynaStartViewController
  extends IApiMobViewController<
    IAppDEMobWFDynaStartView,
    IApiWFDynaStartViewState
  > {
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
   * @memberof IApiMobWFDynaStartViewController
   */
  call<T extends IApiMobWFDynaStartViewCall, K extends keyof T>(
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
