import { IChartSeriesLine } from '@ibiz/model-core';
import type { SeriesOption } from 'echarts';
import { BaseSeriesGenerator } from './base-series-generator';
/**
 * 折线图序列生成器
 * @author lxm
 * @date 2023-06-11 06:19:15
 * @export
 * @class LineSeriesGenerator
 * @extends {BaseSeriesGenerator<IChartSeriesLine>}
 */
export declare class LineSeriesGenerator extends BaseSeriesGenerator<IChartSeriesLine> {
    protected calcStaticOptions(): SeriesOption;
}
//# sourceMappingURL=line-series-generator.d.ts.map