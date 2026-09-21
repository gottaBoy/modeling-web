import { IAppBIReportDimension } from '@ibiz/model-core';
import { GridConverterBase } from './base';
import { CodeListItem } from '../../../../../interface';
/**
 * @description 交叉表转化器
 * @export
 * @class CrossTableConverter
 * @extends {GridConverterBase}
 */
export declare class CrossTableConverter extends GridConverterBase {
    /**
     * @description 仿真模型
     * @type {IModel}
     * @memberof CrossTableConverter
     */
    mockModel: IModel;
    /**
     * @description 百分比数据
     * @type {string[]}
     * @memberof CrossTableConverter
     */
    percentKeys: string[];
    /**
     * @description 合计列标识
     * @type {string}
     * @memberof CrossTableConverter
     */
    totalColTag: string;
    /**
     * @description 指标总数
     * @type {IData}
     * @memberof CrossTableConverter
     */
    measuresTotalResult: IData;
    /**
     * @description 维度列
     * @type {IAppBIReportDimension}
     * @memberof CrossTableConverter
     */
    dimensionCol?: IAppBIReportDimension;
    /**
     * @description 维度列代码表
     * @type {CodeListItem[]}
     * @memberof CrossTableConverter
     */
    codelistItems?: readonly CodeListItem[];
    /**
     * @description 初始化
     * - 处理列顺序
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof CrossTableConverter
     */
    protected onInit(): Promise<void>;
    /**
     * @description 计算维度（列）
     * @param {IData[]} items
     * @returns {*}  {string[]}
     * @memberof CrossTableConverter
     */
    calcDimensionCols(items: IData[]): string[];
    /**
     * 通过指标计算表格列
     *
     * @author tony001
     * @date 2024-12-19 17:12:52
     * @param {IData} data
     * @param {string} [type]
     * @return {*}  {IModel[]}
     */
    clacMeasureColumns(parentName?: string): IModel[];
    /**
     * @description 计算合计表格列
     * @param {string} position
     * @param {IModel[]} degridColumns
     * @memberof CrossTableConverter
     */
    calcAggGridCol(position: string, degridColumns: IModel[]): void;
    /**
     * @description 计算合计列数据
     * @param {IData[]} items
     * @memberof CrossTableConverter
     */
    calcAggTotalData(items: IData[]): void;
    /**
     * @description 计算交叉表
     * @param {string[]} dimensionCols 维度列
     * @returns {*}  {IModel[]}
     * @memberof CrossTableConverter
     */
    calcCrossTableColumns(dimensionCols: string[]): IModel[];
    /**
     * @description 获取数据项
     * @param {IData[]} items
     * @param {IData} item
     * @returns {*}  {(IData | undefined)}
     * @memberof CrossTableConverter
     */
    getItem(items: IData[], item: IData): IData | undefined;
    /**
     * @description 计算交叉表数据
     * @param {IData[]} items
     * @returns {*}  {IData[]}
     * @memberof CrossTableConverter
     */
    calcCrossTableData(items: IData[]): IData[];
    /**
     * @description 计算交叉表数据项
     * @param {IData[]} columns
     * @returns {*}  {IModel[]}
     * @memberof CrossTableConverter
     */
    calcCrossTableDataItems(columns: IData[]): IModel[];
    /**
     * @description 转化数据到报表
     * @param {IData[]} items
     * @returns {*}  {({ model: IModel; options: IData; data: IData[] } | undefined)}
     * @memberof CrossTableConverter
     */
    translateDataToReport(items: IData[]): {
        model: IModel;
        options: IData;
        data: IData[];
    } | undefined;
}
//# sourceMappingURL=cross-table-converter.d.ts.map