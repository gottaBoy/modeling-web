import { IModelObject } from '../../imodel-object';

/**
 *
 * 实体逻辑节点参数模型基础对象接口
 * @export
 * @interface IDELogicNodeParamBase
 */
export interface IDELogicNodeParamBase extends IModelObject {
  /**
   * 聚合操作模式
   * @description 值模式 [数据聚合模式] {SUM：合计、 AVG：平均、 MAX：最大值、 MIN：最小值、 COUNT：计数、 EXISTS：存在、 NOTEXISTS：不存在、 GROUP：分组项、 USER：用户自定义、 USER2：用户自定义2、 USER3：用户自定义3、 USER4：用户自定义4 }
   * @type {( string | 'SUM' | 'AVG' | 'MAX' | 'MIN' | 'COUNT' | 'EXISTS' | 'NOTEXISTS' | 'GROUP' | 'USER' | 'USER2' | 'USER3' | 'USER4')}
   * 来源  getAggMode
   */
  aggMode?:
    | string
    | 'SUM'
    | 'AVG'
    | 'MAX'
    | 'MIN'
    | 'COUNT'
    | 'EXISTS'
    | 'NOTEXISTS'
    | 'GROUP'
    | 'USER'
    | 'USER2'
    | 'USER3'
    | 'USER4';

  /**
   * 目标属性名称
   * @type {string}
   * 来源  getDstFieldName
   */
  dstFieldName?: string;

  /**
   * 目标列表参数起始位置
   * @type {number}
   * @default -1
   * 来源  getDstIndex
   */
  dstIndex?: number;

  /**
   * 目标列表排序模式
   * @description 值模式 [字段排序方向] {ASC：升序、 DESC：降序 }
   * @type {( string | 'ASC' | 'DESC')}
   * 来源  getDstSortDir
   */
  dstSortDir?: string | 'ASC' | 'DESC';

  /**
   * 逻辑处理参数操作
   * @description 值模式 [实体处理逻辑节点参数类型] {SETPARAMVALUE：设置变量、 RESETPARAM：重置变量、 COPYPARAM：拷贝变量、 SQLPARAM：数据库调用参数、 SFPLUGINPARAM：后台服务插件参数、 BINDPARAM：绑定参数、 APPENDPARAM：附加到数组变量、 SORTPARAM：排序数组变量、 RENEWPARAM：重新建立变量、 WEBURIPARAM：请求Uri参数、 WEBHEADERPARAM：请求Header参数、 MERGEMAPPARAM：合并映射参数、 AGGREGATEMAPPARAM：聚合映射参数 }
   * @type {( string | 'SETPARAMVALUE' | 'RESETPARAM' | 'COPYPARAM' | 'SQLPARAM' | 'SFPLUGINPARAM' | 'BINDPARAM' | 'APPENDPARAM' | 'SORTPARAM' | 'RENEWPARAM' | 'WEBURIPARAM' | 'WEBHEADERPARAM' | 'MERGEMAPPARAM' | 'AGGREGATEMAPPARAM')}
   * 来源  getParamAction
   */
  paramAction?:
    | string
    | 'SETPARAMVALUE'
    | 'RESETPARAM'
    | 'COPYPARAM'
    | 'SQLPARAM'
    | 'SFPLUGINPARAM'
    | 'BINDPARAM'
    | 'APPENDPARAM'
    | 'SORTPARAM'
    | 'RENEWPARAM'
    | 'WEBURIPARAM'
    | 'WEBHEADERPARAM'
    | 'MERGEMAPPARAM'
    | 'AGGREGATEMAPPARAM';

  /**
   * 源属性名称
   * @type {string}
   * 来源  getSrcFieldName
   */
  srcFieldName?: string;

  /**
   * 源列表参数起始位置
   * @type {number}
   * @default -1
   * 来源  getSrcIndex
   */
  srcIndex?: number;

  /**
   * 源列表参数大小
   * @type {number}
   * @default -1
   * 来源  getSrcSize
   */
  srcSize?: number;

  /**
   * 直接值
   * @type {string}
   * 来源  getSrcValue
   */
  srcValue?: string;

  /**
   * 源值标准数据类型
   * @description 值模式 [标准数据类型] {0：UNKNOWN、 1：BIGINT、 2：BINARY、 3：BIT、 4：CHAR、 5：DATETIME、 6：DECIMAL、 7：FLOAT、 8：IMAGE、 9：INT、 10：MONEY、 11：NCHAR、 12：NTEXT、 13：NVARCHAR、 14：NUMERIC、 15：REAL、 16：SMALLDATETIME、 17：SMALLINT、 18：SMALLMONEY、 19：SQL_VARIANT、 20：SYSNAME、 21：TEXT、 22：TIMESTAMP、 23：TINYINT、 24：VARBINARY、 25：VARCHAR、 26：UNIQUEIDENTIFIER、 27：DATE、 28：TIME、 29：BIGDECIMAL、 30：VECTOR、 31：TSVECTOR }
   * @type {( number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31)}
   * @default 0
   * 来源  getSrcValueStdDataType
   */
  srcValueStdDataType?:
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
   * 源值类型
   * @description 值模式 [实体处理逻辑节点参数源值类型] {SRCDLPARAM：源逻辑参数、 LOGICPARAM：逻辑参数对象（兼容）、 LOGICPARAMFIELD：逻辑参数属性、 WEBCONTEXT：网页请求上下文、 APPDATA：当前应用数据、 APPLICATION：系统全局对象、 SESSION：用户全局对象、 DATACONTEXT：数据上下文、 ENVPARAM：当前环境参数、 VIEWPARAM：当前视图参数、 NONEVALUE：无值（NONE）、 NULLVALUE：空值（NULL）、 SRCVALUE：直接值、 EXPRESSION：计算式、 COUNT：数组数量、 AGGREGATION：数组聚合计算、 SEQUENCE：系统值序列 }
   * @type {( string | 'SRCDLPARAM' | 'LOGICPARAM' | 'LOGICPARAMFIELD' | 'WEBCONTEXT' | 'APPDATA' | 'APPLICATION' | 'SESSION' | 'DATACONTEXT' | 'ENVPARAM' | 'VIEWPARAM' | 'NONEVALUE' | 'NULLVALUE' | 'SRCVALUE' | 'EXPRESSION' | 'COUNT' | 'AGGREGATION' | 'SEQUENCE')}
   * 来源  getSrcValueType
   */
  srcValueType?:
    | string
    | 'SRCDLPARAM'
    | 'LOGICPARAM'
    | 'LOGICPARAMFIELD'
    | 'WEBCONTEXT'
    | 'APPDATA'
    | 'APPLICATION'
    | 'SESSION'
    | 'DATACONTEXT'
    | 'ENVPARAM'
    | 'VIEWPARAM'
    | 'NONEVALUE'
    | 'NULLVALUE'
    | 'SRCVALUE'
    | 'EXPRESSION'
    | 'COUNT'
    | 'AGGREGATION'
    | 'SEQUENCE';
}
