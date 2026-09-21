import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体属性搜索模式模型对象接口
 * @export
 * @interface IDEFSearchMode
 */
export interface IDEFSearchMode extends IModelObject {
  /**
   * 代码标识
   * @type {string}
   * 来源  getCodeName
   */
  codeName?: string;

  /**
   * 项标记
   * @type {string}
   * 来源  getItemTag
   */
  itemTag?: string;

  /**
   * 项标记2
   * @type {string}
   * 来源  getItemTag2
   */
  itemTag2?: string;

  /**
   * 搜索模式
   * @type {string}
   * 来源  getMode
   */
  mode?: string;

  /**
   * 标准数据类型
   * @description 值模式 [标准数据类型] {0：UNKNOWN、 1：BIGINT、 2：BINARY、 3：BIT、 4：CHAR、 5：DATETIME、 6：DECIMAL、 7：FLOAT、 8：IMAGE、 9：INT、 10：MONEY、 11：NCHAR、 12：NTEXT、 13：NVARCHAR、 14：NUMERIC、 15：REAL、 16：SMALLDATETIME、 17：SMALLINT、 18：SMALLMONEY、 19：SQL_VARIANT、 20：SYSNAME、 21：TEXT、 22：TIMESTAMP、 23：TINYINT、 24：VARBINARY、 25：VARCHAR、 26：UNIQUEIDENTIFIER、 27：DATE、 28：TIME、 29：BIGDECIMAL、 30：VECTOR、 31：TSVECTOR }
   * @type {( number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31)}
   * 来源  getStdDataType
   */
  stdDataType?:
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
    | 29
    | 30
    | 31;

  /**
   * 值格式化
   * @type {string}
   * 来源  getValueFormat
   */
  valueFormat?: string;

  /**
   * 值处理
   * @type {string}
   * 来源  getValueFunc
   */
  valueFunc?: string;

  /**
   * 值操作
   * @type {string}
   * 来源  getValueOP
   */
  valueOP?: string;

  /**
   * 值分隔符
   * @type {string}
   * 来源  getValueSeparator
   */
  valueSeparator?: string;

  /**
   * 默认搜索项
   * @type {boolean}
   * @default false
   * 来源  isDefault
   */
  default?: boolean;
}
