/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEWFDynaEditView } from '@ibiz/model-core';
import { IApiWFDynaEditView3State } from '../../state';
import { IApiMobWFDynaEditViewCall } from '../../call';
import { IApiMobViewController } from './i-api-mob-view.controller';

/**
 * @description 实体移动端工作流动态编辑视图（分页关系）控制器接口
 * @export
 * @interface IApiMobWFDynaEditView3Controller
 * @extends {IApiMobViewController<IAppDEWFDynaEditView, IApiWFDynaEditView3State>}
 */
export interface IApiMobWFDynaEditView3Controller
  extends IApiMobViewController<
    IAppDEWFDynaEditView,
    IApiWFDynaEditView3State
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
   * @memberof IApiMobWFDynaEditView3Controller
   */
  call<T extends IApiMobWFDynaEditViewCall, K extends keyof T>(
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
