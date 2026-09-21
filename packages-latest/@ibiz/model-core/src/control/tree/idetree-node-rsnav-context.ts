import { INavigateContext } from '../inavigate-context';
import { IDETreeNodeRSNavParam } from './idetree-node-rsnav-param';

/**
 *
 * 实体树节点关系导航上下文模型对象接口
 * @export
 * @interface IDETreeNodeRSNavContext
 */
export interface IDETreeNodeRSNavContext
  extends IDETreeNodeRSNavParam,
    INavigateContext {}
