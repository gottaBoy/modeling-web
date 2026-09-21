import { GridConverterBase } from './base';
/**
 * @description 表格转化器
 * @export
 * @class GridConverter
 * @extends {GridConverterBase}
 */
export declare class GridConverter extends GridConverterBase {
    /**
     * @description 仿真模型
     * @type {IModel}
     * @memberof GridConverter
     */
    mockModel: IModel;
    /**
     * @description 计算表格列模型
     * @returns {*}  {IModel[]}
     * @memberof GridConverter
     */
    calcGridColumns(): IModel[];
    /**
     * @description 计算表格数据项
     * @param {IModel[]} gridColumns
     * @returns {*}  {IModel[]}
     * @memberof GridConverter
     */
    calcGridDataItems(gridColumns: IModel[]): IModel[];
    /**
     * @description 转化数据到报表
     * @param {IData[]} items
     * @returns {*}  {({ model: IModel; options: IData; data: IData[] } | undefined)}
     * @memberof GridConverter
     */
    translateDataToReport(items: IData[]): {
        model: IModel;
        options: IData;
        data: IData[];
    } | undefined;
}
//# sourceMappingURL=grid-converter.d.ts.map