import { IDEWizardForm } from './idewizard-form';
import { IDEWizardStep } from './idewizard-step';
import { ILanguageRes } from '../../res/ilanguage-res';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体向导模型对象接口
 * @export
 * @interface IDEWizard
 */
export interface IDEWizard extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 完成标题语言资源标识
   * @type {string}
   * 来源  getFinishCapLanResTag
   */
  finishCapLanResTag?: string;

  /**
   * 完成标题语言资源
   *
   * @type {ILanguageRes}
   * 来源  getFinishCapPSLanguageRes
   */
  finishCapLanguageRes?: ILanguageRes;

  /**
   * 完成标题
   * @type {string}
   * 来源  getFinishCaption
   */
  finishCaption?: string;

  /**
   * 首向导表单
   *
   * @type {string}
   * 来源  getFirstPSDEWizardForm
   */
  firstDEWizardFormId?: string;

  /**
   * 下一步标题语言资源标识
   * @type {string}
   * 来源  getNextCapLanResTag
   */
  nextCapLanResTag?: string;

  /**
   * 下一步标题语言资源
   *
   * @type {ILanguageRes}
   * 来源  getNextCapPSLanguageRes
   */
  nextCapLanguageRes?: ILanguageRes;

  /**
   * 下一步标题
   * @type {string}
   * 来源  getNextCaption
   */
  nextCaption?: string;

  /**
   * 实体向导表单集合
   *
   * @type {IDEWizardForm[]}
   * 来源  getPSDEWizardForms
   */
  dewizardForms?: IDEWizardForm[];

  /**
   * 实体向导步骤集合
   *
   * @type {IDEWizardStep[]}
   * 来源  getPSDEWizardSteps
   */
  dewizardSteps?: IDEWizardStep[];

  /**
   * 上一步标题语言资源标识
   * @type {string}
   * 来源  getPrevCapLanResTag
   */
  prevCapLanResTag?: string;

  /**
   * 上一步标题语言资源
   *
   * @type {ILanguageRes}
   * 来源  getPrevCapPSLanguageRes
   */
  prevCapLanguageRes?: ILanguageRes;

  /**
   * 上一步标题
   * @type {string}
   * 来源  getPrevCaption
   */
  prevCaption?: string;

  /**
   * 向导样式
   * @description 值模式 [向导样式] {DEFAULT：默认样式、 STYLE2：样式2、 STYLE3：样式3、 STYLE4：样式4 }
   * @type {( string | 'DEFAULT' | 'STYLE2' | 'STYLE3' | 'STYLE4')}
   * 来源  getWizardStyle
   */
  wizardStyle?: string | 'DEFAULT' | 'STYLE2' | 'STYLE3' | 'STYLE4';

  /**
   * 启用主状态迁移逻辑
   * @type {boolean}
   * @default false
   * 来源  isEnableMainStateLogic
   */
  enableMainStateLogic?: boolean;

  /**
   * 状态向导
   * @type {boolean}
   * 来源  isStateWizard
   */
  stateWizard?: boolean;
}
