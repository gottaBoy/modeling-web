/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEEditView } from '@ibiz/model-core';
import { IApiEditViewState } from '../../state';
import { IApiMobEditViewCall } from '../../call';
import { IApiMobViewController } from './i-api-mob-view.controller';

/**
 * @description 实体移动端编辑视图（分页关系）控制器接口
 * @export
 * @interface IApiMobEditView3Controller
 * @extends {IApiMobViewController<IAppDEEditView, IApiEditViewState>}
 */
export interface IApiMobEditView3Controller
  extends IApiMobViewController<IAppDEEditView, IApiEditViewState> {
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
   * @memberof IApiMobEditView3Controller
   */
  call<T extends IApiMobEditViewCall, K extends keyof T>(
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
