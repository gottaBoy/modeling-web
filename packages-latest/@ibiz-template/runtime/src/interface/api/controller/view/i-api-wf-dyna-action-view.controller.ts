/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEWFDynaActionView } from '@ibiz/model-core';
import { IApiWFDynaActionViewState } from '../../state';
import { IApiWFDynaActionViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体工作流动态操作视图控制器接口
 * @export
 * @interface IApiWFDynaActionViewController
 * @extends {IApiViewController<IAppDEWFDynaActionView, IApiWFDynaActionViewState>}
 */
export interface IApiWFDynaActionViewController
  extends IApiViewController<
    IAppDEWFDynaActionView,
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
   * @memberof IApiWFDynaActionViewController
   */
  call<T extends IApiWFDynaActionViewCall, K extends keyof T>(
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
