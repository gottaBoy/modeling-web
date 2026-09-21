import { BarConverterBase } from './base';
/**
 * @description 堆叠条形图转换器
 * @export
 * @class StackBarConverter
 * @extends {BarConverterBase}
 */
export declare class StackBarConverter extends BarConverterBase {
    /**
     * @description 仿真模型
     * @type {IModel}
     * @memberof StackBarConverter
     */
    mockModel: IModel;
    /**
     * @description 仿真序列模型
     * @type {IModel}
     * @memberof StackBarConverter
     */
    mockSerieModel: IModel;
    /**
     * @description 转化数据到报表
     * @param {IData[]} items
     * @returns {*}  {({ model: IModel; options: IData; data: IData[] } | undefined)}
     * @memberof StackBarConverter
     */
    translateDataToReport(items: IData[]): {
        model: IModel;
        options: IData;
        data: IData[];
    } | undefined;
}
//# sourceMappingURL=stack-bar-converter.d.ts.map