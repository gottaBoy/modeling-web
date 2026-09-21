/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEChartView } from '@ibiz/model-core';
import { IApiChartViewState } from '../../state';
import { IApiMDViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体图表视图控制器接口
 * @export
 * @interface IApiChartViewController
 * @extends {IApiViewController<IAppDEChartView, IApiChartViewState>}
 */
export interface IApiChartViewController
  extends IApiViewController<IAppDEChartView, IApiChartViewState> {
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
   *         : []} args
   * @returns {*}  {Promise<any>} 视图能力需要的参数
   * @memberof IApiChartViewController
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
