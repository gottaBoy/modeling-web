/* eslint-disable @typescript-eslint/no-explicit-any */

import { IApiButtonContainerState } from '../../../api';
import { IButtonState } from './i-button.state';

/**
 * @description 按钮容器的状态
 * @export
 * @interface IButtonContainerState
 * @extends {IApiButtonContainerState}
 */
export interface IButtonContainerState extends IApiButtonContainerState {
  /**
   * @description 添加子的状态
   * @param {string} name 名称标识，会把state绑定到自身的name属性上
   * @param {(IButtonContainerState | IButtonState)} state
   * @memberof IButtonContainerState
   */
  addState(name: string, state: IButtonContainerState | IButtonState): void;

  /**
   * @description 初始化
   * @returns {*}  {Promise<void>}
   * @memberof IButtonContainerState
   */
  init(): Promise<void>;
}
