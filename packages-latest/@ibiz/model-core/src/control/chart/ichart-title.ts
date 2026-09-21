import { IChartObject } from './ichart-object';
import { ILanguageRes } from '../../res/ilanguage-res';

/**
 *
 * 图表标题模型对象接口
 * @export
 * @interface IChartTitle
 */
export interface IChartTitle extends IChartObject {
  /**
   * 子标题
   * @type {string}
   * 来源  getSubTitle
   */
  subTitle?: string;

  /**
   * 子标题语言资源
   *
   * @type {ILanguageRes}
   * 来源  getSubTitlePSLanguageRes
   */
  subTitleLanguageRes?: ILanguageRes;

  /**
   * 标题
   * @type {string}
   * 来源  getTitle
   */
  title?: string;

  /**
   * 标题语言资源
   *
   * @type {ILanguageRes}
   * 来源  getTitlePSLanguageRes
   */
  titleLanguageRes?: ILanguageRes;

  /**
   * 标题位置
   * @description 值模式 [图表标题位置] {TOP：上、 BOTTOM：下、 LEFT：左、 RIGHT：右 }
   * @type {( string | 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT')}
   * 来源  getTitlePos
   */
  titlePos?: string | 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT';

  /**
   * 显示标题
   * @type {boolean}
   * 来源  isShowTitle
   */
  showTitle?: boolean;
}
