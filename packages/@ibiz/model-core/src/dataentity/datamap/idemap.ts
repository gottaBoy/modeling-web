import { IModelObject } from '../../imodel-object';

/**
 *
 * @export
 * @interface IDEMap
 */
export interface IDEMap extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 逻辑名称
   * @type {string}
   * 来源  getLogicName
   */
  logicName?: string;

  /**
   * 启用
   * @type {boolean}
   * @default true
   * 来源  isValid
   */
  valid?: boolean;
}
