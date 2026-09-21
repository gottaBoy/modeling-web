/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEEditView } from '@ibiz/model-core';
import { IApiEditView4State } from '../../state';
import { IApiEditViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体编辑视图（上下关系）控制器接口
 * @export
 * @interface IApiEditView4Controller
 * @extends {IApiViewController<IAppDEEditView, IApiEditView4State>}
 */
export interface IApiEditView4Controller
  extends IApiViewController<IAppDEEditView, IApiEditView4State> {
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
   * @memberof IApiEditView4Controller
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
