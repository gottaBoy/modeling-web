import { IChartSeriesScatter } from '@ibiz/model-core';
import type { SeriesOption } from 'echarts';
import { BaseSeriesGenerator } from './base-series-generator';
/**
 * 散点图序列生成器
 * @author lxm
 * @date 2023-06-11 06:19:34
 * @export
 * @class ScatterSeriesGenerator
 * @extends {BaseSeriesGenerator<IChartSeriesScatter>}
 */
export declare class ScatterSeriesGenerator extends BaseSeriesGenerator<IChartSeriesScatter> {
    protected calcStaticOptions(): SeriesOption;
}
//# sourceMappingURL=scatter-series-generator.d.ts.map