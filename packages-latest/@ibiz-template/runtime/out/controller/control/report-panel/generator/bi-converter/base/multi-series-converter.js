/* eslint-disable camelcase */
import { EchartConverterBase } from './echart-converter-base';
/**
 * @description 多序列图表转换器
 * @export
 * @class MultiSeriesConverter
 * @extends {EchartConverterBase}
 */
export class MultiSeriesConverter extends EchartConverterBase {
    /**
     * @description 转化数据到报表
     * @param {IData[]} items
     * @returns {*}  {({ model: IModel; options: IData; data: IData[] } | undefined)}
     * @memberof MultiSeriesConverter
     */
    translateDataToReport(items) {
        var _a;
        const report = super.translateDataToReport(items);
        if (!report)
            return;
        const { model } = report;
        // 图表颜色
        const chartColorParams = this.getChartColorParams();
        Object.assign(model.userParam, chartColorParams);
        // 横轴参数
        const xAxisParams = this.getChartXAxisParams();
        Object.assign(model.userParam, xAxisParams);
        // 纵轴参数
        const yAxisParams = this.getChartYAxisParams();
        Object.assign(model.userParam, yAxisParams);
        // 图例参数
        const legendParams = this.getChartLegendParams();
        Object.assign(model.userParam, legendParams);
        // 处理控件参数
        const controlParams = this.getChartControlParams();
        Object.assign(model, {
            controlParam: {
                ctrlParams: controlParams,
            },
        });
        // 处理序列参数
        (_a = model.dechartSerieses) === null || _a === void 0 ? void 0 : _a.forEach((series) => {
            Object.assign(series, {
                userParam: Object.assign(Object.assign({ 'EC.barWidth': '50%', 'EC.barMaxWidth': '36' }, this.getChartLabelParams(series, items)), this.getTooltipParams(series, controlParams.MODE === 'ROW')),
            });
        });
        return report;
    }
}
