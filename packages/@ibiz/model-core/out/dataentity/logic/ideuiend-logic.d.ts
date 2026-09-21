import { IDEUILogicNode } from './ideuilogic-node';
/**
 *
 * 继承父接口类型值[END]
 * @export
 * @interface IDEUIEndLogic
 */
export interface IDEUIEndLogic extends IDEUILogicNode {
    /**
     * 返回参数属性
     * @type {string}
     * 来源  getDstFieldName
     */
    dstFieldName?: string;
    /**
     * 返回直接值
     * @type {string}
     * 来源  getRawValue
     */
    rawValue?: string;
    /**
     * 直接值标准数据类型
     * @description 值模式 [属性标准数据类型] {0：UNKNOWN、 1：BIGINT、 2：BINARY、 3：BIT、 4：CHAR、 5：DATETIME、 6：DECIMAL、 7：FLOAT、 8：IMAGE、 9：INT、 10：MONEY、 11：NCHAR、 12：NTEXT、 13：NVARCHAR、 14：NUMERIC、 15：REAL、 16：SMALLDATETIME、 17：SMALLINT、 18：SMALLMONEY、 19：SQL_VARIANT、 20：SYSNAME、 21：TEXT、 22：TIMESTAMP、 23：TINYINT、 24：VARBINARY、 25：VARCHAR、 26：UNIQUEIDENTIFIER、 27：DATE、 28：TIME、 29：BIGDECIMAL }
     * @type {( number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29)}
     * @default 0
     * 来源  getRawValueStdDataType
     */
    rawValueStdDataType?: number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29;
    /**
     * 返回参数
     *
     * @type {string}
     * 来源  getReturnParam
     */
    returnParamId?: string;
    /**
     * 返回值类型
     * @description 值模式 [实体处理处理返回值类型] {NONEVALUE：无值（NONE）、 NULLVALUE：空值（NULL）、 SRCVALUE：直接值、 LOGICPARAM：逻辑参数对象、 LOGICPARAMFIELD：逻辑参数属性、 BREAK：跳出循环（BREAK） }
     * @type {( string | 'NONEVALUE' | 'NULLVALUE' | 'SRCVALUE' | 'LOGICPARAM' | 'LOGICPARAMFIELD' | 'BREAK')}
     * 来源  getReturnType
     */
    returnType?: string | 'NONEVALUE' | 'NULLVALUE' | 'SRCVALUE' | 'LOGICPARAM' | 'LOGICPARAMFIELD' | 'BREAK';
}
