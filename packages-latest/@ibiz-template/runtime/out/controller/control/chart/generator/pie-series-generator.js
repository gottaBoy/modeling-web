import { BaseSeriesGenerator } from './base-series-generator';
/**
 * 饼图序列生成器
 * @author lxm
 * @date 2023-06-11 06:19:03
 * @export
 * @class PieSeriesGenerator
 * @extends {BaseSeriesGenerator<IChartSeriesPie>}
 */
export class PieSeriesGenerator extends BaseSeriesGenerator {
    calcStaticOptions() {
        const options = super.calcStaticOptions();
        options.label.formatter = '{b}: {d}%';
        options.label.position = 'outside';
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
