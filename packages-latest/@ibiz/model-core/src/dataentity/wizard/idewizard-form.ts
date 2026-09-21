import { ILanguageRes } from '../../res/ilanguage-res';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体向导表单模型对象接口
 * @export
 * @interface IDEWizardForm
 */
export interface IDEWizardForm extends IModelObject {
  /**
   * 下一步确认信息2语言资源
   *
   * @type {ILanguageRes}
   * 来源  getCM2PSLanguageRes
   */
  cm2LanguageRes?: ILanguageRes;

  /**
   * 下一步确认信息语言资源
   *
   * @type {ILanguageRes}
   * 来源  getCMPSLanguageRes
   */
  cmlanguageRes?: ILanguageRes;

  /**
   * 下一步确认信息
   * @type {string}
   * 来源  getConfirmMsg
   */
  confirmMsg?: string;

  /**
   * 下一步确认信息2
   * @type {string}
   * 来源  getConfirmMsg2
   */
  confirmMsg2?: string;

  /**
   * 向导表单标记
   * @type {string}
   * 来源  getFormTag
   */
  formTag?: string;

  /**
   * 完成启用脚本代码
   * @type {string}
   * 来源  getGoFinishEnableScriptCode
   */
  goFinishEnableScriptCode?: string;

  /**
   * 下一步启用脚本代码
   * @type {string}
   * 来源  getGoNextEnableScriptCode
   */
  goNextEnableScriptCode?: string;

  /**
   * 上一步启用脚本代码
   * @type {string}
   * 来源  getGoPrevEnableScriptCode
   */
  goPrevEnableScriptCode?: string;

  /**
   * 实体表单名称
   * @type {string}
   * 来源  getPSDEFormName
   */
  deformName?: string;

  /**
   * 向导步骤对象
   *
   * @type {string}
   * 来源  getPSDEWizardStep
   */
  dewizardStepId?: string;

  /**
   * 向导步骤行为
   *
   * 来源 getStepActions
   */
  stepActions?: string[];

  /**
   * 向导步骤标记
   * @type {string}
   * 来源  getStepTag
   */
  stepTag?: string;

  /**
   * 首表单
   * @type {boolean}
   * 来源  isFirstForm
   */
  firstForm?: boolean;
}
