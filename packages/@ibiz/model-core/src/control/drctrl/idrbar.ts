import { IControlContainer } from '../icontrol-container';
import { IDRCtrl } from './idrctrl';
import { ILanguageRes } from '../../res/ilanguage-res';

/**
 *
 * @export
 * @interface IDRBar
 */
export interface IDRBar extends IDRCtrl, IControlContainer {
  /**
   * 抬头
   * @type {string}
   * 来源  getTitle
   */
  title?: string;

  /**
   * 抬头语言资源
   *
   * @type {ILanguageRes}
   * 来源  getTitlePSLanguageRes
   */
  titleLanguageRes?: ILanguageRes;

  /**
   * 显示标题
   * @type {boolean}
   * 来源  isShowTitle
   */
  showTitle?: boolean;
}
