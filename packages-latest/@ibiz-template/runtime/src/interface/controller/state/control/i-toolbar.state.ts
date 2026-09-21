import { ViewMode } from '../../../../constant';
import {
  IApiExtraButton,
  IApiExtraButtons,
  IApiToolbarState,
} from '../../../api';
import { IControlState } from './i-control.state';

/**
 * @description 工具栏状态接口
 * @export
 * @interface IToolbarState
 * @extends {IControlState}
 * @extends {IApiToolbarState}
 */
export interface IToolbarState extends IControlState, IApiToolbarState {
  /**
   * @description 是否手动计算按钮状态（工具栏自身默认不计算）
   * @type {boolean}
   * @memberof IToolbarState
   */
  manualCalcButtonState: boolean;

  /**
   * @description 视图模式
   * @type {ViewMode}
   * @memberof IToolbarState
   */
  viewMode: ViewMode;

  /**
   * @description 需要隐藏的分隔符标识集合
   * @type {string[]}
   * @memberof IToolbarState
   */
  hideSeparator: string[];
}

/**
 * @description 额外按钮接口类型
 * @export
 * @interface IExtraButton
 * @extends {IApiExtraButton}
 */
export interface IExtraButton extends IApiExtraButton {}

/**
 * @description 额外按钮接口集合
 * @export
 * @type IExtraButtons
 * @extends {IApiExtraButton}
 */
export type IExtraButtons = IApiExtraButtons;
