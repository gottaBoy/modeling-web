import { IModelObject } from '../../imodel-object';
/**
 *
 * 实体行为参数模型对象接口
 * @export
 * @interface IDEActionParam
 */
export interface IDEActionParam extends IModelObject {
    /**
     * 参数描述
     * @type {string}
     * 来源  getParamDesc
     */
    paramDesc?: string;
    /**
     * 参数标记
     * @type {string}
     * 来源  getParamTag
     */
    paramTag?: string;
    /**
     * 参数标记2
     * @type {string}
     * 来源  getParamTag2
     */
    paramTag2?: string;
    /**
     * 标准数据类型
     * @description 值模式 [标准数据类型] {0：UNKNOWN、 1：BIGINT、 2：BINARY、 3：BIT、 4：CHAR、 5：DATETIME、 6：DECIMAL、 7：FLOAT、 8：IMAGE、 9：INT、 10：MONEY、 11：NCHAR、 12：NTEXT、 13：NVARCHAR、 14：NUMERIC、 15：REAL、 16：SMALLDATETIME、 17：SMALLINT、 18：SMALLMONEY、 19：SQL_VARIANT、 20：SYSNAME、 21：TEXT、 22：TIMESTAMP、 23：TINYINT、 24：VARBINARY、 25：VARCHAR、 26：UNIQUEIDENTIFIER、 27：DATE、 28：TIME、 29：BIGDECIMAL、 30：VECTOR、 31：TSVECTOR }
     * @type {( number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31)}
     * 来源  getStdDataType
     */
    stdDataType?: number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
    /**
     * 值或属性
     * @type {string}
     * 来源  getValue
     */
    value?: string;
    /**
     * 值类型
     * @description 值模式 [实体行为参数值类型] {INPUTVALUE：输入值（默认）、 NONEVALUE：无值（不设置）、 PARAM：数据对象属性、 VALUE：指定值、 NULLVALUE：空值、 SESSION：用户全局对象、 APPLICATION：系统全局对象、 UNIQUEID：唯一编码、 CONTEXT：网页请求、 OPERATOR：当前操作用户(编号)、 OPERATORNAME：当前操作用户(名称)、 CURTIME：当前时间、 APPDATA：当前应用数据、 EXPRESSION：表达式、 USER：用户自定义、 USER2：用户自定义2、 USER3：用户自定义3、 USER4：用户自定义4 }
     * @type {( string | 'INPUTVALUE' | 'NONEVALUE' | 'PARAM' | 'VALUE' | 'NULLVALUE' | 'SESSION' | 'APPLICATION' | 'UNIQUEID' | 'CONTEXT' | 'OPERATOR' | 'OPERATORNAME' | 'CURTIME' | 'APPDATA' | 'EXPRESSION' | 'USER' | 'USER2' | 'USER3' | 'USER4')}
     * 来源  getValueType
     */
    valueType?: string | 'INPUTVALUE' | 'NONEVALUE' | 'PARAM' | 'VALUE' | 'NULLVALUE' | 'SESSION' | 'APPLICATION' | 'UNIQUEID' | 'CONTEXT' | 'OPERATOR' | 'OPERATORNAME' | 'CURTIME' | 'APPDATA' | 'EXPRESSION' | 'USER' | 'USER2' | 'USER3' | 'USER4';
    /**
     * 允许空输入
     * @type {boolean}
     * @default true
     * 来源  isAllowEmpty
     */
    allowEmpty?: boolean;
    /**
     * 数组
     * @type {boolean}
     * @default false
     * 来源  isArray
     */
    array?: boolean;
}
