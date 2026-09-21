import { IAppBIReportDimension, IAppBIReportMeasure } from '@ibiz/model-core';
import { MultiSeriesConverter } from './multi-series-converter';
/**
 * @description 分区图表基类转换器
 * @export
 * @class ZoneConverterBase
 * @extends {MultiSeriesConverter}
 */
export declare class ZoneConverterBase extends MultiSeriesConverter {
    /**
     * @description 获取控件参数
     * @returns {*}  {IData}
     * @memberof ZoneConverterBase
     */
    getChartControlParams(): IData;
    /**
     * @description 计算X轴参数
     * @returns {*}  {IData}
     * @memberof ZoneConverterBase
     */
    getChartXAxisParams(): IData;
    /**
     * @description 计算Y轴参数
     * @returns {*}  {IData}
     * @memberof ZoneConverterBase
     */
    getChartYAxisParams(): IData;
    /**
     * @description 计算序列模型
     * @param {IAppBIReportMeasure[]} measures 指标
     * @param {IAppBIReportDimension} dimension 维度
     * @param {IAppBIReportDimension} [groupDimension] 分组维度
     * @returns {*}  {IModel[]}
     * @memberof ZoneConverterBase
     */
    calcSeriesModel(measures: IAppBIReportMeasure[], dimension: IAppBIReportDimension, groupDimension?: IAppBIReportDimension): IModel[];
}
//# sourceMappingURL=zone-converter-base.d.ts.map