import { IDELogicParamBase } from './idelogic-param-base';
/**
 *
 * 实体处理逻辑参数模型对象接口
 * @export
 * @interface IDELogicParam
 */
export interface IDELogicParam extends IDELogicParamBase {
    /**
     * 默认值
     * @type {string}
     * 来源  getDefaultValue
     */
    defaultValue?: string;
    /**
     * 默认值类型
     * @type {string}
     * 来源  getDefaultValueType
     */
    defaultValueType?: string;
    /**
     * 文件类型
     * @description 值模式 [实体逻辑参数文件类型] {TEMP：本地临时文件、 URL：远程文件（Url）、 STORAGESERVICE：存储服务 }
     * @type {( string | 'TEMP' | 'URL' | 'STORAGESERVICE')}
     * 来源  getFileType
     */
    fileType?: string | 'TEMP' | 'URL' | 'STORAGESERVICE';
    /**
     * 文件路径
     * @type {string}
     * 来源  getFileUrl
     */
    fileUrl?: string;
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
     * 动态参数
     * @type {IModel}
     * 来源  getParams
     */
    params?: IModel;
    /**
     * 简单数据类型
     * @description 值模式 [标准数据类型] {0：UNKNOWN、 1：BIGINT、 2：BINARY、 3：BIT、 4：CHAR、 5：DATETIME、 6：DECIMAL、 7：FLOAT、 8：IMAGE、 9：INT、 10：MONEY、 11：NCHAR、 12：NTEXT、 13：NVARCHAR、 14：NUMERIC、 15：REAL、 16：SMALLDATETIME、 17：SMALLINT、 18：SMALLMONEY、 19：SQL_VARIANT、 20：SYSNAME、 21：TEXT、 22：TIMESTAMP、 23：TINYINT、 24：VARBINARY、 25：VARCHAR、 26：UNIQUEIDENTIFIER、 27：DATE、 28：TIME、 29：BIGDECIMAL、 30：VECTOR、 31：TSVECTOR }
     * @type {( number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31)}
     * @default 0
     * 来源  getStdDataType
     */
    stdDataType?: number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
    /**
     * 应用上下文变量
     * @type {boolean}
     * @default false
     * 来源  isAppContextParam
     */
    appContextParam?: boolean;
    /**
     * 应用全局变量
     * @type {boolean}
     * @default false
     * 来源  isAppGlobalParam
     */
    appGlobalParam?: boolean;
    /**
     * 克隆传入参数
     * @type {boolean}
     * @default false
     * 来源  isCloneParam
     */
    cloneParam?: boolean;
    /**
     * 数据对象列表变量
     * @type {boolean}
     * @default false
     * 来源  isEntityListParam
     */
    entityListParam?: boolean;
    /**
     * 数据对象字典变量
     * @type {boolean}
     * @default false
     * 来源  isEntityMapParam
     */
    entityMapParam?: boolean;
    /**
     * 分页查询结果变量
     * @type {boolean}
     * @default false
     * 来源  isEntityPageParam
     */
    entityPageParam?: boolean;
    /**
     * 数据对象变量
     * @type {boolean}
     * @default false
     * 来源  isEntityParam
     */
    entityParam?: boolean;
    /**
     * 系统环境变量
     * @type {boolean}
     * @default false
     * 来源  isEnvParam
     */
    envParam?: boolean;
    /**
     * 文件对象列表变量
     * @type {boolean}
     * @default false
     * 来源  isFileListParam
     */
    fileListParam?: boolean;
    /**
     * 文件对象变量
     * @type {boolean}
     * @default false
     * 来源  isFileParam
     */
    fileParam?: boolean;
    /**
     * 过滤器对象变量
     * @type {boolean}
     * @default false
     * 来源  isFilterParam
     */
    filterParam?: boolean;
    /**
     * 最后数据变量
     * @type {boolean}
     * @default false
     * 来源  isLastParam
     */
    lastParam?: boolean;
    /**
     * 上一次调用返回变量
     * @type {boolean}
     * @default false
     * 来源  isLastReturnParam
     */
    lastReturnParam?: boolean;
    /**
     * 原始数据对象
     * @type {boolean}
     * @default false
     * 来源  isOriginEntity
     */
    originEntity?: boolean;
    /**
     * 操作会话变量
     * @type {boolean}
     * @default false
     * 来源  isSessionParam
     */
    sessionParam?: boolean;
    /**
     * 简单数据列表变量
     * @type {boolean}
     * @default false
     * 来源  isSimpleListParam
     */
    simpleListParam?: boolean;
    /**
     * 简单数据变量
     * @type {boolean}
     * @default false
     * 来源  isSimpleParam
     */
    simpleParam?: boolean;
    /**
     * Web上下文变量
     * @type {boolean}
     * @default false
     * 来源  isWebContextParam
     */
    webContextParam?: boolean;
    /**
     * Web反馈变量
     * @type {boolean}
     * @default false
     * 来源  isWebResponseParam
     */
    webResponseParam?: boolean;
}
