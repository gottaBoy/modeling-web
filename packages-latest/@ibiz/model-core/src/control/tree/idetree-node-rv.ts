import { INavigateParamContainer } from '../inavigate-param-container';

/**
 *
 * 实体树视图节点引用视图模型对象接口
 * @export
 * @interface IDETreeNodeRV
 */
export interface IDETreeNodeRV extends INavigateParamContainer {
  /**
   * 引用视图
   *
   * @type {string}
   * 来源  getRefPSAppView
   */
  refAppViewId?: string;
}
