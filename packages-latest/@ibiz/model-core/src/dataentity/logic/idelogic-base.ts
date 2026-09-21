import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体逻辑模型基础对象接口
 * @export
 * @interface IDELogicBase
 */
export interface IDELogicBase extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 默认参数名称
   * @type {string}
   * 来源  getDefaultParamName
   */
  defaultParamName?: string;

  /**
   * 逻辑名称
   * @type {string}
   * 来源  getLogicName
   */
  logicName?: string;
}
