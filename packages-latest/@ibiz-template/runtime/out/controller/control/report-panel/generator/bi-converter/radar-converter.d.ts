import { MultiSeriesConverter } from './base';
/**
 * @description 雷达图转换器
 * @export
 * @class RadarConverter
 * @extends {MultiSeriesConverter}
 */
export declare class RadarConverter extends MultiSeriesConverter {
    /**
     * @description 仿真模型
     * @type {IModel}
     * @memberof RadarConverter
     */
    mockModel: IModel;
    /**
     * @description 仿真序列模型
     * @type {IModel}
     * @memberof RadarConverter
     */
    mockSerieModel: IModel;
    /**
     * @description 获取标签参数
     * @param {IModel} seriesModel
     * @param {IData[]} items
     * @returns {*}  {IData}
     * @memberof RadarConverter
     */
    getChartLabelParams(seriesModel: IModel, items: IData[]): IData;
    /**
     * @description 转化数据到报表
     * @param {IData[]} items
     * @returns {*}  {({ model: IModel; options: IData; data: IData[] } | undefined)}
     * @memberof RadarConverter
     */
    translateDataToReport(items: IData[]): {
        model: IModel;
        options: IData;
        data: IData[];
    } | undefined;
}
//# sourceMappingURL=radar-converter.d.ts.map