/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEWFDynaStartView } from '@ibiz/model-core';
import { IApiWFDynaStartViewState } from '../../state';
import { IApiWFDynaStartViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体工作流动态启动视图控制器接口
 * @export
 * @interface IApiWFDynaStartViewController
 * @extends {IApiViewController<IAppDEWFDynaStartView, IApiWFDynaStartViewState>}
 */
export interface IApiWFDynaStartViewController
  extends IApiViewController<IAppDEWFDynaStartView, IApiWFDynaStartViewState> {
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
   * @memberof IApiWFDynaStartViewController
   */
  call<T extends IApiWFDynaStartViewCall, K extends keyof T>(
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
