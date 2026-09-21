import { IModelObject } from '../imodel-object';

/**
 *
 * @export
 * @interface IDataItem
 */
export interface IDataItem extends IModelObject {
  /**
   * 标准数据类型
   * @description 值模式 [属性标准数据类型] {0：UNKNOWN、 1：BIGINT、 2：BINARY、 3：BIT、 4：CHAR、 5：DATETIME、 6：DECIMAL、 7：FLOAT、 8：IMAGE、 9：INT、 10：MONEY、 11：NCHAR、 12：NTEXT、 13：NVARCHAR、 14：NUMERIC、 15：REAL、 16：SMALLDATETIME、 17：SMALLINT、 18：SMALLMONEY、 19：SQL_VARIANT、 20：SYSNAME、 21：TEXT、 22：TIMESTAMP、 23：TINYINT、 24：VARBINARY、 25：VARCHAR、 26：UNIQUEIDENTIFIER、 27：DATE、 28：TIME、 29：BIGDECIMAL }
   * @type {( number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29)}
   * 来源  getDataType
   */
  dataType?:
    | number
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29;

  /**
   * 格式化
   * @type {string}
   * 来源  getFormat
   */
  format?: string;

  /**
   * 代码表对象
   *
   * @type {string}
   * 来源  getPSCodeList
   */
  codeListId?: string;

  /**
   * 转换为代码项文本
   * @type {boolean}
   * @default false
   * 来源  isConvertToCodeItemText
   */
  convertToCodeItemText?: boolean;
}
