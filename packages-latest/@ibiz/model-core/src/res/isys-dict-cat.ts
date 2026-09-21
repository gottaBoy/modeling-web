import { IModelObject } from '../imodel-object';

/**
 *
 * @export
 * @interface ISysDictCat
 */
export interface ISysDictCat extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 词条分类标记
   * @type {string}
   * 来源  getDictCatTag
   */
  dictCatTag?: string;

  /**
   * 词条分类标记2
   * @type {string}
   * 来源  getDictCatTag2
   */
  dictCatTag2?: string;

  /**
   * 用户词典
   * @type {boolean}
   * 来源  isUserDictCat
   */
  userDictCat?: boolean;
}
