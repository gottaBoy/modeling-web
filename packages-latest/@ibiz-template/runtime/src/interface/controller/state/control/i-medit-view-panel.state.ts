import { IApiMEditViewPanelState, IApiPanelUiItem } from '../../../api';
import { IMDControlState } from './i-md-control.state';

/**
 * @description 面板UI项接口
 * @export
 * @interface IPanelUiItem
 * @extends {IApiPanelUiItem}
 */
export interface IPanelUiItem extends IApiPanelUiItem {}

/**
 * @description 多编辑视图面板部件状态
 * @export
 * @interface IMEditViewPanelState
 * @extends {IMDControlState}
 * @extends {IApiMEditViewPanelState}
 */
export interface IMEditViewPanelState
  extends IMDControlState,
    IApiMEditViewPanelState {
  /**
   * @description 是否需要滚动
   * @type {boolean}
   * @memberof IMEditViewPanelState
   */
  isNeedScroll: boolean;
}
