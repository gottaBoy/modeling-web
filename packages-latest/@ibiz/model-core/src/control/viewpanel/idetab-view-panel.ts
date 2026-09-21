import { ITabExpPage } from '../expbar/itab-exp-page';
import { IDEViewPanel } from './ideview-panel';
import { IDERBase } from '../../dataentity/der/iderbase';
import { ISysImage } from '../../res/isys-image';

/**
 *
 * 实体分页视图面板模型对象接口
 * 继承父接口类型值[TABVIEWPANEL]
 * @export
 * @interface IDETabViewPanel
 */
export interface IDETabViewPanel extends IDEViewPanel, ITabExpPage {
  /**
   * 计数器标识
   * @type {string}
   * 来源  getCounterId
   */
  counterId?: string;

  /**
   * 导航过滤项
   * @type {string}
   * 来源  getNavFilter
   */
  navFilter?: string;

  /**
   * 导航关系对象
   *
   * @type {IDERBase}
   * 来源  getNavPSDER
   */
  navDER?: IDERBase;

  /**
   * 应用计数器引用
   *
   * @type {string}
   * 来源  getPSAppCounterRef
   */
  appCounterRefId?: string;

  /**
   * 访问操作标识
   *
   * @type {string}
   * 来源  getPSDEOPPriv
   */
  deopprivId?: string;

  /**
   * 标题图标
   *
   * @type {ISysImage}
   * 来源  getPSSysImage
   */
  sysImage?: ISysImage;
}
