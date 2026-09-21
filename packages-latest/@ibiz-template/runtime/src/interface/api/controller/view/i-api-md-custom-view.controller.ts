/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDECustomView } from '@ibiz/model-core';
import { IApiViewState } from '../../state';
import { IApiViewController } from './i-api-view.controller';
import { IApiMDCustomViewCall } from '../../call';

/**
 * @description 实体多数据自定义视图控制器接口
 * @export
 * @interface IApiMDCustomViewController
 * @extends {IApiViewController<IAppDECustomView, IApiViewState>}
 */
export interface IApiMDCustomViewController
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
   * @memberof IApiMDCustomViewController
   */
  call<T extends IApiMDCustomViewCall, K extends keyof T>(
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
