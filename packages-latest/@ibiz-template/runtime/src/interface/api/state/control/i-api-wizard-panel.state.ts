import { IApiControlState } from './i-api-control.state';

/**
 * @description 向导面板状态
 * @primary
 * @export
 * @interface IApiWizardPanelState
 * @extends {IApiControlState}
 */
export interface IApiWizardPanelState extends IApiControlState {
  /**
   * @description 当前激活的向导表单的表单标识
   * @type {string}
   * @default ''
   * @memberof IApiWizardPanelState
   */
  activeFormTag: string;
}
