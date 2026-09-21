import { IModelObject } from '../../imodel-object';
/**
 *
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
