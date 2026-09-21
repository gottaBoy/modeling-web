import { IModelObject } from '../../imodel-object';
/**
 *
 * @export
 * @interface IAppDEMethodReturn
 */
export interface IAppDEMethodReturn extends IModelObject {
    /**
     * 返回DTO对象
     *
     * @type {string}
     * 来源  getPSAppDEMethodDTO
     */
    appDEMethodDTOId?: string;
    /**
     * 简单值类型
     * @description 值模式 [属性标准数据类型] {0：UNKNOWN、 1：BIGINT、 2：BINARY、 3：BIT、 4：CHAR、 5：DATETIME、 6：DECIMAL、 7：FLOAT、 8：IMAGE、 9：INT、 10：MONEY、 11：NCHAR、 12：NTEXT、 13：NVARCHAR、 14：NUMERIC、 15：REAL、 16：SMALLDATETIME、 17：SMALLINT、 18：SMALLMONEY、 19：SQL_VARIANT、 20：SYSNAME、 21：TEXT、 22：TIMESTAMP、 23：TINYINT、 24：VARBINARY、 25：VARCHAR、 26：UNIQUEIDENTIFIER、 27：DATE、 28：TIME、 29：BIGDECIMAL }
     * @type {( number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29)}
     * @default 0
     * 来源  getStdDataType
     */
    stdDataType?: number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29;
    /**
     * 返回类型
     * @description 值模式 [实体方法返回类型] {VOID：没有返回、 SIMPLE：简单值、 SIMPLES：简单值数组、 DTO：DTO对象、 DTOS：DTO对象集合、 PAGE：搜索分页、 ASYNCACTION：异步操作对象、 SSE：服务器端事件对象（SSE）、 UNKNOWN：未知、 USER：用户自定义、 USER2：用户自定义2 }
     * @type {( string | 'VOID' | 'SIMPLE' | 'SIMPLES' | 'DTO' | 'DTOS' | 'PAGE' | 'ASYNCACTION' | 'SSE' | 'UNKNOWN' | 'USER' | 'USER2')}
     * 来源  getType
     */
    type?: string | 'VOID' | 'SIMPLE' | 'SIMPLES' | 'DTO' | 'DTOS' | 'PAGE' | 'ASYNCACTION' | 'SSE' | 'UNKNOWN' | 'USER' | 'USER2';
}
