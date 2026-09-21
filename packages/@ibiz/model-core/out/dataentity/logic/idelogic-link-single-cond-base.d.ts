import { IDELogicLinkCondBase } from './idelogic-link-cond-base';
import { IDELogicParamBase } from './idelogic-param-base';
/**
 *
 * @export
 * @interface IDELogicLinkSingleCondBase
 */
export interface IDELogicLinkSingleCondBase extends IDELogicLinkCondBase {
    /**
     * 值操作
     * @type {string}
     * 来源  getCondOP
     */
    condOP?: string;
    /**
     * 目标属性名称
     * @type {string}
     * 来源  getDstFieldName
     */
    dstFieldName?: string;
    /**
     *
     * @type {IDELogicParamBase}
     * 来源  getDstLogicParam
     */
    dstLogicParam?: IDELogicParamBase;
    /**
     * 参数类型
     * @description 值模式 [实体属性值规则条件参数类型] {ENTITYFIELD：数据对象属性、 CURTIME：当前时间 }
     * @type {( string | 'ENTITYFIELD' | 'CURTIME')}
     * 来源  getParamType
     */
    paramType?: string | 'ENTITYFIELD' | 'CURTIME';
    /**
     * 参数值
     * @type {string}
     * 来源  getParamValue
     */
    paramValue?: string;
    /**
     * 源逻辑参数对象
     *
     * @type {string}
     * 来源  getSrcLogicParam
     */
    srcLogicParamId?: string;
    /**
     * 值（旧）
     * @type {string}
     * 来源  getValue
     */
    value?: string;
}
