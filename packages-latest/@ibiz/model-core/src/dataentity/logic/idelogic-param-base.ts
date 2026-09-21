import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体逻辑参数模型基础对象接口
 * @export
 * @interface IDELogicParamBase
 */
export interface IDELogicParamBase extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 默认参数
   * @type {boolean}
   * @default false
   * 来源  isDefault
   */
  default?: boolean;
}
