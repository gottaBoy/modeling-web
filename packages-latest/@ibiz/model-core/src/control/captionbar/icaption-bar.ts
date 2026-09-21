import { IControl } from '../icontrol';
import { ILanguageRes } from '../../res/ilanguage-res';
import { ISysImage } from '../../res/isys-image';

/**
 *
 * 标题栏模型基础对象接口
 * 继承父接口类型值[CAPTIONBAR]
 * @export
 * @interface ICaptionBar
 */
export interface ICaptionBar extends IControl {
  /**
   * 标题语言资源
   *
   * @type {ILanguageRes}
   * 来源  getCapPSLanguageRes
   */
  capLanguageRes?: ILanguageRes;

  /**
   * 标题
   * @type {string}
   * 来源  getCaption
   */
  caption?: string;

  /**
   * 图标对象
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 子标题语言资源
   *
   * @type {ILanguageRes}
   * 来源  getSubCapPSLanguageRes
   */
  subCapLanguageRes?: ILanguageRes;

  /**
   * 视图子标题
   * @type {string}
   * 来源  getSubCaption
   */
  subCaption?: string;
}
