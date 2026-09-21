import { IModelObject } from '../../imodel-object';

/**
 *
 * @export
 * @interface IDEFieldBase
 */
export interface IDEFieldBase extends IModelObject {
  /**
   * 最大值（字符串）
   * @type {string}
   * 来源  getMaxValueString
   */
  maxValueString?: string;

  /**
   * 最小字符串长度
   * @type {number}
   * @default 0
   * 来源  getMinStringLength
   */
  minStringLength?: number;

  /**
   * 最小值（字符串）
   * @type {string}
   * 来源  getMinValueString
   */
  minValueString?: string;

  /**
   * 数据精度
   * @type {number}
   * @default 0
   * 来源  getPrecision
   */
  precision?: number;

  /**
   * 字符串长度
   * @type {number}
   * @default 0
   * 来源  getStringLength
   */
  stringLength?: number;
}
