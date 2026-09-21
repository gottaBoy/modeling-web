/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDECustomView } from '@ibiz/model-core';
import { IApiViewState } from '../../state';
import { IApiViewCall } from '../../call';
import { IApiMobViewController } from './i-api-mob-view.controller';

/**
 * @description 实体移动端自定义视图控制器接口
 * @export
 * @interface IApiMobCustomViewController
 * @extends {IApiMobViewController<IAppDECustomView, IApiViewState>}
 */
export interface IApiMobCustomViewController
  extends IApiMobViewController<IAppDECustomView, IApiViewState> {
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
   * @memberof IApiMobCustomViewController
   */
  call<T extends IApiViewCall, K extends keyof T>(
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
