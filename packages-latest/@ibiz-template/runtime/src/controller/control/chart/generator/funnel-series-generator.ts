import { IChartSeriesFunnel } from '@ibiz/model-core';
import type { FunnelSeriesOption, SeriesOption } from 'echarts';
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
export class FunnelSeriesGenerator extends BaseSeriesGenerator<IChartSeriesFunnel> {
  protected calcStaticOptions(): SeriesOption {
    const options = super.calcStaticOptions() as FunnelSeriesOption;

    options.label!.formatter = '{b}: {d}%';
    options.label!.position = 'outer';

    return options;
  }

  protected calcSeriesData(catalogData: CatalogData): funnelSeriesData[] {
    const temData: funnelSeriesData[] = [];
    catalogData.forEach((catalog, key) => {
      temData.push({
        name: key,
        value: [catalog.value, catalog.chartData],
      });
    });
    return temData;
  }
}
