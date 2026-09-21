/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEEditView } from '@ibiz/model-core';
import { IApiEditView3State } from '../../state';
import { IApiEditViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体编辑视图（分页关系）控制器接口
 * @export
 * @interface IApiEditView3Controller
 * @extends {IApiViewController<IAppDEEditView, IApiEditView3State>}
 */
export interface IApiEditView3Controller
  extends IApiViewController<IAppDEEditView, IApiEditView3State> {
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
   * @memberof IApiEditView3Controller
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
