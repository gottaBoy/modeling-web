/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEDataViewExplorerView } from '@ibiz/model-core';
import { IApiDataViewExpViewState } from '../../state';
import { IApiMDViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体卡片视图导航视图控制器接口
 * @export
 * @interface IApiDataViewExpViewController
 * @extends {IApiViewController<IAppDEDataViewExplorerView, IApiDataViewExpViewState>}
 */
export interface IApiDataViewExpViewController
  extends IApiViewController<
    IAppDEDataViewExplorerView,
    IApiDataViewExpViewState
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
   * @memberof IApiDataViewExpViewController
   */
  call<T extends IApiMDViewCall, K extends keyof T>(
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
