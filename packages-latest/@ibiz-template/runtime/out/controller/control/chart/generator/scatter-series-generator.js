import { RuntimeModelError } from '@ibiz-template/core';
import { BaseSeriesGenerator } from './base-series-generator';
/**
 * 散点图序列生成器
 * @author lxm
 * @date 2023-06-11 06:19:34
 * @export
 * @class ScatterSeriesGenerator
 * @extends {BaseSeriesGenerator<IChartSeriesScatter>}
 */
export class ScatterSeriesGenerator extends BaseSeriesGenerator {
    calcStaticOptions() {
        if (this.xAxisIndex === undefined) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.control.chart.noConfiguredX'));
        }
        if (this.yAxisIndex === undefined) {
            throw new RuntimeModelError(this.model, ibiz.i18n.t('runtime.controller.control.chart.noConfiguredY'));
        }
        const options = super.calcStaticOptions();
        options.xAxisIndex = this.xAxisIndex;
        options.yAxisIndex = this.yAxisIndex;
        return options;
    }
}
