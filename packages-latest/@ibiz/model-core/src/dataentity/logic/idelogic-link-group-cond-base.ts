import { IDELogicLinkCondBase } from './idelogic-link-cond-base';

/**
 *
 * 实体逻辑连接组合条件模型基础对象接口
 * @export
 * @interface IDELogicLinkGroupCondBase
 */
export interface IDELogicLinkGroupCondBase extends IDELogicLinkCondBase {
  /**
   * 组合条件
   * @description 值模式 [组合条件操作] {AND：与(AND)、 OR：或(OR) }
   * @type {( string | 'AND' | 'OR')}
   * 来源  getGroupOP
   */
  groupOP?: string | 'AND' | 'OR';

  /**
   * 逻辑取反
   * @type {boolean}
   * @default false
   * 来源  isNotMode
   */
  notMode?: boolean;
}
