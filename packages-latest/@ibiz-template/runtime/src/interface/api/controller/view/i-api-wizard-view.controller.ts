/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEWizardView } from '@ibiz/model-core';
import { IApiWizardViewState } from '../../state';
import { IApiViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体向导视图控制器接口
 * @export
 * @interface IApiWizardViewController
 * @extends {IApiViewController<IAppDEWizardView, IApiWizardViewState>}
 */
export interface IApiWizardViewController
  extends IApiViewController<IAppDEWizardView, IApiWizardViewState> {
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
   * @memberof IApiWizardViewController
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
