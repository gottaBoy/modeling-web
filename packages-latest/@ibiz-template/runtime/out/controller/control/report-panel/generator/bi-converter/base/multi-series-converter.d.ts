import { EchartConverterBase } from './echart-converter-base';
/**
 * @description 多序列图表转换器
 * @export
 * @class MultiSeriesConverter
 * @extends {EchartConverterBase}
 */
export declare class MultiSeriesConverter extends EchartConverterBase {
    /**
     * @description 转化数据到报表
     * @param {IData[]} items
     * @returns {*}  {({ model: IModel; options: IData; data: IData[] } | undefined)}
     * @memberof MultiSeriesConverter
     */
    translateDataToReport(items: IData[]): {
        model: IModel;
        options: IData;
        data: IData[];
    } | undefined;
}
//# sourceMappingURL=multi-series-converter.d.ts.map