import { IControlAction } from '../icontrol-action';
import { IDEEditForm } from './ideedit-form';
import { IDEWizardForm } from '../../dataentity/wizard/idewizard-form';

/**
 *
 * 实体向导编辑表单模型对象接口
 * 继承父接口类型值[FORM]
 * @export
 * @interface IDEWizardEditForm
 */
export interface IDEWizardEditForm extends IDEEditForm {
  /**
   * 回退数据行为
   *
   * @type {IControlAction}
   * 来源  getGoBackPSControlAction
   */
  goBackControlAction?: IControlAction;

  /**
   * 实体向导表单对象
   *
   * @type {IDEWizardForm}
   * 来源  getPSDEWizardForm
   */
  dewizardForm?: IDEWizardForm;
}
