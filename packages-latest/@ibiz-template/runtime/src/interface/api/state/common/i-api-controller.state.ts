import { IApiContext } from '@ibiz-template/core';

/**
 * @primary
 * @description 控制器基类UI状态
 * @export
 * @interface IApiControllerState
 */
export interface IApiControllerState {
  /**
   * @description 控制器是否走完created生命周期
   * @type {boolean}
   * @default false
   * @memberof IApiControllerState
   */
  isCreated: boolean;

  /**
   * @description 控制器是否走完mounted生命周期
   * @type {boolean}
   * @default false
   * @memberof IApiControllerState
   */
  isMounted: boolean;

  /**
   * @description 控制器是否走完destroy生命周期
   * @type {boolean}
   * @default false
   * @memberof IApiControllerState
   */
  isDestroyed: boolean;

  /**
   * @description 应用上下文对象
   * @type {IApiContext}
   * @default {}
   * @memberof IControllerState
   */
  context: IApiContext;
}
