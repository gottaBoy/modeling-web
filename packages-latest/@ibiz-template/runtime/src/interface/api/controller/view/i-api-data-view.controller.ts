/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEDataView } from '@ibiz/model-core';
import { IApiDataViewState } from '../../state';
import { IApiDataViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体数据视图控制器接口
 * @export
 * @interface IApiDataViewController
 * @extends {IApiViewController<IAppDEDataView, IApiDataViewState>}
 */
export interface IApiDataViewController
  extends IApiViewController<IAppDEDataView, IApiDataViewState> {
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
   * @memberof IApiDataViewController
   */
  call<T extends IApiDataViewCall, K extends keyof T>(
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
