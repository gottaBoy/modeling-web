import { IAjaxControl } from '../iajax-control';
import { IControlContainer } from '../icontrol-container';
/**
 *
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
