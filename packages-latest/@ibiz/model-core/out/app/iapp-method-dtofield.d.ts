import { IModelObject } from '../imodel-object';
/**
 *
 * 应用方法DTO属性对象接口
 * @export
 * @interface IAppMethodDTOField
 */
export interface IAppMethodDTOField extends IModelObject {
    /**
     * 代码标识
     * @type {string}
     * 来源  getCodeName
     */
    codeName?: string;
    /**
     * Json格式化
     * @type {string}
     * 来源  getJsonFormat
     */
    jsonFormat?: string;
    /**
     * 中文名称
     * @type {string}
     * 来源  getLogicName
     */
    logicName?: string;
    /**
     * 引用应用实体方法DTO对象
     *
     * @type {string}
     * 来源  getRefPSAppDEMethodDTO
     */
    refAppDEMethodDTOId?: string;
    /**
     * 引用应用实体对象
     *
     * @type {string}
     * 来源  getRefPSAppDataEntity
     */
    refAppDataEntityId?: string;
    /**
     * 引用应用方法DTO对象
     *
     * @type {string}
     * 来源  getRefPSAppMethodDTO
     */
    refAppMethodDTOId?: string;
    /**
     * DTO属性来源类型
     * @description 值模式 [实体方法DTO对象属性来源类型] {DEFIELD：实体属性、 DEFGROUPDETAIL：实体属性组成员、 DER：实体关系、 DYNAMODELATTR：动态模型属性、 DEACTIONPARAM：实体行为参数、 DEFSEARCHMODE：属性搜索模式、 DEDATASETPARAM：实体数据集参数 }
     * @type {( string | 'DEFIELD' | 'DEFGROUPDETAIL' | 'DER' | 'DYNAMODELATTR' | 'DEACTIONPARAM' | 'DEFSEARCHMODE' | 'DEDATASETPARAM')}
     * 来源  getSourceType
     */
    sourceType?: string | 'DEFIELD' | 'DEFGROUPDETAIL' | 'DER' | 'DYNAMODELATTR' | 'DEACTIONPARAM' | 'DEFSEARCHMODE' | 'DEDATASETPARAM';
    /**
     * 标准数据类型
     * @description 值模式 [标准数据类型] {0：UNKNOWN、 1：BIGINT、 2：BINARY、 3：BIT、 4：CHAR、 5：DATETIME、 6：DECIMAL、 7：FLOAT、 8：IMAGE、 9：INT、 10：MONEY、 11：NCHAR、 12：NTEXT、 13：NVARCHAR、 14：NUMERIC、 15：REAL、 16：SMALLDATETIME、 17：SMALLINT、 18：SMALLMONEY、 19：SQL_VARIANT、 20：SYSNAME、 21：TEXT、 22：TIMESTAMP、 23：TINYINT、 24：VARBINARY、 25：VARCHAR、 26：UNIQUEIDENTIFIER、 27：DATE、 28：TIME、 29：BIGDECIMAL、 30：VECTOR、 31：TSVECTOR }
     * @type {( number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31)}
     * @default 0
     * 来源  getStdDataType
     */
    stdDataType?: number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
    /**
     * 应用DTO对象属性类型
     * @description 值模式 [实体方法DTO属性类型] {SIMPLE：简单数据类型、 SIMPLES：简单数据类型数组、 DTO：DTO对象、 DTOS：DTO对象数组 }
     * @type {( string | 'SIMPLE' | 'SIMPLES' | 'DTO' | 'DTOS')}
     * 来源  getType
     */
    type?: string | 'SIMPLE' | 'SIMPLES' | 'DTO' | 'DTOS';
    /**
     * 允许空输入
     * @type {boolean}
     * @default true
     * 来源  isAllowEmpty
     */
    allowEmpty?: boolean;
}
