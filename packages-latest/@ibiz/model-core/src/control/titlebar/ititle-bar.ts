import { IControl } from '../icontrol';
import { ILanguageRes } from '../../res/ilanguage-res';
import { ISysImage } from '../../res/isys-image';

/**
 *
 * 标题栏部件模型对象基础接口
 * @export
 * @interface ITitleBar
 */
export interface ITitleBar extends IControl {
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
   * 图标资源
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 标题栏样式
   * @description 值模式 [系统标题栏样式] {USER：用户自定义、 USER2：用户自定义2 }
   * @type {( string | 'USER' | 'USER2')}
   * 来源  getTitleBarStyle
   */
  titleBarStyle?: string | 'USER' | 'USER2';

  /**
   * 标题栏类型
   * @type {string}
   * 来源  getTitleBarType
   */
  titleBarType?: string;
}
