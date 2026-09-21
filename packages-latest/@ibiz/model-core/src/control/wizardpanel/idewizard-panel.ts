import { IControlAction } from '../icontrol-action';
import { IDEEditForm } from '../form/ideedit-form';
import { IWizardPanel } from './iwizard-panel';
import { IDEWizard } from '../../dataentity/wizard/idewizard';

/**
 *
 * 实体向导面板部件模型对象接口
 * 继承父接口类型值[WIZARDPANEL]
 * @export
 * @interface IDEWizardPanel
 */
export interface IDEWizardPanel extends IWizardPanel {
  /**
   * 完成行为
   *
   * @type {IControlAction}
   * 来源  getFinishPSControlAction
   */
  finishControlAction?: IControlAction;

  /**
   * 初始化行为
   *
   * @type {IControlAction}
   * 来源  getInitPSControlAction
   */
  initControlAction?: IControlAction;

  /**
   * 实体编辑表单集合
   *
   * @type {IDEEditForm[]}
   * 来源  getPSDEEditForms
   */
  deeditForms?: IDEEditForm[];

  /**
   * 实体向导对象
   *
   * @type {IDEWizard}
   * 来源  getPSDEWizard
   */
  dewizard?: IDEWizard;

  /**
   * 状态应用实体属性
   *
   * @type {string}
   * 来源  getStatePSAppDEField
   */
  stateAppDEFieldId?: string;

  /**
   * 显示操作栏
   * @type {boolean}
   * 来源  isShowActionBar
   */
  showActionBar?: boolean;

  /**
   * 显示步骤栏
   * @type {boolean}
   * 来源  isShowStepBar
   */
  showStepBar?: boolean;
}
