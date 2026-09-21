import { IApiWizardPanelState } from '../../../api';
import { IButtonContainerState } from '../../common';
import { IControlState } from './i-control.state';

/**
 * @description 向导面板状态
 * @export
 * @interface IWizardPanelState
 * @extends {IControlState}
 * @extends {IApiWizardPanelState}
 */
export interface IWizardPanelState extends IControlState, IApiWizardPanelState {
  /**
   * @description 向导面板按钮状态
   * @type {IButtonContainerState}
   * @memberof IWizardPanelState
   */
  buttonsState: IButtonContainerState;
}
