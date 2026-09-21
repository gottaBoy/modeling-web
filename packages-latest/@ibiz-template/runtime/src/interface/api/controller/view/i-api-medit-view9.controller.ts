/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEMEditView } from '@ibiz/model-core';
import { IApiMEditView9State } from '../../state';
import { IApiMEditView9Call } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体多表单编辑视图（部件视图）控制器接口
 * @export
 * @interface IApiMEditView9Controller
 * @extends {IApiViewController<IAppDEMEditView, IApiMEditView9State>}
 */
export interface IApiMEditView9Controller
  extends IApiViewController<IAppDEMEditView, IApiMEditView9State> {
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
   * @memberof IApiMEditView9Controller
   */
  call<T extends IApiMEditView9Call, K extends keyof T>(
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
