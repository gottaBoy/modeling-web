import { IChartSeriesPie } from '@ibiz/model-core';
import type { PieSeriesOption, SeriesOption } from 'echarts';
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
export class PieSeriesGenerator extends BaseSeriesGenerator<IChartSeriesPie> {
  protected calcStaticOptions(): SeriesOption {
    const options = super.calcStaticOptions() as PieSeriesOption;

    options.label!.formatter = '{b}: {d}%';
    options.label!.position = 'outside';

    return options;
  }

  protected calcSeriesData(catalogData: CatalogData): pieSeriesData[] {
    const temData: pieSeriesData[] = [];
    catalogData.forEach((catalog, key) => {
      temData.push({
        name: key,
        value: [catalog.value, catalog.chartData],
      });
    });
    return temData;
  }
}
