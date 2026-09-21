import { INavigateContext } from './inavigate-context';
import { INavigateParam } from './inavigate-param';
import { IModelObject } from '../imodel-object';

/**
 *
 * 导航参数容器基础对象接口
 * @export
 * @interface INavigateParamContainer
 */
export interface INavigateParamContainer extends IModelObject {
  /**
   * 导航上下文集合
   *
   * @type {INavigateContext[]}
   * 来源  getPSNavigateContexts
   */
  navigateContexts?: INavigateContext[];

  /**
   * 导航参数集合
   *
   * @type {INavigateParam[]}
   * 来源  getPSNavigateParams
   */
  navigateParams?: INavigateParam[];
}
