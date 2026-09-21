import { clone, mergeDeepRight } from 'ramda';
import { isObject, isString } from 'qx-util';
import { RuntimeError } from '@ibiz-template/core';
import { LineSeriesGenerator } from './line-series-generator';
import { BarSeriesGenerator } from './bar-series-generator';
import { FunnelSeriesGenerator } from './funnel-series-generator';
import { PieSeriesGenerator } from './pie-series-generator';
import { ScatterSeriesGenerator } from './scatter-series-generator';
import { RadarSeriesGenerator } from './radar-series-generator';
import { AreaSeriesGenerator } from './area-series-generator';
import { GaugeSeriesGenerator } from './gauge-series-generator';
import { CandlestickSeriesGenerator } from './candlestick-series-generator';
/**
 * 递归地检查对象中的字符串，如果字符串表示一个函数，则将其转换为实际的函数。
 * @author ljx
 * @date 2024-05-08 18:03:07
 * @param {object} option - 要处理的对象。
 * @return {*}  {IData}
 */
const convertStringFunc = (option) => {
    const regex = /function\s*\(\s*|\s*function\s*\(\s*/;
    const result = {};
    Object.keys(option).forEach(key => {
        if (isString(option[key]) && regex.test(option[key])) {
            const strFunction = `return ${option[key]}`;
            // eslint-disable-next-line no-new-func
            result[key] = new Function(strFunction)();
        }
        else if (isObject(option[key])) {
            result[key] = convertStringFunc(option[key]);
        }
        else if (Array.isArray(option[key])) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            result[key] = option[key].map((item) => {
                if (typeof item !== 'object') {
                    return item;
                }
                return convertStringFunc(item);
            });
        }
        else {
            result[key] = option[key];
        }
    });
    return result;
};
/**
 * 解析userParams
 * @author lxm
 * @date 2023-06-09 09:03:07
 * @export
 * @param {Record<string, string>} userParams
 * @return {*}
 */
export function parseUserParams(userParams) {
    const option = {};
    if (userParams) {
        Object.keys(userParams).forEach(key => {
            const index = key.indexOf('.');
            if (index === -1) {
                return;
            }
            const customKey = key.slice(index + 1);
            if (customKey) {
                try {
                    option[customKey] = JSON.parse(userParams[key]);
                }
                catch (error) {
                    option[customKey] = userParams[key];
                }
            }
        });
    }
    return convertStringFunc(option);
}
export class ChartOptionsGenerator {
    constructor(model, extraArgs = {}) {
        this.model = model;
        this.extraArgs = extraArgs;
        /**
         * 根据模型配置算出来的静态echarts配置
         * @author lxm
         * @date 2023-06-07 09:50:44
         * @type {EChartsOption}
         */
        this.staticOptions = {
            tooltip: {
                show: true,
            },
        };
        /**
         * 最终计算产物
         * @author lxm
         * @date 2023-06-08 09:23:40
         * @type {EChartsOption}
         */
        this.options = {};
        /**
         * 序列生成器集合
         * @author lxm
         * @date 2023-06-09 05:47:41
         * @type {BaseSeriesGenerator[]}
         */
        this.seriesGenerators = [];
        /**
         * 雷达坐标系映射
         * key是分类属性，值是雷达坐标的序号
         * @author lxm
         * @date 2023-06-08 03:51:03
         */
        this.radarMap = new Map();
        /**
         * 缓存已经加载的代码表数据
         * @author lxm
         * @date 2023-06-09 07:47:35
         */
        this.codeListMap = new Map();
        /**
         * 维护图表序列index对应序列生成器Map
         * @return {*}
         * @author: zhujiamin
         * @Date: 2023-11-22 17:27:15
         */
        this.seriesGeneratorIndexMap = new Map();
        const { dechartTitle, dechartLegend, chartXAxises, chartYAxises, userParam, } = model;
        // 标题
        if (dechartTitle) {
            this.staticOptions.title = this.calcTitleOption(dechartTitle);
        }
        // 图例
        if (dechartLegend) {
            this.staticOptions.legend = this.calcLegendOption(dechartLegend);
        }
        // x轴
        if (chartXAxises === null || chartXAxises === void 0 ? void 0 : chartXAxises.length) {
            this.staticOptions.xAxis = this.calcXYAxisOption(chartXAxises);
        }
        // y轴
        if (chartYAxises === null || chartYAxises === void 0 ? void 0 : chartYAxises.length) {
            this.staticOptions.yAxis = this.calcXYAxisOption(chartYAxises);
        }
        if (userParam) {
            this.chartUserParam = parseUserParams(userParam);
        }
    }
    initSeriesGenerators() {
        var _a;
        (_a = this.model.dechartSerieses) === null || _a === void 0 ? void 0 : _a.forEach(series => {
            let seriesGenerator;
            switch (series.seriesType) {
                case 'line':
                    seriesGenerator = new LineSeriesGenerator(series, this);
                    break;
                case 'bar':
                    seriesGenerator = new BarSeriesGenerator(series, this);
                    break;
                case 'scatter':
                    seriesGenerator = new ScatterSeriesGenerator(series, this);
                    break;
                case 'pie':
                    seriesGenerator = new PieSeriesGenerator(series, this);
                    break;
                case 'funnel':
                    seriesGenerator = new FunnelSeriesGenerator(series, this);
                    break;
                case 'radar':
                    seriesGenerator = new RadarSeriesGenerator(series, this);
                    break;
                case 'area':
                    seriesGenerator = new AreaSeriesGenerator(series, this);
                    break;
                case 'gauge':
                    seriesGenerator = new GaugeSeriesGenerator(series, this);
                    break;
                case 'candlestick':
                    seriesGenerator = new CandlestickSeriesGenerator(series, this);
                    break;
                default:
                    ibiz.log.error(ibiz.i18n.t('runtime.controller.control.chart.noSupportSequence', {
                        seriesType: series.seriesType,
                    }));
                    break;
            }
            if (seriesGenerator) {
                this.seriesGenerators.push(seriesGenerator);
            }
        });
    }
    calcTitleOption(chartTitle) {
        const { showTitle, title, subTitle, titlePos } = chartTitle;
        const titleOption = {
            show: showTitle,
            text: title,
            subtext: subTitle,
        };
        // 标题位置
        titleOption.left = 'center';
        const position = titlePos === null || titlePos === void 0 ? void 0 : titlePos.toLowerCase();
        if (position === 'left' || position === 'right') {
            titleOption.left = position;
        }
        else if (position === 'bottom' || position === 'top') {
            titleOption.top = position;
        }
        return titleOption;
    }
    calcLegendOption(chartLegend) {
        const { showLegend, legendPos } = chartLegend;
        const legendOption = {};
        legendOption.show = showLegend;
        const position = legendPos === null || legendPos === void 0 ? void 0 : legendPos.toLowerCase();
        if (position === 'left' || position === 'right') {
            legendOption.left = position;
            legendOption.top = 'middle';
            legendOption.orient = 'vertical';
        }
        else if (position === 'bottom') {
            legendOption.top = position;
        }
        return legendOption;
    }
    calcXYAxisOption(chartAxises) {
        const AxisOption = [];
        chartAxises.forEach(chartAxis => {
            const { position, dataShowMode, userParam } = chartAxis;
            let option = {
                type: chartAxis.echartsType,
                name: chartAxis.caption,
                max: chartAxis.maxValue,
                min: chartAxis.minValue,
                position,
                axisLabel: {
                    formatter: (value) => {
                        if (typeof value === 'number') {
                            value = value.toString();
                        }
                        if (dataShowMode === 1) {
                            if (value.length > 4) {
                                return `${value.slice(0, 4).split('').join('\n')}\n...`;
                            }
                            return value.split('').join('\n');
                        }
                        if (dataShowMode === 2) {
                            if (value.length > 4) {
                                return `${value.slice(0, 4)}...`;
                            }
                        }
                        return value;
                    },
                    rotate: dataShowMode === 3 ? 45 : 0,
                },
            };
            // 有自定义参数的合并自定义参数
            if (userParam) {
                option = mergeDeepRight(option, parseUserParams(userParam));
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            AxisOption.push(option);
        });
        return AxisOption;
    }
    /**
     * 处理轴布局位置
     *
     * @param {CodeListItem[]} items
     * @param {number} padding
     * @param {number} total
     * @param {number} index
     * @param {boolean} isRow 是否横向
     * @return {*}
     * @memberof ChartOptionsGenerator
     */
    handleAxisLayout(items, padding, total, index, isRow = true) {
        const axisData = items.map((code) => {
            if (isRow) {
                return {
                    value: code.text,
                    textStyle: {
                        padding: [0, padding * (total - 1 - index), 0, 0],
                    },
                };
            }
            return {
                value: code.text,
                textStyle: {
                    padding: [padding * (total - 1 - index), 0, 0, 0],
                },
            };
        });
        return axisData;
    }
    /**
     * 处理轴层级
     *
     * @param {IData[]} tempaxis
     * @param {number} index
     * @param {IData[]} axisData
     * @return {*}
     * @memberof ChartOptionsGenerator
     */
    handleAxisLevel(tempaxis, index, axisData) {
        const tempAxisData = [];
        if (index === 0) {
            return axisData;
        }
        let length = 1;
        for (let i = 0; i < tempaxis.length; i++) {
            length *= tempaxis[i].data.length;
        }
        for (let i = 0; i < length; i++) {
            tempAxisData.push(...axisData);
        }
        return tempAxisData;
    }
    /**
     * 合并轴参数
     *
     * @param {(IData[] | IData)} axisData
     * @param {IData[]} tempAxis
     * @return {*}
     * @memberof ChartOptionsGenerator
     */
    mergeAxisData(axisData, tempAxis) {
        if (axisData && Array.isArray(axisData)) {
            return [...axisData, ...tempAxis];
        }
        return [axisData, ...tempAxis];
    }
    /**
     * 处理分区模式下序列模型的坐标轴位置
     *
     * @param {IData[]} seriesModel
     * @param {IData} opts
     * @memberof ChartOptionsGenerator
     */
    handleSeriesModelCoordinateAxis(seriesModel, opts) {
        const { xAxisParam, yAxisParam } = opts;
        const xaxis = [];
        const yaxis = [];
        for (let i = 0; i < seriesModel.length; i++) {
            const tempXAxis = clone(xAxisParam);
            const tempYAxis = clone(yAxisParam);
            Object.assign(tempXAxis, { gridIndex: i });
            Object.assign(tempYAxis, { gridIndex: i });
            // 需要模板支持解析数组参数
            // 如果当前的Y轴不需要显示label，则不计算后面的逻辑
            if (!tempYAxis.axisLabel)
                return;
            tempYAxis.axisLabel.formatter = function (_param) {
                // 如果有多个Y轴的label都要显示,那么每个Y轴的第一个值位置偏上，其他的偏下，避免重叠在一起
                if (_param === 0) {
                    return `{top|${_param}}`;
                }
                return `{bottom|${_param}}`;
            };
            // 除了最后一个，也就是最底下的那个，其他的X轴都不显示
            if (i !== seriesModel.length - 1) {
                tempXAxis.name = '';
                tempXAxis.axisLine.show = false;
                tempXAxis.axisLabel.show = false;
                tempXAxis.axisTick.show = false;
            }
            if (tempYAxis.showTitle) {
                Object.assign(tempYAxis, {
                    name: seriesModel[i].serieText,
                });
            }
            xaxis.push(tempXAxis);
            yaxis.push(tempYAxis);
        }
        this.chartUserParam.xAxis = xaxis;
        this.chartUserParam.yAxis = yaxis;
    }
    /**
     * 计算指标序列对应的的数值轴位置
     *
     * @param {IData[]} seriesModel
     * @param {IData} opts
     * @return {*}
     * @memberof ChartOptionsGenerator
     */
    computeValueAxisPos(seriesModel, opts) {
        const { axisParam, isRow } = opts;
        if (!axisParam || Array.isArray(axisParam)) {
            return;
        }
        const axis = [];
        const left = [];
        const right = [];
        seriesModel.forEach((serie) => {
            if ((!isRow && serie.userParam['EC.yAxisIndex'] !== 1) ||
                (isRow && serie.userParam['EC.xAxisIndex'] !== 1)) {
                left.push(serie);
            }
            else {
                right.push(serie);
            }
        });
        if (left) {
            const tempAxis = clone(axisParam);
            if (tempAxis.showTitle) {
                const serietext = left.map((serie) => {
                    return serie.serieText;
                });
                Object.assign(tempAxis, {
                    name: serietext.join('/'),
                });
            }
            axis.push(tempAxis);
        }
        if (right) {
            const tempAxis = clone(axisParam);
            if (tempAxis.showTitle) {
                const serietext = right.map((serie) => {
                    return serie.serieText;
                });
                Object.assign(tempAxis, {
                    name: serietext.join('/'),
                });
            }
            axis.push(tempAxis);
        }
        if (isRow) {
            this.chartUserParam.xAxis = axis;
        }
        else {
            this.chartUserParam.yAxis = axis;
        }
    }
    /**
     * 初始化多分类的X轴配置
     *
     * @return {*}  {Promise<void>}
     * @memberof ChartOptionsGenerator
     */
    async initMultiCatalogxAxis(data, context, params) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        const { controlParam } = this.model;
        // 分区模式 ，计算多个图表位置
        if (controlParam && ((_a = controlParam.ctrlParams) === null || _a === void 0 ? void 0 : _a.ZONE)) {
            const length = (_b = this.model.dechartSerieses) === null || _b === void 0 ? void 0 : _b.length;
            if (length) {
                const height = 85 / length;
                const items = [];
                for (let i = 0; i < length; i++) {
                    const top = i * height + 10;
                    const bottom = 100 - (height + top);
                    items.push({
                        top: `${top}%`,
                        bottom: `${bottom}%`,
                        containLabel: true,
                    });
                }
                if (this.chartUserParam) {
                    this.chartUserParam.grid = items;
                    this.handleSeriesModelCoordinateAxis(this.model.dechartSerieses, {
                        xAxisParam: ((_c = this.chartUserParam) === null || _c === void 0 ? void 0 : _c.xAxis) || {},
                        yAxisParam: ((_d = this.chartUserParam) === null || _d === void 0 ? void 0 : _d.yAxis) || {},
                    });
                }
            }
        }
        // 判断是否为多分类模式
        if (controlParam && ((_e = controlParam.ctrlParams) === null || _e === void 0 ? void 0 : _e.CATALOGFIELDS)) {
            try {
                // 获取分类分层配置
                const tempCatalogFields = JSON.parse(controlParam.ctrlParams.CATALOGFIELDS);
                const tempaxis = [];
                let titleshow = true;
                let labelshow = true;
                let fontConifg = {};
                let gridIndex = 0;
                // 需要一个分类属性组成的JSON数组
                if (Array.isArray(tempCatalogFields)) {
                    const app = ibiz.hub.getApp(context.srfappid);
                    if (this.chartUserParam) {
                        let tempconfig = {};
                        // 判断图表是否为横向条形图
                        if (((_f = controlParam.ctrlParams) === null || _f === void 0 ? void 0 : _f.MODE) === 'ROW') {
                            this.computeValueAxisPos(this.model.dechartSerieses, {
                                axisParam: ((_g = this.chartUserParam) === null || _g === void 0 ? void 0 : _g.xAxis) || {},
                                isRow: true,
                            });
                            // 获取yAxis配置数据
                            if (Array.isArray(this.chartUserParam.yAxis)) {
                                tempconfig =
                                    this.chartUserParam.yAxis[this.chartUserParam.yAxis.length - 1];
                            }
                            else {
                                // 计算轴标题和轴标签是否显示
                                tempconfig = this.chartUserParam.yAxis;
                            }
                        }
                        else if (Array.isArray(this.chartUserParam.xAxis)) {
                            // 获取xAxis配置数据
                            if (!((_h = controlParam.ctrlParams) === null || _h === void 0 ? void 0 : _h.ZONE)) {
                                this.computeValueAxisPos(this.model.dechartSerieses, {
                                    axisParam: ((_j = this.chartUserParam) === null || _j === void 0 ? void 0 : _j.yAxis) || {},
                                });
                            }
                            tempconfig =
                                this.chartUserParam.xAxis[this.chartUserParam.xAxis.length - 1];
                        }
                        else {
                            if (!((_k = controlParam.ctrlParams) === null || _k === void 0 ? void 0 : _k.ZONE)) {
                                this.computeValueAxisPos(this.model.dechartSerieses, {
                                    axisParam: ((_l = this.chartUserParam) === null || _l === void 0 ? void 0 : _l.yAxis) || {},
                                });
                            }
                            tempconfig = this.chartUserParam.xAxis;
                        }
                        // 计算轴标题和轴标签是否显示
                        if (tempconfig) {
                            titleshow =
                                tempconfig.name === undefined ? true : !!tempconfig.name;
                            labelshow =
                                ((_m = tempconfig.axisLabel) === null || _m === void 0 ? void 0 : _m.show) === undefined
                                    ? true
                                    : (_o = tempconfig.axisLabel) === null || _o === void 0 ? void 0 : _o.show;
                            fontConifg = tempconfig.axisLabel;
                        }
                    }
                    // 计算图表使用的grid配置
                    if (this.chartUserParam &&
                        this.chartUserParam.grid &&
                        Array.isArray(this.chartUserParam.grid)) {
                        gridIndex = this.chartUserParam.grid.length - 1;
                    }
                    // 获取分类代码表，最后一个分类是作为序列分类处理的，
                    await Promise.all(tempCatalogFields
                        .slice(0, -1)
                        .map(async (catalog, index) => {
                        var _a;
                        let currentLevelItems = [];
                        if (catalog.mode === 'codelist' && catalog.codelistId) {
                            const codeListItems = await app.codeList.get(catalog.codelistId, context, params);
                            if (codeListItems) {
                                if (catalog.sort === 'desc') {
                                    currentLevelItems = clone(codeListItems).reverse();
                                }
                                else {
                                    currentLevelItems = clone(codeListItems);
                                }
                            }
                        }
                        else {
                            currentLevelItems = data.map((_data) => {
                                return {
                                    text: _data[catalog.codename] || 'undefined',
                                };
                            });
                        }
                        if (((_a = controlParam.ctrlParams) === null || _a === void 0 ? void 0 : _a.MODE) === 'ROW') {
                            // 计算条形图时yAxis的配置以及图表的四周间隔
                            const yAxisData = this.handleAxisLayout(currentLevelItems, 60, tempCatalogFields.length, index);
                            // 开始计算每一层的标签刻度个数，并动态生成相应个数的配置数据
                            const tempxAxisData = this.handleAxisLevel(tempaxis, index, yAxisData);
                            tempaxis.push({
                                show: labelshow,
                                axisLabel: fontConifg,
                                gridIndex,
                                type: 'category',
                                data: tempxAxisData,
                                position: 'left',
                            });
                        }
                        else {
                            // 计算横轴在分层下的xAxis配置以及图表四周间隔
                            const xAxisData = this.handleAxisLayout(currentLevelItems, 24, tempCatalogFields.length, index, false);
                            const tempxAxisData = this.handleAxisLevel(tempaxis, index, xAxisData);
                            tempaxis.push({
                                show: labelshow,
                                axisLabel: fontConifg,
                                gridIndex,
                                type: 'category',
                                data: tempxAxisData,
                                position: 'bottom',
                            });
                        }
                    }));
                    // 计算分类分层显示情况下的轴标题
                    const mergeName = tempCatalogFields
                        .map((catalog) => {
                        return catalog.name;
                    })
                        .join('/');
                    let catalogLength = tempCatalogFields.length;
                    if (!labelshow) {
                        catalogLength = 1;
                    }
                    if (!titleshow) {
                        catalogLength -= 1;
                    }
                    if (this.chartUserParam) {
                        if (!this.chartUserParam.grid) {
                            this.chartUserParam.grid = {};
                        }
                        if (((_p = controlParam.ctrlParams) === null || _p === void 0 ? void 0 : _p.MODE) === 'ROW') {
                            // 动态计算条形图四周的间隙
                            if (catalogLength === 0) {
                                Object.assign(this.chartUserParam.grid, {
                                    top: 90,
                                    left: 60,
                                });
                            }
                            else {
                                if (fontConifg.show) {
                                    Object.assign(this.chartUserParam.grid, {
                                        left: (catalogLength + 1) * 60,
                                    });
                                }
                                else {
                                    Object.assign(this.chartUserParam.grid, {
                                        left: 100,
                                    });
                                }
                                // 根据图例显示时与值标题的位置和间距计算图表四周间隔
                                if ((_r = (_q = this.model) === null || _q === void 0 ? void 0 : _q.userParam) === null || _r === void 0 ? void 0 : _r['EC.legend']) {
                                    const tempLegend = JSON.parse(this.model.userParam['EC.legend']);
                                    if (tempLegend.show &&
                                        ['left-top', 'right-top', 'top'].includes(tempLegend.top)) {
                                        const right = (_t = (_s = this.model) === null || _s === void 0 ? void 0 : _s.dechartSerieses) === null || _t === void 0 ? void 0 : _t.filter((tempserie) => {
                                            return (tempserie.userParam &&
                                                tempserie.userParam['EC.xAxisIndex'] === 1);
                                        });
                                        if (right && right.length > 0) {
                                            Object.assign(this.chartUserParam.grid, {
                                                top: 90,
                                            });
                                        }
                                    }
                                    if (tempLegend.show &&
                                        ['left-bottom', 'right-bottom', 'bottom'].includes(tempLegend.top)) {
                                        const left = (_v = (_u = this.model) === null || _u === void 0 ? void 0 : _u.dechartSerieses) === null || _v === void 0 ? void 0 : _v.filter((tempserie) => {
                                            return (tempserie.userParam &&
                                                tempserie.userParam['EC.xAxisIndex'] !== 1);
                                        });
                                        if (left && left.length > 0) {
                                            Object.assign(this.chartUserParam.grid, {
                                                bottom: 90,
                                            });
                                        }
                                    }
                                }
                            }
                            const tempyAxis = this.chartUserParam.yAxis;
                            let nameTextStyle = {};
                            if (tempyAxis) {
                                if (Array.isArray(tempyAxis)) {
                                    nameTextStyle = tempyAxis[0].nameTextStyle || {};
                                }
                                else {
                                    nameTextStyle = tempyAxis.nameTextStyle || {};
                                }
                            }
                            // 计算完纵轴分层布局数据并合并用户参数
                            let rightSpace = 50;
                            if (fontConifg.show) {
                                rightSpace = (catalogLength + 1) * 50 - 25;
                            }
                            tempaxis.push({
                                type: 'category',
                                gridIndex,
                                axisLabel: this.handleAxisTitleParam(fontConifg, titleshow),
                                show: titleshow,
                                data: [
                                    {
                                        value: mergeName.split('').join('\n'),
                                        textStyle: Object.assign({ padding: [0, rightSpace, 0, 0] }, nameTextStyle),
                                    },
                                ],
                                position: 'left',
                            });
                            if (this.chartUserParam.yAxis) {
                                this.chartUserParam.yAxis = this.mergeAxisData(this.chartUserParam.yAxis, tempaxis);
                            }
                        }
                        else {
                            if (catalogLength === 0) {
                                Object.assign(this.chartUserParam.grid, {
                                    bottom: 45,
                                });
                            }
                            else {
                                Object.assign(this.chartUserParam.grid, {
                                    bottom: (catalogLength + 2) * 24,
                                });
                            }
                            const tempxAxis = this.chartUserParam.xAxis;
                            let nameTextStyle = {};
                            if (tempxAxis) {
                                if (Array.isArray(tempxAxis)) {
                                    nameTextStyle = tempxAxis[0].nameTextStyle || {};
                                }
                                else {
                                    nameTextStyle = tempxAxis.nameTextStyle || {};
                                }
                            }
                            tempaxis.push({
                                type: 'category',
                                gridIndex,
                                show: titleshow,
                                axisLabel: this.handleAxisTitleParam(fontConifg, titleshow),
                                data: [
                                    {
                                        value: mergeName,
                                        textStyle: Object.assign({ padding: [24 * catalogLength + 1, 0, 0, 0] }, nameTextStyle),
                                    },
                                ],
                                position: 'bottom',
                            });
                            if (this.chartUserParam.xAxis) {
                                this.chartUserParam.xAxis = this.mergeAxisData(this.chartUserParam.xAxis, tempaxis);
                            }
                        }
                    }
                }
            }
            catch (_w) {
                throw new Error(ibiz.i18n.t('runtime.control.chart.errorJson'));
            }
        }
    }
    /**
     * 处理轴标题参数
     *
     * @param {IData} [option={}]
     * @param {boolean} [titleshow=true]
     * @return {*}  {IData}
     * @memberof ChartOptionsGenerator
     */
    handleAxisTitleParam(option = {}, titleshow = true) {
        const tempOption = clone(option);
        Object.assign(tempOption, { show: titleshow });
        return tempOption;
    }
    /**
     * 初始化
     * @author lxm
     * @date 2023-08-29 06:34:04
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {Promise<void>}
     */
    async init(context, params) {
        await this.loadCodeList(context, params);
        if (this.model.appDataEntityId) {
            this.entity = await ibiz.hub.getAppDataEntity(this.model.appDataEntityId, this.model.appId);
        }
        this.initSeriesGenerators();
    }
    /**
     * 找到实体属性的codeName小写
     * @author lxm
     * @date 2023-08-29 06:42:06
     * @param {string} fieldName 属性的name
     * @return {*}  {string}
     */
    getFieldKey(fieldName) {
        var _a, _b;
        const find = (_b = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.appDEFields) === null || _b === void 0 ? void 0 : _b.find(item => item.name === fieldName);
        return find ? find.codeName.toLowerCase() : fieldName.toLowerCase();
    }
    /**
     * 加载代码表，
     * - 如果已经加载过会清空缓存重新加载
     * - 相同的代码表之后加载一次
     * @author lxm
     * @date 2023-06-09 08:05:28
     * @param {IContext} context
     * @param {IParams} params
     * @return {*}  {Promise<void>}
     */
    async loadCodeList(context, params) {
        var _a, _b, _c;
        // 先清空缓存;
        this.codeListMap.clear();
        if (!((_a = this.model.dechartSerieses) === null || _a === void 0 ? void 0 : _a.length)) {
            return;
        }
        const app = ibiz.hub.getApp(context.srfappid);
        const loadCodeList = async (key) => {
            if (!key || this.codeListMap.has(key)) {
                return;
            }
            const codeListItems = await app.codeList.get(key, context, params);
            this.codeListMap.set(key, codeListItems);
        };
        if ((_c = (_b = this.model.controlParam) === null || _b === void 0 ? void 0 : _b.ctrlParams) === null || _c === void 0 ? void 0 : _c.CATALOGFIELDS) {
            try {
                const tempCatalogFields = JSON.parse(this.model.controlParam.ctrlParams.CATALOGFIELDS);
                if (Array.isArray(tempCatalogFields)) {
                    await Promise.all(tempCatalogFields.map(async (catalog) => {
                        if (catalog.mode === 'codelist') {
                            await loadCodeList(catalog.codelistId);
                        }
                    }));
                }
            }
            catch (_d) {
                throw new Error(ibiz.i18n.t('runtime.control.chart.errorJson'));
            }
        }
        await Promise.all(this.model.dechartSerieses.map(async (series) => {
            const { seriesCodeListId, catalogCodeListId } = series;
            await loadCodeList(catalogCodeListId);
            await loadCodeList(seriesCodeListId);
        }));
    }
    /**
     * 根据数据计算出最终的options
     * @author lxm
     * @date 2023-06-09 08:10:52
     * @param {IData[]} data
     * @return {*}  {EChartsOption}
     */
    async calcOptionsByData(data, context, params) {
        await this.initMultiCatalogxAxis(data, context, params);
        // 清空操作
        this.radarMap.clear();
        this.options = {
            series: [],
            radar: [],
        };
        // 雷达图表先计算坐标系
        this.seriesGenerators.forEach(generator => {
            if (generator.model.seriesType === 'radar') {
                generator.calcRadarCoordSystem(data);
            }
        });
        // 生成雷达坐标系
        if (this.radarMap.size) {
            this.options.radar = [...this.radarMap.values()].map(radar => radar.toOptions());
        }
        // 生成seriesOptions
        const seriesOption = [];
        this.seriesGenerators.forEach(generator => {
            const startIndex = seriesOption.length; // 记录当前生成器开始的索引
            const series = generator.calcByData(data);
            if (series instanceof Array) {
                seriesOption.push(...series);
            }
            else {
                seriesOption.push(series);
            }
            const endIndex = seriesOption.length - 1; // 记录当前生成器结束的索引
            // 将生成器和对应的索引范围存入映射
            for (let i = startIndex; i <= endIndex; i++) {
                this.seriesGeneratorIndexMap.set(i, generator);
            }
        });
        this.options.series = seriesOption;
        // 柱状图、折线图、散点图单个序列并且该序列分组数据只有一条时，不用显示图例
        if (this.seriesGenerators.length === 1 &&
            this.seriesGenerators[0].groupData &&
            Object.keys(this.seriesGenerators[0].groupData).length === 1 &&
            seriesOption[0].type &&
            ['bar', 'line', 'scatter'].includes(seriesOption[0].type) &&
            this.staticOptions.legend) {
            this.staticOptions.legend.show = false;
        }
        // 合并静态和动态的options
        this.options = mergeDeepRight(this.staticOptions, this.options);
        // 有自定义参数的合并自定义参数
        if (this.chartUserParam) {
            this.options = mergeDeepRight(this.options, this.chartUserParam);
        }
        return this.options;
    }
    /**
     * 根据echarts给的params得到图表数据
     * @param {ECElementEvent} params
     * @return {*}
     * @author: zhujiamin
     * @Date: 2023-11-22 16:11:50
     */
    getChartDataByParams(params) {
        const generator = this.seriesGeneratorIndexMap.get(params.seriesIndex);
        if (!generator) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.chart.noFindSequence', {
                seriesIndex: params.seriesIndex,
            }));
        }
        return generator.getChartDataByParams(params);
    }
}
