import { IAppBIReportMeasure, IAppBIReportDimension } from '@ibiz/model-core';
import { ConverterBase } from './converter-base';
/**
 * @description 图表基类转换器
 * @export
 * @abstract
 * @class EchartConverterBase
 * @extends {ConverterBase}
 */
export declare abstract class EchartConverterBase extends ConverterBase {
    /**
     * @description 仿真序列模型
     * @type {IModel}
     * @memberof EchartConverterBase
     */
    mockSerieModel: IModel;
    /**
     * @description 获取图表颜色参数
     * @returns {*}  {IData}
     * @memberof EchartConverterBase
     */
    getChartColorParams(): IData;
    /**
     * @description 获取图表X轴参数
     * @returns {*}  {IData}
     * @memberof EchartConverterBase
     */
    getChartXAxisParams(): IData;
    /**
     * @description 获取图表Y轴参数
     * @returns {*}  {IData}
     * @memberof EchartConverterBase
     */
    getChartYAxisParams(): IData;
    /**
     * @description 计算最大值最小值
     * @param {IModel} seriesModel
     * @param {IData[]} items
     * @returns {*}  {{ max: number; min: number }}
     * @memberof EchartConverterBase
     */
    calcMaxMin(seriesModel: IModel, items: IData[]): {
        max: number;
        min: number;
    };
    /**
     * @description 获取标签参数
     * @param {IModel} seriesModel
     * @param {IData[]} items
     * @returns {*}  {IData}
     * @memberof EchartConverterBase
     */
    getChartLabelParams(seriesModel: IModel, items: IData[]): IData;
    /**
     * @description 获取图例参数
     * @returns {*}  {IData}
     * @memberof EchartConverterBase
     */
    getChartLegendParams(): IData;
    /**
     * @description 获取控件参数
     * @returns {*}  {IData}
     * @memberof EchartConverterBase
     */
    getChartControlParams(): IData;
    /**
     * @description 获取tooltip参数
     * @param {IData} series
     * @param {boolean} [isRow=false]
     * @returns {*}
     * @memberof EchartConverterBase
     */
    getTooltipParams(series: IData, isRow?: boolean): {
        'EC.tooltip': string;
    } | {
        'EC.name': any;
        'EC.tooltip': string;
    };
    /**
     * @description 计算序列模型
     * @param {IAppBIReportMeasure[]} measures 指标
     * @param {IAppBIReportDimension} dimension 维度
     * @param {IAppBIReportDimension[]} [groupDimension] 分组维度
     * @returns {*}  {IModel[]}
     * @memberof EchartConverterBase
     */
    calcSeriesModel(measures: IAppBIReportMeasure[], dimension: IAppBIReportDimension, groupDimension?: IAppBIReportDimension): IModel[];
    /**
     * @description 转化数据到模型
     * @param {IData[]} items
     * @returns {*}  {({ model: IModel; options: IData; data: IData[] } | undefined)}
     * @memberof EchartConverterBase
     */
    translateDataToReport(items: IData[]): {
        model: IModel;
        options: IData;
        data: IData[];
    } | undefined;
}
//# sourceMappingURL=echart-converter-base.d.ts.map