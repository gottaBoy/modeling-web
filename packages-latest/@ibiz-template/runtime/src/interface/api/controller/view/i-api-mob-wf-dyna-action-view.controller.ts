/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEMobWFDynaActionView } from '@ibiz/model-core';
import { IApiWFDynaActionViewState } from '../../state';
import { IApiMobWFDynaActionViewCall } from '../../call';
import { IApiMobViewController } from './i-api-mob-view.controller';

/**
 * @description 实体移动端工作流动态操作视图控制器接口
 * @export
 * @interface IApiMobWFDynaActionViewController
 * @extends {IApiMobViewController<IAppDEMobWFDynaActionView, IApiWFDynaActionViewState>}
 */
export interface IApiMobWFDynaActionViewController
  extends IApiMobViewController<
    IAppDEMobWFDynaActionView,
    IApiWFDynaActionViewState
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
   * @memberof IApiMobWFDynaActionViewController
   */
  call<T extends IApiMobWFDynaActionViewCall, K extends keyof T>(
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
