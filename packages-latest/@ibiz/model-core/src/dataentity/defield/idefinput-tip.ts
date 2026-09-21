import { ILanguageRes } from '../../res/ilanguage-res';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体属性输入提示模型对象接口
 * @export
 * @interface IDEFInputTip
 */
export interface IDEFInputTip extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 内容
   * @type {string}
   * 来源  getContent
   */
  content?: string;

  /**
   * 内容语言资源
   *
   * @type {ILanguageRes}
   * 来源  getContentPSLanguageRes
   */
  contentLanguageRes?: ILanguageRes;

  /**
   * Html内容
   * @type {string}
   * 来源  getHtmlContent
   */
  htmlContent?: string;

  /**
   * 直接内容
   * @type {string}
   * 来源  getRawContent
   */
  rawContent?: string;

  /**
   * 提示模式
   * @type {string}
   * 来源  getTipMode
   */
  tipMode?: string;

  /**
   * 唯一标记
   * @type {string}
   * 来源  getUniqueTag
   */
  uniqueTag?: string;

  /**
   * 属性默认输入提示
   * @type {boolean}
   * 来源  isDefault
   */
  default?: boolean;
}
