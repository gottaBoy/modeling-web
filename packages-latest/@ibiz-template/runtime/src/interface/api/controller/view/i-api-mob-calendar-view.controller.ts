/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDECalendarView } from '@ibiz/model-core';
import { IApiCalendarViewState } from '../../state';
import { IApiMDViewCall } from '../../call';
import { IApiMobViewController } from './i-api-mob-view.controller';

/**
 * @description 实体移动端日历视图控制器接口
 * @export
 * @interface IApiMobCalendarViewController
 * @extends {IApiMobViewController<IAppDECalendarView, IApiCalendarViewState>}
 */
export interface IApiMobCalendarViewController
  extends IApiMobViewController<IAppDECalendarView, IApiCalendarViewState> {
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
   * @memberof IApiMobCalendarViewController
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
