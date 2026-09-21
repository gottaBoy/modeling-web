/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEIndexView } from '@ibiz/model-core';
import { IApiDEIndexViewState } from '../../state';
import { IApiEditViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体首页视图控制器接口
 * @export
 * @interface IApiDEIndexViewController
 * @extends {IApiViewController<IAppDEIndexView, IApiDEIndexViewState>}
 */
export interface IApiDEIndexViewController
  extends IApiViewController<IAppDEIndexView, IApiDEIndexViewState> {
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
   * @memberof IApiDEIndexViewController
   */
  call<T extends IApiEditViewCall, K extends keyof T>(
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
