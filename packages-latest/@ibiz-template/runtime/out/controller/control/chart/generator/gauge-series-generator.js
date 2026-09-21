import { BaseSeriesGenerator } from './base-series-generator';
/**
 * 仪表盘序列生成器
 * @author ljx
 * @date 2024-12-31 10:03:53
 * @export
 * @class GaugeSeriesGenerator
 * @extends {BaseSeriesGenerator<IChartSeriesLine>}
 */
export class GaugeSeriesGenerator extends BaseSeriesGenerator {
    calcStaticOptions() {
        const options = super.calcStaticOptions();
        options.progress = {
            show: true,
        };
        return options;
    }
    /**
     * 生成每条序列的data,由于不同图表类型格式不同所以为any
     * 默认提供的是一维数组
     * @author ljx
     * @date 2024-12-31 10:03:53
     * @param {CatalogData} catalogData
     * @return {*}  {*}
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    calcSeriesData(catalogData) {
        let sum = 0;
        catalogData.forEach(catalog => {
            sum += catalog.value;
        });
        return [{ name: this.seriesName, value: sum }];
    }
}
