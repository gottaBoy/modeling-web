import { IModelObject } from '../imodel-object';

/**
 *
 * @export
 * @interface ILanguageItem
 */
export interface ILanguageItem extends IModelObject {
  /**
   * 内容
   * @type {string}
   * 来源  getContent
   */
  content?: string;

  /**
   * 语言资源标记
   * @type {string}
   * 来源  getLanResTag
   */
  lanResTag?: string;
}
