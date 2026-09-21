/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDETabSearchView } from '@ibiz/model-core';
import { IApiTabSearchViewState } from '../../state';
import { IApiTabSearchViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体分页搜索视图控制器接口
 * @export
 * @interface IApiTabSearchViewController
 * @extends {IApiViewController<IAppDETabSearchView, IApiTabSearchViewState>}
 */
export interface IApiTabSearchViewController
  extends IApiViewController<IAppDETabSearchView, IApiTabSearchViewState> {
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
   * @memberof IApiTabSearchViewController
   */
  call<T extends IApiTabSearchViewCall, K extends keyof T>(
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
