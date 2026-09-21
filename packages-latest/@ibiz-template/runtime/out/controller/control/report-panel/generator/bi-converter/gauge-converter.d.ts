import { IAppBIReportDimension, IAppBIReportMeasure } from '@ibiz/model-core';
import { EchartConverterBase } from './base/echart-converter-base';
/**
 * @description 仪表盘转换器
 * @export
 * @class GaugeConverter
 * @extends {EchartConverterBase}
 */
export declare class GaugeConverter extends EchartConverterBase {
    /**
     * @description 仿真模型
     * @type {IModel}
     * @memberof GaugeConverter
     */
    mockModel: IModel;
    /**
     * @description 仿真序列模型
     * @type {IModel}
     * @memberof GaugeConverter
     */
    mockSerieModel: IModel;
    /**
     * @description 计算序列模型
     * @param {IAppBIReportMeasure[]} measures
     * @param {IAppBIReportDimension} dimension
     * @param {IAppBIReportDimension} [groupDimension]
     * @returns {*}  {IModel[]}
     * @memberof GaugeConverter
     */
    calcSeriesModel(measures: IAppBIReportMeasure[], dimension: IAppBIReportDimension, groupDimension?: IAppBIReportDimension): IModel[];
    /**
     * @description 转化数据到报表
     * @param {IData[]} items
     * @returns {*}  {({ model: IModel; options: IData; data: IData[] } | undefined)}
     * @memberof GaugeConverter
     */
    translateDataToReport(items: IData[]): {
        model: IModel;
        options: IData;
        data: IData[];
    } | undefined;
    /**
     * @description 计算序列参数
     * @returns {*}  {IData}
     * @memberof GaugeConverter
     */
    commputeSeriesParam(): IData;
}
//# sourceMappingURL=gauge-converter.d.ts.map