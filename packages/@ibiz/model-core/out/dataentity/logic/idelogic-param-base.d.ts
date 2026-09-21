import { IModelObject } from '../../imodel-object';
/**
 *
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
