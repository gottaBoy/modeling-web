import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体树节点关系参数模型对象基础接口
 * @export
 * @interface IDETreeNodeRSParam
 */
export interface IDETreeNodeRSParam extends IModelObject {
  /**
   * 说明
   * @type {string}
   * 来源  getDesc
   */
  desc?: string;

  /**
   * 参数
   * @type {string}
   * 来源  getKey
   */
  key?: string;

  /**
   * 值
   * @type {string}
   * 来源  getValue
   */
  value?: string;
}
