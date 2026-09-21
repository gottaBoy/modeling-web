/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDETabExplorerView } from '@ibiz/model-core';
import { IApiTabExpViewState } from '../../state';
import { IApiTabExpViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体分页导航视图控制器接口
 * @export
 * @interface IApiTabExpViewController
 * @extends {IApiViewController<IAppDETabExplorerView, IApiTabExpViewState>}
 */
export interface IApiTabExpViewController
  extends IApiViewController<IAppDETabExplorerView, IApiTabExpViewState> {
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
   * @memberof IApiTabExpViewController
   */
  call<T extends IApiTabExpViewCall, K extends keyof T>(
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
