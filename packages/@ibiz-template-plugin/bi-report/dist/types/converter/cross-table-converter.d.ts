import { CodeListItem } from '@ibiz-template/runtime';
import { IAppBIReport, IAppBIReportDimension, IAppBIReportMeasure } from '@ibiz/model-core';
import { BaseConverter } from './base-converter';
import { IBIReportGridController } from '../interface';
/**
 * 交叉表转化器
 *
 * @author tony001
 * @date 2024-06-06 15:06:12
 * @export
 * @class CrossTableConverter
 * @implements {IChartConverter}
 */
export declare class CrossTableConverter extends BaseConverter {
    /**
     * 控制器
     *
     * @type {IBIReportGridController}
     * @memberof CrossTableConverter
     */
    controller: IBIReportGridController;
    /**
     * 代码表项
     *
     * @type {readonly}
     * @memberof CrossTableConverter
     */
    codeListItems?: readonly CodeListItem[];
    /**
     * 样式配置
     *
     * @type {IData}
     * @memberof CrossTableConverter
     */
    styleConfig: IData;
    /**
     * 是否存在同环比数据
     *
     * @type {IData}
     * @memberof CrossTableConverter
     */
    hasPeriod: boolean;
    /**
     * 代码表列
     *
     * @type {string[]}
     * @memberof CrossTableConverter
     */
    codelistColumn: string[];
    /**
     * 合计列标识
     *
     * @type {string}
     * @memberof CrossTableConverter
     */
    totalColTag: string;
    /**
     * 百分比数据
     *
     * @type {string}
     * @memberof CrossTableConverter
     */
    percentkeys: string[];
    /**
     * 指标
     *
     * @type {IAppBIReportMeasure[]}
     * @memberof CrossTableConverter
     */
    measures: IAppBIReportMeasure[];
    /**
     * @description 维度行
     * @type {IAppBIReportDimension[]}
     * @memberof CrossTableConverter
     */
    dimensionRow: IAppBIReportDimension[];
    /**
     * @description 维度列
     * @type {IAppBIReportDimension[]}
     * @memberof CrossTableConverter
     */
    dimensionCol: IAppBIReportDimension[];
    /**
     * @description 指标总数
     * @type {IData}
     * @memberof CrossTableConverter
     */
    measuresTotalResult: IData;
    /**
     * @description 列维度数据映射表
     * @type {Map<string, string>}
     * @memberof CrossTableConverter
     */
    colDataMap: Map<string, string>;
    /**
     * @description 表格属性映射表
     * @type {Map<string, string>}
     * @memberof CrossTableConverter
     */
    gridFieldMap: Map<string, string>;
    /**
     * 根据样式计算列模型
     *
     * @return {*}
     * @memberof CrossTableConverter
     */
    calcColumnStyle(enableAgg?: boolean): IData;
    /**
     * 计算合计列
     *
     * @param {string} position
     * @param {IData[]} degridColumns
     * @memberof CrossTableConverter
     */
    calcTotalCol(position: string, degridColumns: IData[]): void;
    /**
     * 计算分组类型
     *
     * @param {IAppBIReport} data
     * @param {IData[]} items
     * @memberof CrossTableConverter
     */
    calcGroupType(items: IData[]): Promise<string[]>;
    /**
     * 计算指标列
     *
     * @param {IData[]} measure
     * @param {string} type
     * @return {*}
     * @memberof CrossTableConverter
     */
    clacMeasureColumns(measure: IData[], type?: string): {
        align: string;
        dataItemName: string;
        appDEFieldId: string;
        caption: any;
        codeName: string;
        width: number;
        widthUnit: string;
        appCodeListId: any;
        columnType: string;
        id: string;
        appId: string;
        totalCodename: string;
        format: any;
        valueType: string;
    }[];
    /**
     * 计算表格列模型
     *
     * @param {IAppBIReport} data
     * @return {*}
     * @memberof CrossTableConverter
     */
    calcGridColumns(groupType: string[]): ({
        align: string;
        dataItemName: string;
        appDEFieldId: string;
        caption: any;
        codeName: string;
        width: number;
        widthUnit: string;
        appCodeListId: any;
        columnType: string;
        id: string;
        appId: string;
        totalCodename: string;
        format: any;
        valueType: string;
    } | {
        dataItemName: string;
        appDEFieldId: string;
        width: number;
        widthUnit: string;
        appCodeListId: string | undefined;
        caption: string | undefined;
        codeName: string;
        columnType: string;
        id: string;
        appId: string;
    } | {
        dataItemName: string;
        appDEFieldId: string;
        caption: string;
        appCodeListId: string | undefined;
        codeName: string;
        columnType: string;
        id: string;
        appId: string;
        degridColumns: {
            align: string;
            dataItemName: string;
            appDEFieldId: string;
            caption: any;
            codeName: string;
            width: number;
            widthUnit: string;
            appCodeListId: any;
            columnType: string;
            id: string;
            appId: string;
            totalCodename: string;
            format: any;
            valueType: string;
        }[];
    })[];
    /**
     * 计算表格数据列
     *
     * @param {IData[]} columns
     * @return {*}
     * @memberof CrossTableConverter
     */
    calcGridDataItems(columns: IData[]): IData[];
    /**
     * 计算行合并
     *
     * @param {IData} data
     * @return {*}
     * @memberof CrossTableConverter
     */
    calcRowSpan(): string[];
    /**
     * 是否存在数据项
     *
     * @param {IData[]} items
     * @param {IAppBIReportDimension[]} dimension_row
     * @return {*}
     * @memberof CrossTableConverter
     */
    getItem(items: IData[], dimension_row: IAppBIReportDimension[], item: IData): IData | undefined;
    /**
     * 计算表格数据
     *
     * @param {IAppBIReport} data
     * @param {IData[]} items
     * @memberof CrossTableConverter
     */
    calcGridData(items: IData[]): IData[];
    /**
     * 计算统计数据
     *
     * @param {IData[]} items
     * @return {*}
     * @memberof CrossTableConverter
     */
    calcTotalData(items: IData[]): void;
    /**
     * 通过数据翻译模型
     *
     * @param {(IAppBIReport | undefined)} data
     * @param {IModel} model
     * @param {IData} [opts={}]
     * @return {*}  {(Promise<IModel | undefined>)}
     * @memberof CrossTableConverter
     */
    translateDataToModel(data: IAppBIReport | undefined, model: IModel, opts?: IData): Promise<IModel | undefined>;
    /**
     * 获取样式配置
     *
     * @param {IAppBIReport} config
     * @return {*}
     * @memberof CrossTableConverter
     */
    getStyleConfig(config: IAppBIReport): any;
    /**
     * 获取维度数据
     *
     * @param {IAppBIReportDimension[]} dimensions
     * @return {*}
     * @memberof CrossTableConverter
     */
    getDimension(dimensions: IAppBIReportDimension[]): void;
    /**
     * 加载代码表
     *
     * @param {string} appCodeListId
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {(Promise<Readonly<CodeListItem[]> | undefined>)}
     * @memberof CrossTableConverter
     */
    loadCodeList(appCodeListId: string, context: IContext, params: IParams): Promise<Readonly<CodeListItem[]> | undefined>;
    /**
     * 转换代码表值
     *
     * @param {string} value
     * @return {*}
     * @memberof CrossTableConverter
     */
    transCodeListValue(value: string): string;
    /**
     * 转换代码表值
     *
     * @param {(CodeListItem[] | undefined)} codelist
     * @param {(string | number)} value
     * @return {*}
     * @memberof CrossTableConverter
     */
    findCodeListItem(codelist: readonly CodeListItem[] | undefined, value: string | number): CodeListItem | undefined;
    /**
     * 转换样式
     *
     * @param {IAppBIReport} data
     * @param {IData} model
     * @memberof CrossTableConverter
     */
    transformStyle(model: IData, mode?: string): void;
    /**
     * 过滤同环比数据
     *
     * @param {IAppBIReport} data
     * @param {IData} model
     * @memberof CrossTableConverter
     */
    filterPeriod(items: IData[]): IData[];
    /**
     * @description 获取反查值
     * @param {IData} item
     * @param {string} name
     * @return {*}
     * @memberof CrossTableConverter
     */
    getDrillValue(item: IData, name: string): any;
    /**
     * @description 计算表格属性
     * @param {IData} data
     * @param {IData[]} items
     * @memberof CrossTableConverter
     */
    calcGridFieldMap(items: IData[]): void;
    /**
     * @description 获取表格属性
     * @param {string} codeName
     * @return {*}  {string}
     * @memberof CrossTableConverter
     */
    getGridField(codeName: string): string;
}
