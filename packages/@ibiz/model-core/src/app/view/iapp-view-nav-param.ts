import { IAppViewParam } from './iapp-view-param';
import { INavigateParam } from '../../control/inavigate-param';

/**
 *
 * @export
 * @interface IAppViewNavParam
 */
export interface IAppViewNavParam extends IAppViewParam, INavigateParam {
  /**
   * 直接值
   * @type {boolean}
   * 来源  isRawValue
   */
  rawValue?: boolean;
}
