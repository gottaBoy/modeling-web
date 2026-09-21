import { MultiSeriesConverter } from './base';
/**
 * @description 散点图转换器
 * @export
 * @class ScatterConverter
 * @extends {MultiSeriesConverter}
 */
export declare class ScatterConverter extends MultiSeriesConverter {
    /**
     * @description 仿真模型
     * @type {IModel}
     * @memberof ScatterConverter
     */
    mockModel: IModel;
    /**
     * @description 仿真序列模型
     * @type {IModel}
     * @memberof ScatterConverter
     */
    mockSerieModel: IModel;
    /**
     * @description 获取标签参数
     * @param {IModel} seriesModel
     * @param {IData[]} items
     * @returns {*}  {IData}
     * @memberof ScatterConverter
     */
    getChartLabelParams(seriesModel: IModel, items: IData[]): IData;
}
//# sourceMappingURL=scatter-converter.d.ts.map