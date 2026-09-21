import { BaseSeriesGenerator } from './base-series-generator';
/**
 * 漏斗图序列生成器
 * @author lxm
 * @date 2023-06-11 06:18:46
 * @export
 * @class FunnelSeriesGenerator
 * @extends {BaseSeriesGenerator<IChartSeriesFunnel>}
 */
export class FunnelSeriesGenerator extends BaseSeriesGenerator {
    calcStaticOptions() {
        const options = super.calcStaticOptions();
        options.label.formatter = '{b}: {d}%';
        options.label.position = 'outer';
        return options;
    }
    calcSeriesData(catalogData) {
        const temData = [];
        catalogData.forEach((catalog, key) => {
            temData.push({
                name: key,
                value: [catalog.value, catalog.chartData],
            });
        });
        return temData;
    }
}
