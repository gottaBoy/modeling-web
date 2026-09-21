import { IChartSeriesPie } from '@ibiz/model-core';
import type { SeriesOption } from 'echarts';
import { BaseSeriesGenerator, CatalogData } from './base-series-generator';
interface pieSeriesData {
    name: string;
    value: Array<number | IData | undefined>;
}
/**
 * 饼图序列生成器
 * @author lxm
 * @date 2023-06-11 06:19:03
 * @export
 * @class PieSeriesGenerator
 * @extends {BaseSeriesGenerator<IChartSeriesPie>}
 */
export declare class PieSeriesGenerator extends BaseSeriesGenerator<IChartSeriesPie> {
    protected calcStaticOptions(): SeriesOption;
    protected calcSeriesData(catalogData: CatalogData): pieSeriesData[];
}
export {};
//# sourceMappingURL=pie-series-generator.d.ts.map