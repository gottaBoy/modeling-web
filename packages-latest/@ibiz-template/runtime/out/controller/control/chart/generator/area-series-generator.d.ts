import { IChartSeriesLine } from '@ibiz/model-core';
import type { SeriesOption } from 'echarts';
import { BaseSeriesGenerator } from './base-series-generator';
/**
 * 区域图序列生成器
 * @author ljx
 * @date 2024-12-31 10:03:53
 * @export
 * @class AreaSeriesGenerator
 * @extends {BaseSeriesGenerator<IChartSeriesLine>}
 */
export declare class AreaSeriesGenerator extends BaseSeriesGenerator<IChartSeriesLine> {
    /**
     * 计算静态序列的options
     * @author ljx
     * @date 2024-12-31 10:03:53
     */
    protected calcStaticOptions(): SeriesOption;
}
//# sourceMappingURL=area-series-generator.d.ts.map