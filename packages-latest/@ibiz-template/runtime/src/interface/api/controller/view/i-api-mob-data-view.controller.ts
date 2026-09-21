/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEMobMDView } from '@ibiz/model-core';
import { IApiDataViewState } from '../../state';
import { IApiMobDataViewCall } from '../../call';
import { IApiMobViewController } from './i-api-mob-view.controller';

/**
 * @description 实体移动端卡片视图控制器接口
 * @export
 * @interface IApiMobDataViewController
 * @extends {IApiMobViewController<IAppDEMobMDView, IApiDataViewState>}
 */
export interface IApiMobDataViewController
  extends IApiMobViewController<IAppDEMobMDView, IApiDataViewState> {
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
   * @memberof IApiMobDataViewController
   */
  call<T extends IApiMobDataViewCall, K extends keyof T>(
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
