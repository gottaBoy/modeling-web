import { ILanguageRes } from '../../res/ilanguage-res';
import { ISysCss } from '../../res/isys-css';
import { ISysImage } from '../../res/isys-image';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 应用门户部件分类模型对象接口
 * @export
 * @interface IAppPortletCat
 */
export interface IAppPortletCat extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 名称语言资源
   *
   * @type {ILanguageRes}
   * 来源  getNamePSLanguageRes
   */
  nameLanguageRes?: ILanguageRes;

  /**
   * 系统界面样式表
   *
   * @type {ISysCss}
   * 来源  getPSSysCss
   */
  sysCss?: ISysCss;

  /**
   * 系统图片
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 未分组分类
   * @type {boolean}
   * @default false
   * 来源  isUngroup
   */
  ungroup?: boolean;
}
