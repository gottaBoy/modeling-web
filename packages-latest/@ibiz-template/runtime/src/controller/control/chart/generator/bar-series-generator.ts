import { RuntimeModelError } from '@ibiz-template/core';
import { IChartSeriesBar } from '@ibiz/model-core';
import type { BarSeriesOption, SeriesOption } from 'echarts';
import { BaseSeriesGenerator } from './base-series-generator';

/**
 * 柱状图序列生成器
 * @author lxm
 * @date 2023-06-11 06:19:25
 * @export
 * @class BarSeriesGenerator
 * @extends {BaseSeriesGenerator<IChartSeriesBar>}
 */
export class BarSeriesGenerator extends BaseSeriesGenerator<IChartSeriesBar> {
  protected calcStaticOptions(): SeriesOption {
    if (this.xAxisIndex === undefined) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.controller.control.chart.noConfiguredX'),
      );
    }
    if (this.yAxisIndex === undefined) {
      throw new RuntimeModelError(
        this.model,
        ibiz.i18n.t('runtime.controller.control.chart.noConfiguredY'),
      );
    }
    const options = super.calcStaticOptions() as BarSeriesOption;
    options.xAxisIndex = this.xAxisIndex;
    options.yAxisIndex = this.yAxisIndex;

    const { stack } = this.model;
    if (stack) {
      // todo 堆叠
    }
    return options;
  }
}
