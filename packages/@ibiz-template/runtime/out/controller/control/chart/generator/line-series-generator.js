import { RuntimeModelError } from '@ibiz-template/core';
import { BaseSeriesGenerator } from './base-series-generator';
/**
 * 折线图序列生成器
 * @author lxm
 * @date 2023-06-11 06:19:15
 * @export
 * @class LineSeriesGenerator
 * @extends {BaseSeriesGenerator<IChartSeriesLine>}
 */
export class LineSeriesGenerator extends BaseSeriesGenerator {
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
        const { stack, step } = this.model;
        if (stack) {
            // todo 堆叠
        }
        // 是否是阶梯线图
        if (step) {
            options.step = 'middle';
        }
        return options;
    }
}
