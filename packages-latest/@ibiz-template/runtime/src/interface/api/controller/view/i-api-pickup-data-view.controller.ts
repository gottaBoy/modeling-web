/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEDataView } from '@ibiz/model-core';
import { IApiPickupDataViewState } from '../../state';
import { IApiPickupDataViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体选择数据视图（部件视图）控制器接口
 * @export
 * @interface IApiPickupDataViewController
 * @extends {IApiViewController<IAppDEDataView, IApiPickupDataViewState>}
 */
export interface IApiPickupDataViewController
  extends IApiViewController<IAppDEDataView, IApiPickupDataViewState> {
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
   * @memberof IApiPickupDataViewController
   */
  call<T extends IApiPickupDataViewCall, K extends keyof T>(
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
