import { IDELogicNodeParamBase } from './idelogic-node-param-base';
/**
 *
 * @export
 * @interface IDEUILogicNodeParam
 */
export interface IDEUILogicNodeParam extends IDELogicNodeParamBase {
    /**
     * 目标逻辑参数
     *
     * @type {string}
     * 来源  getDstPSDEUILogicParam
     */
    dstDEUILogicParamId?: string;
    /**
     * 表达式
     * @type {string}
     * 来源  getExpression
     */
    expression?: string;
    /**
     * 源逻辑参数
     *
     * @type {string}
     * 来源  getSrcPSDEUILogicParam
     */
    srcDEUILogicParamId?: string;
}
