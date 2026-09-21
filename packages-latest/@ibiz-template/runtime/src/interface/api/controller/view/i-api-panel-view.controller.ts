/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppView } from '@ibiz/model-core';
import { IApiPanelViewState } from '../../state';
import { IApiViewCall } from '../../call';
import { IApiViewController } from './i-api-view.controller';

/**
 * @description 实体面板视图控制器接口
 * @export
 * @interface IApiPanelViewController
 * @extends {IApiViewController<IAppView, IApiPanelViewState>}
 */
export interface IApiPanelViewController
  extends IApiViewController<IAppView, IApiPanelViewState> {
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
   * @memberof IApiPanelViewController
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
