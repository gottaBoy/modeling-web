/* eslint-disable @typescript-eslint/no-explicit-any */

import { IApiButtonState } from '../../../api';

/**
 * @description 按钮UI状态
 * @export
 * @interface IButtonState
 * @extends {IApiButtonState}
 */
export interface IButtonState extends IApiButtonState {
  /**
   * @description 初始化
   * @returns {*}  {Promise<void>}
   * @memberof IButtonState
   */
  init(): Promise<void>;
}
