/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppDETreeGridExView } from '@ibiz/model-core';
import { IApiTreeGridExViewState } from '../../state';
import { IApiTreeGridExViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体树表格视图（增强）控制器接口
 * @export
 * @interface IApiTreeGridExViewController
 * @extends {IApiViewController<IAppDETreeGridExView, IApiTreeGridExViewState>}
 */
export interface IApiTreeGridExViewController
  extends IApiViewController<IAppDETreeGridExView, IApiTreeGridExViewState> {
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
   * @memberof IApiTreeGridExViewController
   */
  call<T extends IApiTreeGridExViewCall, K extends keyof T>(
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
