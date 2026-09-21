import { IDEDQCondition } from './idedqcondition';

/**
 *
 * 继承父接口类型值[CUSTOM]
 * @export
 * @interface IDEDQCustomCondition
 */
export interface IDEDQCustomCondition extends IDEDQCondition {
  /**
   * 自定义条件
   * @type {string}
   * 来源  getCondition
   */
  condition?: string;

  /**
   * 自定义条件
   * @type {string}
   * 来源  getCustomType
   */
  customType?: string;
}
