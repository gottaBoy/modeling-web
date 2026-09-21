import { ConverterBase } from './base/converter-base';
/**
 * @description 数值图表转换器
 * @export
 * @class NumberConverter
 * @extends {ConverterBase}
 */
export declare class NumberConverter extends ConverterBase {
    /**
     * @description 转化数据到报表
     * @param {IData[]} items
     * @returns {*}  {({ model: IModel; options: IData; data: IData[] } | undefined)}
     * @memberof NumberConverter
     */
    translateDataToReport(items: IData[]): {
        model: IModel;
        options: IData;
        data: IData[];
    } | undefined;
}
//# sourceMappingURL=number-converter.d.ts.map