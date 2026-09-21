import { RuntimeModelError } from '@ibiz-template/core';
import { BaseSeriesGenerator } from './base-series-generator';
/**
 * 区域图序列生成器
 * @author ljx
 * @date 2024-12-31 10:03:53
 * @export
 * @class AreaSeriesGenerator
 * @extends {BaseSeriesGenerator<IChartSeriesLine>}
 */
export class AreaSeriesGenerator extends BaseSeriesGenerator {
    /**
     * 计算静态序列的options
     * @author ljx
     * @date 2024-12-31 10:03:53
     */
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
        options.type = 'line';
        options.areaStyle = {};
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
