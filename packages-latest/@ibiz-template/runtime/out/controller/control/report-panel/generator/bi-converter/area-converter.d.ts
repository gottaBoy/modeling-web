import { MultiSeriesConverter } from './base';
/**
 * @description 面积图转换器
 * @export
 * @class AreaConverter
 * @extends {MultiSeriesConverter}
 */
export declare class AreaConverter extends MultiSeriesConverter {
    /**
     * @description 仿真模型
     * @type {IModel}
     * @memberof AreaConverter
     */
    mockModel: IModel;
    /**
     * @description 仿真序列模型
     * @type {IModel}
     * @memberof AreaConverter
     */
    mockSerieModel: IModel;
    /**
     * @description 转化数据到报表
     * @param {IData[]} items
     * @returns {*}  {({ model: IModel; options: IData; data: IData[] } | undefined)}
     * @memberof AreaConverter
     */
    translateDataToReport(items: IData[]): {
        model: IModel;
        options: IData;
        data: IData[];
    } | undefined;
}
//# sourceMappingURL=area-converter.d.ts.map