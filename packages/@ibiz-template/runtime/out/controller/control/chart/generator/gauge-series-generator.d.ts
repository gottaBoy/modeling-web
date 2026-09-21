import { IChartSeriesGauge } from '@ibiz/model-core';
import type { SeriesOption } from 'echarts';
import { BaseSeriesGenerator, CatalogData } from './base-series-generator';
/**
 * 仪表盘序列生成器
 * @author ljx
 * @date 2024-12-31 10:03:53
 * @export
 * @class GaugeSeriesGenerator
 * @extends {BaseSeriesGenerator<IChartSeriesLine>}
 */
export declare class GaugeSeriesGenerator extends BaseSeriesGenerator<IChartSeriesGauge> {
    protected calcStaticOptions(): SeriesOption;
    /**
     * 生成每条序列的data,由于不同图表类型格式不同所以为any
     * 默认提供的是一维数组
     * @author ljx
     * @date 2024-12-31 10:03:53
     * @param {CatalogData} catalogData
     * @return {*}  {*}
     */
    protected calcSeriesData(catalogData: CatalogData): any;
}
//# sourceMappingURL=gauge-series-generator.d.ts.map