import { MultiSeriesConverter } from './base';
/**
 * @description 多序列折线图转换器
 * @export
 * @class MultiSeriesLineConverter
 * @extends {MultiSeriesConverter}
 */
export declare class MultiSeriesLineConverter extends MultiSeriesConverter {
    /**
     * @description 仿真模型
     * @type {IModel}
     * @memberof MultiSeriesLineConverter
     */
    mockModel: IModel;
    /**
     * @description 仿真序列模型
     * @type {IModel}
     * @memberof MultiSeriesLineConverter
     */
    mockSerieModel: IModel;
    /**
     * @description 获取标签参数
     * @param {IModel} seriesModel
     * @param {IData[]} items
     * @returns {*}  {IData}
     * @memberof MultiSeriesLineConverter
     */
    getChartLabelParams(seriesModel: IModel, items: IData[]): IData;
}
//# sourceMappingURL=multi-series-line-converter.d.ts.map