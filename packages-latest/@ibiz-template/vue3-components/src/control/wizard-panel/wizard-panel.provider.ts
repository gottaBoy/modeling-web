import { IControlProvider } from '@ibiz-template/runtime';

/**
 * 向导面板适配器
 *
 * @author lxm
 * @date 2022-10-25 18:10:57
 * @export
 * @class WizardPanelProvider
 * @implements {IControlProvider}
 */
export class WizardPanelProvider implements IControlProvider {
  component: string = 'IBizWizardPanelControl';
}
