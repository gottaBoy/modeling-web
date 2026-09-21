import { IControl } from '../icontrol';
import { INavigateParamContainer } from '../inavigate-param-container';
import { ILanguageRes } from '../../res/ilanguage-res';

/**
 *
 * 实体视图面板模型对象接口
 * 继承父接口类型值[VIEWPANEL]
 * @export
 * @interface IDEViewPanel
 */
export interface IDEViewPanel extends IControl, INavigateParamContainer {
  /**
   * 标题语言资源对象
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
   * 嵌入视图对象
   *
   * @type {string}
   * 来源  getEmbeddedPSAppDEView
   */
  embeddedAppDEViewId?: string;
}
