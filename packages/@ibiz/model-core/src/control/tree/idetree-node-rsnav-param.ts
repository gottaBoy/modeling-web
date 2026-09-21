import { INavigateParam } from '../inavigate-param';
import { IDETreeNodeRSParam } from './idetree-node-rsparam';

/**
 *
 * @export
 * @interface IDETreeNodeRSNavParam
 */
export interface IDETreeNodeRSNavParam
  extends IDETreeNodeRSParam,
    INavigateParam {
  /**
   * 直接值
   * @type {boolean}
   * 来源  isRawValue
   */
  rawValue?: boolean;
}
