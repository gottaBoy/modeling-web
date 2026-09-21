import { MultiSeriesConverter } from './base';
/**
 * @description 饼图转换器
 * @export
 * @class PieConverter
 * @extends {MultiSeriesConverter}
 */
export declare class PieConverter extends MultiSeriesConverter {
    /**
     * @description 仿真模型
     * @type {IModel}
     * @memberof PieConverter
     */
    mockModel: IModel;
    /**
     * @description 仿真序列模型
     * @type {IModel}
     * @memberof PieConverter
     */
    mockSerieModel: IModel;
    /**
     * @description 转化数据到报表
     * @param {IData[]} items
     * @returns {*}  {({ model: IModel; options: IData; data: IData[] } | undefined)}
     * @memberof PieConverter
     */
    translateDataToReport(items: IData[]): {
        model: IModel;
        options: IData;
        data: IData[];
    } | undefined;
    /**
     * @description  获取标签参数
     * @param {IModel} seriesModel
     * @param {IData[]} items
     * @returns {*}  {IData}
     * @memberof PieConverter
     */
    getChartLabelParams(seriesModel: IModel, items: IData[]): IData;
}
//# sourceMappingURL=pie-converter.d.ts.map