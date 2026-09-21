import { MultiSeriesConverter } from './multi-series-converter';
/**
 * @description 条形图转换器基类
 * @export
 * @class BarConverterBase
 * @extends {MultiSeriesConverter}
 */
export declare class BarConverterBase extends MultiSeriesConverter {
    /**
     * @description 获取控件参数
     * @returns {*}  {IData}
     * @memberof BarConverterBase
     */
    getChartControlParams(): IData;
    /**
     * @description 计算X轴参数
     * @returns {*}  {IData}
     * @memberof BarConverterBase
     */
    getChartXAxisParams(): IData;
    /**
     * @description 计算Y轴参数
     * @returns {*}  {IData}
     * @memberof BarConverterBase
     */
    getChartYAxisParams(): IData;
    /**
     * @description 获取标签参数
     * @param {IModel} seriesModel
     * @param {IData[]} items
     * @returns {*}  {IData}
     * @memberof BarConverterBase
     */
    getChartLabelParams(seriesModel: IModel, items: IData[]): IData;
}
//# sourceMappingURL=bar-converter-base.d.ts.map