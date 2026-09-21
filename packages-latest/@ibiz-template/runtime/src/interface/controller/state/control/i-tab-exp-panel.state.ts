import { IApiTabExpPanelPagesState, IApiTabExpPanelState } from '../../../api';
import { IControlState } from './i-control.state';

/**
 * @description 分页导航面板状态接口
 * @export
 * @interface ITabExpPanelState
 * @extends {IControlState}
 */
export interface ITabExpPanelState
  extends IControlState,
    IApiTabExpPanelState {}

/**
 * @description 分页状态
 * @export
 * @interface ITabExpPanelPagesState
 */
export interface ITabExpPanelPagesState extends IApiTabExpPanelPagesState {}
