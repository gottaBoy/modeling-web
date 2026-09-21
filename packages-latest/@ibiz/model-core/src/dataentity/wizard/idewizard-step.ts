import { ILanguageRes } from '../../res/ilanguage-res';
import { ISysCss } from '../../res/isys-css';
import { ISysImage } from '../../res/isys-image';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体向导步骤模型对象接口
 * @export
 * @interface IDEWizardStep
 */
export interface IDEWizardStep extends IModelObject {
  /**
   * 图标资源对象
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 步骤标识
   * @type {string}
   * 来源  getStepTag
   */
  stepTag?: string;

  /**
   * 子抬头
   * @type {string}
   * 来源  getSubTitle
   */
  subTitle?: string;

  /**
   * 子抬头语言资源对象
   *
   * @type {ILanguageRes}
   * 来源  getSubTitlePSLanguageRes
   */
  subTitleLanguageRes?: ILanguageRes;

  /**
   * 抬头
   * @type {string}
   * 来源  getTitle
   */
  title?: string;

  /**
   * 抬头语言资源对象
   *
   * @type {ILanguageRes}
   * 来源  getTitlePSLanguageRes
   */
  titleLanguageRes?: ILanguageRes;

  /**
   * 抬头样式表对象
   *
   * @type {ISysCss}
   * 来源  getTitlePSSysCss
   */
  titleSysCss?: ISysCss;

  /**
   * 支持链接
   * @type {boolean}
   * 来源  isEnableLink
   */
  enableLink?: boolean;
}
