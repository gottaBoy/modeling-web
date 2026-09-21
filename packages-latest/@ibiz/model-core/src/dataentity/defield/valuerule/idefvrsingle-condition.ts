import { IDEFVRCondition } from './idefvrcondition';

/**
 *
 * @export
 * @interface IDEFVRSingleCondition
 */
export interface IDEFVRSingleCondition extends IDEFVRCondition {
  /**
   * 属性名称
   * @type {string}
   * 来源  getDEFName
   */
  defname?: string;
}
