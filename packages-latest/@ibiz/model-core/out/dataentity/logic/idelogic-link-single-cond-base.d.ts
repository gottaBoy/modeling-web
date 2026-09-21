import { IDELogicLinkCondBase } from './idelogic-link-cond-base';
import { IDELogicParamBase } from './idelogic-param-base';
/**
 *
 * 实体逻辑连接单项条件模型基础对象接口
 * @export
 * @interface IDELogicLinkSingleCondBase
 */
export interface IDELogicLinkSingleCondBase extends IDELogicLinkCondBase {
    /**
     * 值操作
     * @description 值模式 [开发语言条件操作] {EQ：等于(=)、 NOTEQ：不等于(<>)、 GT：大于(>)、 GTANDEQ：大于等于(>=)、 LT：小于(<)、 LTANDEQ：小于等于(<=)、 ISNULL：值为空(Nil)、 ISNOTNULL：值不为空(NotNil)、 TESTNULL：空值判断(TestNil)、 LIKE：文本包含(%)、 LEFTLIKE：文本左包含(%#)、 RIGHTLIKE：文本右包含(#%)、 USERLIKE：自定义文本包含(%)、 IN：值在范围中(In)、 NOTIN：值不在范围中(NotIn)、 EXISTS：存在引用数据(Exists)、 EXISTSX：存在引用数据(ExistsX)（条件）、 BITAND：位与操作（BitAnd）(仅限整数形）、 CHILDOF：子数据（递归）、 CONTAINS：包含属性(Contains) }
     * @type {( string | 'EQ' | 'NOTEQ' | 'GT' | 'GTANDEQ' | 'LT' | 'LTANDEQ' | 'ISNULL' | 'ISNOTNULL' | 'TESTNULL' | 'LIKE' | 'LEFTLIKE' | 'RIGHTLIKE' | 'USERLIKE' | 'IN' | 'NOTIN' | 'EXISTS' | 'EXISTSX' | 'BITAND' | 'CHILDOF' | 'CONTAINS')}
     * 来源  getCondOP
     */
    condOP?: string | 'EQ' | 'NOTEQ' | 'GT' | 'GTANDEQ' | 'LT' | 'LTANDEQ' | 'ISNULL' | 'ISNOTNULL' | 'TESTNULL' | 'LIKE' | 'LEFTLIKE' | 'RIGHTLIKE' | 'USERLIKE' | 'IN' | 'NOTIN' | 'EXISTS' | 'EXISTSX' | 'BITAND' | 'CHILDOF' | 'CONTAINS';
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
     * @description 值模式 [实体逻辑连接条件参数类型] {ENTITYFIELD：目标逻辑参数属性、 SRCENTITYFIELD：源逻辑参数属性、 SRCDLPARAM：源逻辑参数、 CURTIME：当前时间、 LASTRETURN：上一次调用返回 }
     * @type {( string | 'ENTITYFIELD' | 'SRCENTITYFIELD' | 'SRCDLPARAM' | 'CURTIME' | 'LASTRETURN')}
     * 来源  getParamType
     */
    paramType?: string | 'ENTITYFIELD' | 'SRCENTITYFIELD' | 'SRCDLPARAM' | 'CURTIME' | 'LASTRETURN';
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
