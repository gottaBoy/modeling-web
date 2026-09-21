import { INavigateParamContainer } from './inavigate-param-container';
import { IDERBase } from '../dataentity/der/iderbase';

/**
 *
 * 支持导航部件模型对象接口
 * @export
 * @interface INavigatable
 */
export interface INavigatable extends INavigateParamContainer {
  /**
   * 导航视图过滤项
   * @type {string}
   * 来源  getNavFilter
   */
  navFilter?: string;

  /**
   * 导航视图对象
   *
   * @type {string}
   * 来源  getNavPSAppView
   */
  navAppViewId?: string;

  /**
   * 导航关系
   *
   * @type {IDERBase}
   * 来源  getNavPSDER
   */
  navDER?: IDERBase;

  /**
   * 导航视图参数
   * @type {IModel}
   * 来源  getNavViewParamJO
   */
  navViewParamJO?: IModel;
}
