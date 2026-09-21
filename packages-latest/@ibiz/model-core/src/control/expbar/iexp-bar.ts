import { IAjaxControl } from '../iajax-control';
import { IControlContainer } from '../icontrol-container';
import { ILanguageRes } from '../../res/ilanguage-res';
import { ISysImage } from '../../res/isys-image';

/**
 *
 * 导航栏模型基础对象接口
 * 继承父接口类型值[EXPBAR]
 * @export
 * @interface IExpBar
 */
export interface IExpBar extends IAjaxControl, IControlContainer {
  /**
   * 应用计数器引用
   *
   * @type {string}
   * 来源  getPSAppCounterRef
   */
  appCounterRefId?: string;

  /**
   * 标题图标
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;

  /**
   * 抬头
   * @type {string}
   * 来源  getTitle
   */
  title?: string;

  /**
   * 抬头语言资源对象
   *
   * @type {ILanguageRes}
   * 来源  getTitlePSLanguageRes
   */
  titleLanguageRes?: ILanguageRes;

  /**
   * 导航栏数据部件名称
   * @type {string}
   * 来源  getXDataControlName
   */
  xdataControlName?: string;

  /**
   * 支持计数器
   * @type {boolean}
   * 来源  isEnableCounter
   */
  enableCounter?: boolean;

  /**
   * 支持搜索
   * @type {boolean}
   * 来源  isEnableSearch
   */
  enableSearch?: boolean;

  /**
   * 显示标题栏
   * @type {boolean}
   * 来源  isShowTitleBar
   */
  showTitleBar?: boolean;
}
