/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDECustomView } from '@ibiz/model-core';
import { IApiViewState } from '../../state';
import { IApiCustomViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体自定义视图控制器接口
 * @export
 * @interface IApiCustomViewController
 * @extends {IApiViewController<IAppDECustomView, IApiViewState>}
 */
export interface IApiCustomViewController
  extends IApiViewController<IAppDECustomView, IApiViewState> {
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
   * @memberof IApiCustomViewController
   */
  call<T extends IApiCustomViewCall, K extends keyof T>(
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
