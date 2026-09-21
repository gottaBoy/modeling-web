/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEReportView } from '@ibiz/model-core';
import { IApiReportViewState } from '../../state';
import { IApiReportViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体报表视图控制器接口
 * @export
 * @interface IApiReportViewController
 * @extends {IApiViewController<IAppDEReportView, IApiReportViewState>}
 */
export interface IApiReportViewController
  extends IApiViewController<IAppDEReportView, IApiReportViewState> {
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
   * @memberof IApiReportViewController
   */
  call<T extends IApiReportViewCall, K extends keyof T>(
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
