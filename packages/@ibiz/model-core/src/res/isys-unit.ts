import { ILanguageRes } from './ilanguage-res';
import { IModelObject } from '../imodel-object';

/**
 *
 * @export
 * @interface ISysUnit
 */
export interface ISysUnit extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 名称语言资源对象
   *
   * @type {ILanguageRes}
   * 来源  getNamePSLanguageRes
   */
  nameLanguageRes?: ILanguageRes;

  /**
   * 单位标记
   * @type {string}
   * 来源  getUnitTag
   */
  unitTag?: string;

  /**
   * 单位标记2
   * @type {string}
   * 来源  getUnitTag2
   */
  unitTag2?: string;
}
