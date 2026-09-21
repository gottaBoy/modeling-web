/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDECalendarExplorerView } from '@ibiz/model-core';
import { IApiCalendarExpViewState } from '../../state';
import { IApiViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体日历导航视图控制器接口
 * @export
 * @interface IApiCalendarExpViewController
 * @extends {IApiViewController<IAppDECalendarExplorerView, IApiCalendarExpViewState>}
 */
export interface IApiCalendarExpViewController
  extends IApiViewController<
    IAppDECalendarExplorerView,
    IApiCalendarExpViewState
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
   * @memberof IApiCalendarExpViewController
   */
  call<T extends IApiViewCall, K extends keyof T>(
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
