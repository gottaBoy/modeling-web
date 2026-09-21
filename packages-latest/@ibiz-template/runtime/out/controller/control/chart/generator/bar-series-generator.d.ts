import { IChartSeriesBar } from '@ibiz/model-core';
import type { SeriesOption } from 'echarts';
import { BaseSeriesGenerator } from './base-series-generator';
/**
 * 柱状图序列生成器
 * @author lxm
 * @date 2023-06-11 06:19:25
 * @export
 * @class BarSeriesGenerator
 * @extends {BaseSeriesGenerator<IChartSeriesBar>}
 */
export declare class BarSeriesGenerator extends BaseSeriesGenerator<IChartSeriesBar> {
    protected calcStaticOptions(): SeriesOption;
}
//# sourceMappingURL=bar-series-generator.d.ts.map