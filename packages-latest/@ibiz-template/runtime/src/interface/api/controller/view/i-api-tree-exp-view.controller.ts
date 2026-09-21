/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDETreeExplorerView } from '@ibiz/model-core';
import { IApiTreeExpViewState } from '../../state';
import { IApiTreeExpViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体树导航视图控制器接口
 * @export
 * @interface IApiTreeExpViewController
 * @extends {IApiViewController<IAppDETreeExplorerView, IApiTreeExpViewState>}
 */
export interface IApiTreeExpViewController
  extends IApiViewController<IAppDETreeExplorerView, IApiTreeExpViewState> {
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
   * @memberof IApiTreeExpViewController
   */
  call<T extends IApiTreeExpViewCall, K extends keyof T>(
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
