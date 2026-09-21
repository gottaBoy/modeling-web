/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDEKanbanView } from '@ibiz/model-core';
import { IApiKanbanViewState } from '../../state';
import { IApiMDViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体看板视图控制器接口
 * @export
 * @interface IApiKanbanViewController
 * @extends {IApiViewController<IAppDEKanbanView, IApiKanbanViewState>}
 */
export interface IApiKanbanViewController
  extends IApiViewController<IAppDEKanbanView, IApiKanbanViewState> {
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
   * @memberof IApiKanbanViewController
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
