import { IChartSeriesCandlestick, IDEChartSeries } from '@ibiz/model-core';
import { BaseSeriesGenerator, CatalogData, GroupData } from './base-series-generator';
import { ChartOptionsGenerator } from './chart-options-generator';
import { IChartData } from '../../../../interface';
/** 序列的单条数据 */
export type CandlestickSingleData = {
    /**
     * 值属性的值
     * @author ljx
     * @date 2024-12-31 10:03:53
     * @type {number[]}
     */
    value: number[];
    /**
     * 图表数据
     * @author ljx
     * @date 2024-12-31 10:03:53
     * @type {IChartData}
     */
    chartData?: IChartData;
};
/** 分类数据，key是分类属性的值 */
export type CandlestickCatalogData = Map<string, CandlestickSingleData>;
/** 分组数据，key是分组属性的值 */
export type CandlestickGroupData = Record<string, CandlestickCatalogData>;
/**
 * k线图序列生成器
 * @author ljx
 * @date 2024-12-31 10:03:53
 * @export
 * @class CandlestickSeriesGenerator
 * @extends {BaseSeriesGenerator<IChartSeriesCandlestick>}
 */
export declare class CandlestickSeriesGenerator extends BaseSeriesGenerator<IChartSeriesCandlestick> {
    /**
     * 开盘值属性
     * @author ljx
     * @date 2024-12-31 10:03:53
     * @type {string}
     */
    openField: string;
    /**
     * 收盘值属性
     * @author ljx
     * @date 2024-12-31 10:03:53
     * @type {string}
     */
    closeField: string;
    /**
     * 最低值属性
     * @author ljx
     * @date 2024-12-31 10:03:53
     * @type {string}
     */
    lowestField: string;
    /**
     * 最高值属性
     * @author ljx
     * @date 2024-12-31 10:03:53
     * @type {string}
     */
    highestField: string;
    /**
     * 初始化参数
     * @author ljx
     * @date 2024-12-31 10:03:53
     * @param {T} model 序列模型
     * @param {ChartOptionsGenerator} chartGenerator 图表生成器
     */
    initParams(model: IDEChartSeries, chartGenerator: ChartOptionsGenerator): void;
    /**
     * 计算分组数据
     * @author ljx
     * @date 2024-12-31 10:03:53
     * @param {IData[]} data
     * @return {*}  {GroupData}
     */
    protected calcGroupData(data: IData[]): GroupData;
    /**
     * 生成每条序列的data,由于不同图表类型格式不同所以为any
     * 默认提供的是二维数组，按[x轴, y轴, 图表数据]格式
     * @author ljx
     * @date 2024-12-31 10:03:53
     * @param {CatalogData} catalogData
     * @return {*}  {*}
     */
    protected calcSeriesData(catalogData: CatalogData): any;
}
//# sourceMappingURL=candlestick-series-generator.d.ts.map