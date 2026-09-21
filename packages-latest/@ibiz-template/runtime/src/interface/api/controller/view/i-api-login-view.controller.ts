/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppView } from '@ibiz/model-core';
import { IApiAppLoginViewState } from '../../state';
import { IApiLoginViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 应用登录视图控制器接口
 * @export
 * @interface IApiLoginViewController
 * @extends {IApiViewController<IAppView, IApiAppLoginViewState>}
 */
export interface IApiLoginViewController
  extends IApiViewController<IAppView, IApiAppLoginViewState> {
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
   * @memberof IApiLoginViewController
   */
  call<T extends IApiLoginViewCall, K extends keyof T>(
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
