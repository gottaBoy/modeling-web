/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEWFDynaEditView } from '@ibiz/model-core';
import { IApiWFStepTraceViewState } from '../../state';
import { IApiViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 应用流程跟踪视图控制器接口
 * @export
 * @interface IApiWFStepTraceViewController
 * @extends {IApiViewController<IAppDEWFDynaEditView, IApiWFStepTraceViewState>}
 */
export interface IApiWFStepTraceViewController
  extends IApiViewController<IAppDEWFDynaEditView, IApiWFStepTraceViewState> {
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
   * @memberof IApiWFStepTraceViewController
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
