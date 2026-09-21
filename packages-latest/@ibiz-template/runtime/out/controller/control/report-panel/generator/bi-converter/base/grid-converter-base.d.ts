import { ConverterBase } from './converter-base';
/**
 * @description 表格转化器基类
 * @export
 * @abstract
 * @class GridConverterBase
 * @extends {ConverterBase}
 */
export declare abstract class GridConverterBase extends ConverterBase {
    /**
     * @description 获取表格样式
     * @returns {*}  {IData}
     * @memberof GridConverterBase
     */
    getGridStyle(): IData;
    /**
     * @description 计算表格列样式
     * @param {boolean} [enableAgg=true]
     * @returns {*}  {IData}
     * @memberof GridConverterBase
     */
    calcGridColumnStyle(enableAgg?: boolean): IData;
    /**
     * @description 计算表格列合并
     * @param {IData[]} [items=[]] 表格展示数据
     * @returns {*}  {IData}
     * @memberof GridConverterBase
     */
    calcGridColumnMerge(items?: IData[]): IData;
    /**
     * @description 初始化
     * - 处理列顺序
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof GridConverterBase
     */
    protected onInit(): Promise<void>;
}
//# sourceMappingURL=grid-converter-base.d.ts.map