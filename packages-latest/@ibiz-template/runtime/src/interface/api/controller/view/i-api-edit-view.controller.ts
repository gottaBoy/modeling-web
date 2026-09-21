/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEEditView } from '@ibiz/model-core';
import { IApiEditViewState } from '../../state';
import { IApiEditViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体编辑视图控制器接口
 * @export
 * @interface IApiEditViewController
 * @extends {IApiViewController<IAppDEEditView, IApiEditViewState>}
 */
export interface IApiEditViewController
  extends IApiViewController<IAppDEEditView, IApiEditViewState> {
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
   * @memberof IApiEditViewController
   */
  call<T extends IApiEditViewCall, K extends keyof T>(
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
