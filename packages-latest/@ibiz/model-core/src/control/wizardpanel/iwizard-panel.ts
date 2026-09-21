import { IAjaxControl } from '../iajax-control';
import { IControlContainer } from '../icontrol-container';

/**
 *
 * 向导面板部件模型对象基础接口
 * @export
 * @interface IWizardPanel
 */
export interface IWizardPanel extends IAjaxControl, IControlContainer {
  /**
   * 内置式样
   * @type {string}
   * 来源  getWizardStyle
   */
  wizardStyle?: string;
}
