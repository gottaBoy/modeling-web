/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEMapView } from '@ibiz/model-core';
import { IApiMapViewState } from '../../state';
import { IApiMDViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体地图视图控制器接口
 * @export
 * @interface IApiMapViewController
 * @extends {IApiViewController<IAppDEMapView, IApiMapViewState>}
 */
export interface IApiMapViewController
  extends IApiViewController<IAppDEMapView, IApiMapViewState> {
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
   * @memberof IApiMapViewController
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
