import { IModelObject } from '../../imodel-object';
/**
 *
 * @export
 * @interface IAppBIReportDimension
 */
export interface IAppBIReportDimension extends IModelObject {
    /**
     * 维度公式
     * @type {string}
     * 来源  getDimensionFormula
     */
    dimensionFormula?: string;
    /**
     * 维度名称
     * @type {string}
     * 来源  getDimensionName
     */
    dimensionName?: string;
    /**
     * 维度项动态参数
     * @type {IModel}
     * 来源  getDimensionParams
     */
    dimensionParams?: IModel;
    /**
     * 维度标记
     * @type {string}
     * 来源  getDimensionTag
     */
    dimensionTag?: string;
    /**
     * 维度类型
     * @description 值模式 [多维分析维度类别] {COMMON：常规、 CALCULATED：动态计算 }
     * @type {( string | 'COMMON' | 'CALCULATED')}
     * 来源  getDimensionType
     */
    dimensionType?: string | 'COMMON' | 'CALCULATED';
    /**
     * 报表项标记
     * @type {string}
     * 来源  getItemTag
     */
    itemTag?: string;
    /**
     * 报表项标记2
     * @type {string}
     * 来源  getItemTag2
     */
    itemTag2?: string;
    /**
     * 应用代码表对象
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
     * 放置类型
     * @description 值模式 [智能报表报表项放置类型] {VISIBLE：默认显示、 INVISIBLE：默认隐藏、 FROZEN：固定 }
     * @type {( string | 'VISIBLE' | 'INVISIBLE' | 'FROZEN')}
     * 来源  getPlaceType
     */
    placeType?: string | 'VISIBLE' | 'INVISIBLE' | 'FROZEN';
    /**
     * 放置位置
     * @description 值模式 [智能报表报表项放置位置] {NONE：无、 ROWHEADER：行头、 COLHEADER：列头 }
     * @type {( string | 'NONE' | 'ROWHEADER' | 'COLHEADER')}
     * 来源  getPlacement
     */
    placement?: string | 'NONE' | 'ROWHEADER' | 'COLHEADER';
    /**
     * 标准数据类型
     * @description 值模式 [属性标准数据类型] {0：UNKNOWN、 1：BIGINT、 2：BINARY、 3：BIT、 4：CHAR、 5：DATETIME、 6：DECIMAL、 7：FLOAT、 8：IMAGE、 9：INT、 10：MONEY、 11：NCHAR、 12：NTEXT、 13：NVARCHAR、 14：NUMERIC、 15：REAL、 16：SMALLDATETIME、 17：SMALLINT、 18：SMALLMONEY、 19：SQL_VARIANT、 20：SYSNAME、 21：TEXT、 22：TIMESTAMP、 23：TINYINT、 24：VARBINARY、 25：VARCHAR、 26：UNIQUEIDENTIFIER、 27：DATE、 28：TIME、 29：BIGDECIMAL }
     * @type {( number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29)}
     * @default 0
     * 来源  getStdDataType
     */
    stdDataType?: number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29;
    /**
     * 文本应用属性
     *
     * @type {string}
     * 来源  getTextPSAppDEField
     */
    textAppDEFieldId?: string;
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
}
