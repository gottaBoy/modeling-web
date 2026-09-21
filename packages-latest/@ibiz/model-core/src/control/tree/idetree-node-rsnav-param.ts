import { INavigateParam } from '../inavigate-param';
import { IDETreeNodeRSParam } from './idetree-node-rsparam';

/**
 *
 * 实体树节点关系导航参数模型对象接口
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
