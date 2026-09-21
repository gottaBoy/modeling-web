import { IApiData } from '@ibiz-template/core';
import { IApiControlState } from './i-api-control.state';
import { IApiButtonContainerState } from '../common';

/**
 * @description 额外按钮接口
 * @export
 * @interface IApiExtraButton
 */
export interface IApiExtraButton {
  /**
   * @description 唯一标识
   * @type {string}
   * @memberof IApiExtraButton
   */
  id: string;

  /**
   * @description 应用标识
   * @type {string}
   * @memberof IApiExtraButton
   */
  appId: string;

  /**
   * @description 按钮类型
   * @type {'extra'}
   * @memberof IApiExtraButton
   */
  buttonType: 'extra';

  /**
   * @description 标题
   * @type {string}
   * @memberof IApiExtraButton
   */
  caption: string;

  /**
   * @description 悬浮提示文字
   * @type {string}
   * @memberof IApiExtraButton
   */
  tooltip: string;

  /**
   * @description 图标类型
   * @type {IApiData}
   * @memberof IApiExtraButton
   */
  icon?: IApiData;
}

/**
 * @description 额外按钮集合
 * @export
 * @type IApiExtraButtons
 */
export type IApiExtraButtons = {
  [p: string | number]: IApiExtraButton[];
};

/**
 * @primary
 * @description 工具栏状态接口
 * @export
 * @interface IApiToolbarState
 * @extends {IApiControlState}
 */
export interface IApiToolbarState extends IApiControlState {
  /**
   * @description 工具栏按钮状态
   * @type {IButtonContainerState}
   * @default {}
   * @memberof IApiToolbarState
   */
  buttonsState: IApiButtonContainerState;

  /**
   * @description 额外按钮集合，额外按钮会添加在所有按钮前面或后面
   * @type {IExtraButtons}
   * @default {}
   * @memberof IApiToolbarState
   */
  extraButtons: IApiExtraButtons;

  /**
   * @description 计数器数据
   * @type {IApiData}
   * @default {}
   * @memberof IApiToolbarState
   */
  counterData: IApiData;
}
