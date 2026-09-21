import { IDEFieldBase } from '../../dataentity/defield/idefield-base';
import { ILanguageRes } from '../../res/ilanguage-res';
/**
 *
 * 应用实体属性模型对象接口，该模型由实体属性或服务接口属性投射
 * @export
 * @interface IAppDEField
 */
export interface IAppDEField extends IDEFieldBase {
    /**
     * 代码标识
     * @type {string}
     * 来源  getCodeName
     */
    codeName?: string;
    /**
     * 值计算逻辑
     *
     * @type {string}
     * 来源  getComputePSAppDEFLogic
     */
    computeAppDEFLogicId?: string;
    /**
     * 默认值
     * @type {string}
     * 来源  getDefaultValue
     */
    defaultValue?: string;
    /**
     * 默认值逻辑
     *
     * @type {string}
     * 来源  getDefaultValuePSAppDEFLogic
     */
    defaultValueAppDEFLogicId?: string;
    /**
     * 默认值类型
     * @description 值模式 [实体属性默认值类型] {SESSION：用户全局对象、 APPLICATION：系统全局对象、 UNIQUEID：唯一编码、 CONTEXT：网页请求、 PARAM：数据对象属性、 OPERATOR：当前操作用户(编号)、 OPERATORNAME：当前操作用户(名称)、 CURTIME：当前时间、 APPDATA：当前应用数据、 EXPRESSION：表达式、 ORDERVALUE：排序值、 USER：用户自定义、 USER2：用户自定义2、 USER3：用户自定义3、 USER4：用户自定义4 }
     * @type {( string | 'SESSION' | 'APPLICATION' | 'UNIQUEID' | 'CONTEXT' | 'PARAM' | 'OPERATOR' | 'OPERATORNAME' | 'CURTIME' | 'APPDATA' | 'EXPRESSION' | 'ORDERVALUE' | 'USER' | 'USER2' | 'USER3' | 'USER4')}
     * 来源  getDefaultValueType
     */
    defaultValueType?: string | 'SESSION' | 'APPLICATION' | 'UNIQUEID' | 'CONTEXT' | 'PARAM' | 'OPERATOR' | 'OPERATORNAME' | 'CURTIME' | 'APPDATA' | 'EXPRESSION' | 'ORDERVALUE' | 'USER' | 'USER2' | 'USER3' | 'USER4';
    /**
     * 逻辑名称语言资源
     *
     * @type {ILanguageRes}
     * 来源  getLNPSLanguageRes
     */
    lnlanguageRes?: ILanguageRes;
    /**
     * 逻辑名称
     * @type {string}
     * 来源  getLogicName
     */
    logicName?: string;
    /**
     * 值变更逻辑
     *
     * @type {string}
     * 来源  getOnChangePSAppDEFLogic
     */
    onChangeAppDEFLogicId?: string;
    /**
     * 预置业务类型
     * @description 值模式 [预定义属性类型] {NONE：（非预置属性）、 LOGICVALID：逻辑有效标识、 ORDERVALUE：排序值、 VERSION：数据版本、 VERSIONID：数据版本标识、 CREATEMAN：建立人标识、 CREATEMANNAME：建立人名称、 CREATEDATE：建立时间、 UPDATEMAN：更新人标识、 UPDATEMANNAME：更新人名称、 UPDATEDATE：更新时间、 ORGID：组织机构标识、 ORGNAME：组织机构名称、 ORGSECTORID：部门标识、 ORGSECTORNAME：部门名称、 PARENTTYPE：动态父类型、 PARENTSUBTYPE：动态父子类型、 PARENTID：动态父标识、 PARENTNAME：动态父名称、 PARENTDATA：动态父数据、 PARENTVERSIONID：动态父版本标识、 PARENTIDPATH：父标识路径、 PARENTNAMEPATH：父名称路径、 CHILDTYPE：动态子类型、 CHILDID：动态子标识、 TIMESTAMP：时间戳、 DYNASTORAGE：动态存储、 CLOSEFLAG：关闭标志、 LOCKFLAG：锁定标志 }
     * @type {( string | 'NONE' | 'LOGICVALID' | 'ORDERVALUE' | 'VERSION' | 'VERSIONID' | 'CREATEMAN' | 'CREATEMANNAME' | 'CREATEDATE' | 'UPDATEMAN' | 'UPDATEMANNAME' | 'UPDATEDATE' | 'ORGID' | 'ORGNAME' | 'ORGSECTORID' | 'ORGSECTORNAME' | 'PARENTTYPE' | 'PARENTSUBTYPE' | 'PARENTID' | 'PARENTNAME' | 'PARENTDATA' | 'PARENTVERSIONID' | 'PARENTIDPATH' | 'PARENTNAMEPATH' | 'CHILDTYPE' | 'CHILDID' | 'TIMESTAMP' | 'DYNASTORAGE' | 'CLOSEFLAG' | 'LOCKFLAG')}
     * @default NONE
     * 来源  getPredefinedType
     */
    predefinedType?: string | 'NONE' | 'LOGICVALID' | 'ORDERVALUE' | 'VERSION' | 'VERSIONID' | 'CREATEMAN' | 'CREATEMANNAME' | 'CREATEDATE' | 'UPDATEMAN' | 'UPDATEMANNAME' | 'UPDATEDATE' | 'ORGID' | 'ORGNAME' | 'ORGSECTORID' | 'ORGSECTORNAME' | 'PARENTTYPE' | 'PARENTSUBTYPE' | 'PARENTID' | 'PARENTNAME' | 'PARENTDATA' | 'PARENTVERSIONID' | 'PARENTIDPATH' | 'PARENTNAMEPATH' | 'CHILDTYPE' | 'CHILDID' | 'TIMESTAMP' | 'DYNASTORAGE' | 'CLOSEFLAG' | 'LOCKFLAG';
    /**
     * 快速搜索占位提示信息语言资源
     *
     * @type {ILanguageRes}
     * 来源  getQSPHPSLanguageRes
     */
    qsphlanguageRes?: ILanguageRes;
    /**
     * 快速搜索占位提示信息
     * @type {string}
     * 来源  getQuickSearchPlaceHolder
     */
    quickSearchPlaceHolder?: string;
    /**
     * 标准数据类型
     * @description 值模式 [标准数据类型] {0：UNKNOWN、 1：BIGINT、 2：BINARY、 3：BIT、 4：CHAR、 5：DATETIME、 6：DECIMAL、 7：FLOAT、 8：IMAGE、 9：INT、 10：MONEY、 11：NCHAR、 12：NTEXT、 13：NVARCHAR、 14：NUMERIC、 15：REAL、 16：SMALLDATETIME、 17：SMALLINT、 18：SMALLMONEY、 19：SQL_VARIANT、 20：SYSNAME、 21：TEXT、 22：TIMESTAMP、 23：TINYINT、 24：VARBINARY、 25：VARCHAR、 26：UNIQUEIDENTIFIER、 27：DATE、 28：TIME、 29：BIGDECIMAL、 30：VECTOR、 31：TSVECTOR }
     * @type {( number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31)}
     * 来源  getStdDataType
     */
    stdDataType?: number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
    /**
     * 值格式化
     * @type {string}
     * 来源  getValueFormat
     */
    valueFormat?: string;
    /**
     * 支持快速搜索
     * @type {boolean}
     * @default false
     * 来源  isEnableQuickSearch
     */
    enableQuickSearch?: boolean;
}
