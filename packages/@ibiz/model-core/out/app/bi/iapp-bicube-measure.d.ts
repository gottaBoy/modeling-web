import { IModelObject } from '../../imodel-object';
/**
 *
 * @export
 * @interface IAppBICubeMeasure
 */
export interface IAppBICubeMeasure extends IModelObject {
    /**
     * 聚合模式
     * @description 值模式 [数据聚合模式] {SUM：合计、 AVG：平均、 MAX：最大值、 MIN：最小值、 COUNT：计数、 EXISTS：存在、 NOTEXISTS：不存在、 GROUP：分组项、 USER：用户自定义、 USER2：用户自定义2、 USER3：用户自定义3、 USER4：用户自定义4 }
     * @type {( string | 'SUM' | 'AVG' | 'MAX' | 'MIN' | 'COUNT' | 'EXISTS' | 'NOTEXISTS' | 'GROUP' | 'USER' | 'USER2' | 'USER3' | 'USER4')}
     * 来源  getAggMode
     */
    aggMode?: string | 'SUM' | 'AVG' | 'MAX' | 'MIN' | 'COUNT' | 'EXISTS' | 'NOTEXISTS' | 'GROUP' | 'USER' | 'USER2' | 'USER3' | 'USER4';
    /**
     * 代码标识
     * @type {string}
     * 来源  getCodeName
     */
    codeName?: string;
    /**
     * 反查数据展示视图
     *
     * @type {string}
     * 来源  getDrillDetailPSAppView
     */
    drillDetailAppViewId?: string;
    /**
     * 钻取数据展示视图
     *
     * @type {string}
     * 来源  getDrillDownPSAppView
     */
    drillDownAppViewId?: string;
    /**
     * Json值格式化
     * @type {string}
     * 来源  getJsonFormat
     */
    jsonFormat?: string;
    /**
     * 指标公式
     * @type {string}
     * 来源  getMeasureFormula
     */
    measureFormula?: string;
    /**
     * 指标组
     * @type {string}
     * 来源  getMeasureGroup
     */
    measureGroup?: string;
    /**
     * 指标标记
     * @type {string}
     * 来源  getMeasureTag
     */
    measureTag?: string;
    /**
     * 指标标记2
     * @type {string}
     * 来源  getMeasureTag2
     */
    measureTag2?: string;
    /**
     * 指标类型
     * @description 值模式 [多维分析指标类别] {COMMON：常规、 CALCULATED：动态计算 }
     * @type {( string | 'COMMON' | 'CALCULATED')}
     * 来源  getMeasureType
     */
    measureType?: string | 'COMMON' | 'CALCULATED';
    /**
     * 阈值应用代码表对象
     *
     * @type {string}
     * 来源  getPSAppCodeList
     */
    appCodeListId?: string;
    /**
     * 相关应用属性
     *
     * @type {string}
     * 来源  getPSAppDEField
     */
    appDEFieldId?: string;
    /**
     * 参数配置界面行为对象
     *
     * @type {string}
     * 来源  getParamPSAppDEUIAction
     */
    paramAppDEUIActionId?: string;
    /**
     * 标准数据类型
     * @description 值模式 [属性标准数据类型] {0：UNKNOWN、 1：BIGINT、 2：BINARY、 3：BIT、 4：CHAR、 5：DATETIME、 6：DECIMAL、 7：FLOAT、 8：IMAGE、 9：INT、 10：MONEY、 11：NCHAR、 12：NTEXT、 13：NVARCHAR、 14：NUMERIC、 15：REAL、 16：SMALLDATETIME、 17：SMALLINT、 18：SMALLMONEY、 19：SQL_VARIANT、 20：SYSNAME、 21：TEXT、 22：TIMESTAMP、 23：TINYINT、 24：VARBINARY、 25：VARCHAR、 26：UNIQUEIDENTIFIER、 27：DATE、 28：TIME、 29：BIGDECIMAL }
     * @type {( number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29)}
     * @default 0
     * 来源  getStdDataType
     */
    stdDataType?: number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29;
    /**
     * 文本绘制模板
     * @type {string}
     * 来源  getTextTemplate
     */
    textTemplate?: string;
    /**
     * 提示绘制模板
     * @type {string}
     * 来源  getTipTemplate
     */
    tipTemplate?: string;
    /**
     * 数据项
     * @type {boolean}
     * @default false
     * 来源  isDataItem
     */
    dataItem?: boolean;
}
