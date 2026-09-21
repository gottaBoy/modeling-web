/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEExplorerView, IAppDEMultiDataView } from '@ibiz/model-core';
import { IApiExpViewState } from '../../state';
import { IApiMDViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 导航视图控制器接口
 * @export
 * @interface IApiExpViewController
 * @extends {IApiViewController<IAppDEExplorerView & IAppDEMultiDataView, IApiExpViewState>}
 */
export interface IApiExpViewController
  extends IApiViewController<
    IAppDEExplorerView & IAppDEMultiDataView,
    IApiExpViewState
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
   * @memberof IApiExpViewController
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
