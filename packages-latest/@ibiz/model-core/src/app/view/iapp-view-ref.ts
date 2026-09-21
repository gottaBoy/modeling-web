import { INavigateParamContainer } from '../../control/inavigate-param-container';
import { ILanguageRes } from '../../res/ilanguage-res';

/**
 *
 * 应用视图引用模型对象接口
 * @export
 * @interface IAppViewRef
 */
export interface IAppViewRef extends INavigateParamContainer {
  /**
   * 引用视图高度
   * @type {number}
   * @default 0
   * 来源  getHeight
   */
  height?: number;

  /**
   * 打开模式
   * @type {string}
   * 来源  getOpenMode
   */
  openMode?: string;

  /**
   * 引用者
   * @type {IModel}
   * 来源  getOwner
   */
  owner?: IModel;

  /**
   * 视图父数据对象
   * @type {IModel}
   * 来源  getParentDataJO
   */
  parentDataJO?: IModel;

  /**
   * 引用视图打开模式
   * @type {string}
   * 来源  getRealOpenMode
   */
  realOpenMode?: string;

  /**
   * 引用视图标题
   * @type {string}
   * 来源  getRealTitle
   */
  realTitle?: string;

  /**
   * 引用视图标题语言资源
   *
   * @type {ILanguageRes}
   * 来源  getRealTitlePSLanguageRes
   */
  realTitleLanguageRes?: ILanguageRes;

  /**
   * 引用视图
   *
   * @type {string}
   * 来源  getRefPSAppView
   */
  refAppViewId?: string;

  /**
   * 视图参数JO对象
   * @type {IModel}
   * 来源  getViewParamJO
   */
  viewParamJO?: IModel;

  /**
   * 引用视图宽度
   * @type {number}
   * @default 0
   * 来源  getWidth
   */
  width?: number;
}
