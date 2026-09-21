import { IChartSeriesFunnel } from '@ibiz/model-core';
import type { SeriesOption } from 'echarts';
import { BaseSeriesGenerator, CatalogData } from './base-series-generator';
interface funnelSeriesData {
    name: string;
    value: Array<number | IData | undefined>;
}
/**
 * 漏斗图序列生成器
 * @author lxm
 * @date 2023-06-11 06:18:46
 * @export
 * @class FunnelSeriesGenerator
 * @extends {BaseSeriesGenerator<IChartSeriesFunnel>}
 */
export declare class FunnelSeriesGenerator extends BaseSeriesGenerator<IChartSeriesFunnel> {
    protected calcStaticOptions(): SeriesOption;
    protected calcSeriesData(catalogData: CatalogData): funnelSeriesData[];
}
export {};
//# sourceMappingURL=funnel-series-generator.d.ts.map