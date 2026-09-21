import { MultiSeriesConverter } from './base';
/**
 * @description 堆叠柱状图转换器
 * @export
 * @class StackColConverter
 * @extends {MultiSeriesConverter}
 */
export declare class StackColConverter extends MultiSeriesConverter {
    /**
     * @description 仿真模型
     * @type {IModel}
     * @memberof StackColConverter
     */
    mockModel: IModel;
    /**
     * @description 仿真序列模型
     * @type {IModel}
     * @memberof StackColConverter
     */
    mockSerieModel: IModel;
    /**
     * @description 转化数据到报表
     * @param {IData[]} items
     * @returns {*}  {({ model: IModel; options: IData; data: IData[] } | undefined)}
     * @memberof StackColConverter
     */
    translateDataToReport(items: IData[]): {
        model: IModel;
        options: IData;
        data: IData[];
    } | undefined;
}
//# sourceMappingURL=stack-col-converter.d.ts.map