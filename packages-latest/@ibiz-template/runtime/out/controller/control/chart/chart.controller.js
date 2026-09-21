import { RuntimeError } from '@ibiz-template/core';
import { ChartOptionsGenerator } from './generator/chart-options-generator';
import { ChartService } from './chart.service';
import { MDControlController } from '../../common';
export class ChartController extends MDControlController {
    constructor() {
        super(...arguments);
        /**
         * 图表tooltip的默认状态
         *
         * @memberof ChartController
         */
        this.tooltipState = true;
    }
    get _evt() {
        return this.evt;
    }
    initState() {
        super.initState();
        this.state.size = 1000;
        this.state.showGrid = false;
        this.state.gridHeaders = [];
        this.state.gridData = [];
        this.state.gridPosition = 'bottom';
        this.state.optionsReady = false;
    }
    async onCreated() {
        await super.onCreated();
        this.service = new ChartService(this.model);
        await this.service.init(this.context);
        this.generator = new ChartOptionsGenerator(this.model, {
            chartId: this.controlParams.chartid,
        });
        await this.generator.init(this.context, this.params);
        // 计算图表表格相关参数
        this.parseGridParam();
        // 监听resize调整图表大小
        this.resizeChart = this.resizeChart.bind(this);
        window.addEventListener('resize', this.resizeChart);
    }
    async afterLoad(args, items) {
        const result = await super.afterLoad(args, items);
        // 数据里预置srfcount这个字段
        items.forEach((item) => {
            Object.assign(item, { srfcount: 1 });
        });
        await this.calcOptions();
        return result;
    }
    /**
     * 改变tooltip的显示状态
     *
     * @param {boolean} [state=true]
     * @memberof ChartController
     */
    changeTooltipState(state = true) {
        if (this.chart && this.options && this.options.tooltip) {
            if (state) {
                this.chart.setOption({
                    tooltip: {
                        show: this.tooltipState,
                    },
                }, { notMerge: false });
            }
            else {
                this.chart.setOption({
                    tooltip: {
                        show: false,
                    },
                }, { notMerge: false });
            }
            this.resizeChart();
        }
    }
    /**
     * 计算当前点击序列的模型
     *
     * @param {IData} arg
     * @memberof ChartController
     */
    computedClickSerieModel(arg) {
        var _a;
        const { data, seriesType } = arg;
        let tempConfig = {};
        if (seriesType === 'pie' || seriesType === 'gauge') {
            // 饼图、仪表盘
            if (data && data.value && Array.isArray(data.value)) {
                tempConfig = data.value.at(1);
            }
        }
        else if (seriesType === 'radar') {
            // 雷达图
            const { componentIndex, componentSubType, componentType, event } = arg;
            const index = event.topTarget.__dimIdx;
            // 点击区域的时候抛出的值里面没有__dimIdx，此时不返回系列模型
            if (componentType === 'series' && (index || index === 0)) {
                const serieid = `${componentSubType}_${componentIndex}`;
                tempConfig = {
                    _seriesModelId: serieid,
                };
            }
        }
        else if (data && Array.isArray(data)) {
            // 其他图
            tempConfig = data.at(2);
        }
        const serieid = tempConfig._seriesModelId;
        const targetSerie = (_a = this.model.dechartSerieses) === null || _a === void 0 ? void 0 : _a.find((item) => {
            return item.id === serieid;
        });
        return targetSerie;
    }
    /**
     * 计算查看明细参数
     *
     * @param {IData} arg
     * @return {*}
     * @memberof ChartController
     */
    computedDrillDetailParam(arg) {
        var _a, _b, _c;
        const { seriesType } = arg;
        const targetSerie = this.computedClickSerieModel(arg);
        let measureId = '';
        const dimension = [];
        if (targetSerie) {
            measureId = targetSerie.valueField;
            if (seriesType === 'radar') {
                // 雷达图特殊处理，因为不会直接返回点击项的name
                const { event } = arg;
                // 获取点击项的下标
                const index = event.topTarget.__dimIdx;
                // 获取当前分类的所有数据
                const cataData = this.generator.radarMap.get(targetSerie.catalogField);
                if (cataData && cataData.indicatorKeys) {
                    // 获取点击的点所属的分类
                    const cataValue = cataData.indicatorKeys[index];
                    // 根据文本去构建的分类Map中获取对应的序列标识和分类的值
                    const tempDimension = (_a = this.generator.seriesGenerators) === null || _a === void 0 ? void 0 : _a[0].catalogMap.get(cataValue);
                    if (tempDimension) {
                        // 计算维度数据
                        Object.keys(tempDimension).forEach((key) => {
                            dimension.push({
                                name: key,
                                value: tempDimension[key],
                            });
                        });
                    }
                }
            }
            else if (seriesType !== 'gauge') {
                // 仪表盘无维度，其他图表统一处理
                const value = arg.name;
                // 直接根据name去分类Map中获取对应的序列标识和分类的值
                const tempDimension = (_b = this.generator.seriesGenerators) === null || _b === void 0 ? void 0 : _b[0].catalogMap.get(value);
                if (tempDimension) {
                    Object.keys(tempDimension).forEach((key) => {
                        dimension.push({
                            name: key,
                            value: tempDimension[key],
                        });
                    });
                }
            }
            if (targetSerie.seriesField) {
                const group = arg.data[2];
                let tempValue;
                const getOrigin = (origin) => {
                    if (origin && origin.$origin) {
                        return getOrigin(origin.$origin);
                    }
                    return origin;
                };
                const tempOrigin = getOrigin(group.$origin);
                if (tempOrigin) {
                    tempValue = tempOrigin[targetSerie.seriesField];
                }
                else {
                    tempValue = (_c = this.generator.seriesGenerators) === null || _c === void 0 ? void 0 : _c[0].catalogMap.get(group[targetSerie.seriesField]);
                }
                dimension.push({
                    name: targetSerie.seriesField,
                    value: tempValue,
                });
            }
        }
        return {
            measure: {
                name: measureId,
            },
            dimension: dimension.length > 0 ? dimension : undefined,
        };
    }
    /**
     * 解析表格相关参数
     *
     * @memberof ChartController
     */
    parseGridParam() {
        if (this.model.dechartDataGrid) {
            if (this.model.dechartDataGrid.dataGridPos) {
                this.state.gridPosition =
                    this.model.dechartDataGrid.dataGridPos.toLocaleLowerCase();
            }
            else {
                this.state.gridPosition = 'bottom';
            }
            if (this.model.dechartDataGrid.showDataGrid === true) {
                this.state.showGrid = true;
            }
        }
    }
    /**
     * 计算总数
     *
     * @param {string} valueField
     * @return {*}
     * @memberof ChartController
     */
    computeTotal(valueField) {
        let total = 0;
        this.state.items.forEach((item) => {
            const value = Number(item[valueField]);
            if (!Number.isNaN(value)) {
                total += Number(value);
            }
        });
        return total;
    }
    /**
     * 处理单序列时的表格数据
     * 图表单序列时，首先获取配置的分类属性和值属性的title,构建表头，内置支持百分比列
     * 然后遍历图表默认分出来的分组数据去生成表格的数据
     *
     * @memberof ChartController
     */
    handleSingleSerieGridData() {
        const serie = this.generator.seriesGenerators[0];
        // 单序列，构建表格数据，第一列为分组属性，第二列为值属性的值，第三列为百分比
        const { catalogField, valueField, groupData } = serie;
        const tempGridHeader = [
            {
                id: catalogField,
                name: ibiz.i18n.t('runtime.controller.control.chart.catalogField'),
            },
            {
                id: valueField,
                name: ibiz.i18n.t('runtime.controller.control.chart.value'),
            },
            {
                id: 'srfpercent',
                name: ibiz.i18n.t('runtime.controller.control.chart.percent'),
            },
        ];
        const tempData = [];
        const total = this.computeTotal(valueField);
        if (groupData && groupData.$default_group) {
            // 普通单序列
            const group = groupData.$default_group;
            for (const [key, value] of group) {
                const tempValue = Number.isNaN(Number(value.value))
                    ? 0
                    : Number(value.value);
                let percent = '';
                if (total === 0 || Number.isNaN(Number(value.value))) {
                    percent = '0%';
                }
                else {
                    percent = `${Math.round((tempValue / total) * 100)}%`;
                }
                const tempItem = {
                    [catalogField]: key,
                    [valueField]: tempValue,
                    srfpercent: percent,
                };
                tempData.push(tempItem);
            }
        }
        else if (groupData) {
            tempGridHeader.unshift({
                id: 'srfSerieGroup',
                name: ibiz.i18n.t('runtime.controller.control.chart.serieGroup'),
            });
            // 根据名称模拟的多序列
            Object.keys(groupData).forEach((key) => {
                const group = groupData[key];
                for (const [_key, value] of group) {
                    const tempValue = Number.isNaN(Number(value.value))
                        ? 0
                        : Number(value.value);
                    let percent = '';
                    if (total === 0 || Number.isNaN(Number(value.value))) {
                        percent = '0%';
                    }
                    else {
                        percent = `${Math.round((tempValue / total) * 100)}%`;
                    }
                    const tempItem = {
                        srfSerieGroup: key,
                        [catalogField]: _key,
                        [valueField]: tempValue,
                        srfpercent: percent,
                    };
                    tempData.push(tempItem);
                }
            });
        }
        this.state.gridHeaders = tempGridHeader;
        this.state.gridData = tempData;
    }
    /**
     * 处理多序列时的表格数据
     * 图表多序列时，首先去遍历序列，然后获取每个序列的分类属性和值属性以及已经分好的分组数据，
     * 查找当前的表格头数组中是否存在当前的分类或者值属性组成的项，如果没有就将当前分类或者值属性添加到表格头数组中，以序列作为表格列
     * 同理，循环当前序列的分组数据，并根据当前分组属性的值生成表格数据，如果在表格数据中已经存在具有相同分组属性值，则把当前序列的当前分组属性对应的值属性
     * 添加到表格数据中对应的项里
     *
     * @memberof ChartController
     */
    handleMultipleSerieGridData() {
        // 多序列,表格第一列使用分组属性的值，后续其他列通过其他序列计算后动态组装,
        const tempHeaders = [];
        const tempData = [];
        tempHeaders.push({
            id: 'srfGroupName',
            name: ibiz.i18n.t('runtime.controller.control.chart.serieGroup'),
        });
        this.generator.seriesGenerators.forEach((serie) => {
            const { catalogField, valueField, groupData, seriesName } = serie;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const _index = tempHeaders.findIndex((item) => {
                return item.id === catalogField;
            });
            if (_index < 0) {
                tempHeaders.push({
                    id: catalogField,
                    name: ibiz.i18n.t('runtime.controller.control.chart.catalogField'),
                });
            }
            const temp = tempHeaders.find(item => {
                return item.id === valueField;
            });
            if (!temp) {
                tempHeaders.push({
                    id: valueField,
                    name: ibiz.i18n.t('runtime.controller.control.chart.value'),
                });
            }
            if (groupData && groupData.$default_group) {
                const group = groupData.$default_group;
                for (const [key, value] of group) {
                    const tempValue = Number.isNaN(Number(value.value))
                        ? 0
                        : Number(value.value);
                    const index = tempData.findIndex((item) => {
                        return (item[catalogField] === key && item.srfGroupName === seriesName);
                    });
                    if (index < 0) {
                        const tempItem = {
                            srfGroupName: seriesName,
                            [catalogField]: key,
                            [valueField]: tempValue,
                        };
                        tempData.push(tempItem);
                    }
                    else {
                        // 在对应的数据项上添加属性
                        Object.assign(tempData[index], { [valueField]: tempValue });
                    }
                }
            }
        });
        this.state.gridHeaders = tempHeaders;
        this.state.gridData = tempData;
    }
    spanMethod(data) {
        var _a;
        const { row, column, rowIndex, columnIndex } = data;
        if (column.property === 'srfGroupName') {
            // 只有第一列或有值时才和并
            const allow = columnIndex === 0 || row.srfGroupName;
            // 第二行开始合并
            if (rowIndex > 0 &&
                allow &&
                row.srfGroupName === ((_a = this.state.gridData[rowIndex - 1]) === null || _a === void 0 ? void 0 : _a.srfGroupName)) {
                return [0, 0];
            }
            // 第一行计算出合并长度
            let rowspan = 1;
            for (let i = rowIndex + 1; i < this.state.gridData.length; i++) {
                if (allow && this.state.gridData[i].srfGroupName === row.srfGroupName) {
                    rowspan += 1;
                }
                else {
                    break;
                }
            }
            return [rowspan, 1];
        }
        return [1, 1];
    }
    /**
     * 计算表格数据
     *
     * @memberof ChartController
     */
    computeGridData() {
        if (this.generator && this.generator.seriesGenerators) {
            if (this.generator.seriesGenerators.length === 1) {
                this.handleSingleSerieGridData();
            }
            else {
                this.handleMultipleSerieGridData();
            }
        }
    }
    /**
     * 初始化echarts对象
     * @author lxm
     * @date 2023-06-07 09:37:05
     * @param {HTMLElement} dom
     */
    initChart(chart) {
        this.chart = chart;
        this.chart.on('click', params => {
            const activeData = this.generator.getChartDataByParams(params);
            if (activeData) {
                this.setActive(activeData);
            }
        });
        if (this.state.optionsReady && this.chart) {
            this.updateChart();
        }
    }
    /**
     * 根据数据计算最终的options
     * 并刷新echarts
     * @author lxm
     * @date 2023-06-07 09:58:00
     * @param {IData[]} [data=this.state.items]
     */
    async calcOptions(data = this.state.items) {
        this.options = await this.generator.calcOptionsByData(data, this.context, this.params);
        if (this.state.showGrid) {
            // 开启图表表格后才会计算表格的数据
            this.computeGridData();
        }
        this.state.optionsReady = true;
        if (this.chart) {
            this.updateChart();
        }
    }
    /**
     * 更新echart图表
     * @author lxm
     * @date 2023-06-07 10:03:48
     */
    async updateChart() {
        if (!this.chart) {
            ibiz.log.error(ibiz.i18n.t('runtime.controller.control.chart.noInitialised'));
            return;
        }
        if (!this.options) {
            throw new RuntimeError(ibiz.i18n.t('runtime.controller.control.chart.noCalculated'));
        }
        await this._evt.emit('onBeforeUpdate', undefined);
        this.chart.setOption(this.options, { notMerge: true });
        this.resizeChart();
    }
    /**
     * 刷新图表的大小
     * @author lxm
     * @date 2023-06-09 09:37:25
     */
    resizeChart() {
        if (this.chart) {
            this.chart.resize();
        }
    }
    /**
     * @description 跳转第一页
     * @returns {*}  {Promise<IData[]>}
     * @memberof ChartController
     */
    async goToFirstPage() {
        return [];
    }
    /**
     * @description 跳转上一页
     * @returns {*}  {Promise<IData[]>}
     * @memberof ChartController
     */
    async goToPreviousPage() {
        return [];
    }
    /**
     * @description 跳转下一页
     * @returns {*}  {Promise<IData[]>}
     * @memberof ChartController
     */
    async goToNextPage() {
        return [];
    }
    /**
     * @description 跳转最后一页
     * @returns {*}  {Promise<IData[]>}
     * @memberof ChartController
     */
    async goToLastPage() {
        return [];
    }
    /**
     * @description 转换各类多语言
     * @protected
     * @memberof ChartController
     */
    convertMultipleLanguages() {
        var _a, _b;
        const { emptyText, dechartTitle, chartXAxises, chartYAxises, dechartSerieses, emptyTextLanguageRes, } = this.model;
        if (emptyTextLanguageRes === null || emptyTextLanguageRes === void 0 ? void 0 : emptyTextLanguageRes.lanResTag)
            this.model.emptyText = ibiz.i18n.t(emptyTextLanguageRes.lanResTag, emptyText);
        // 图表标题多语言
        if ((_a = dechartTitle === null || dechartTitle === void 0 ? void 0 : dechartTitle.titleLanguageRes) === null || _a === void 0 ? void 0 : _a.lanResTag)
            dechartTitle.title = ibiz.i18n.t(dechartTitle.titleLanguageRes.lanResTag, dechartTitle.title);
        if ((_b = dechartTitle === null || dechartTitle === void 0 ? void 0 : dechartTitle.subTitleLanguageRes) === null || _b === void 0 ? void 0 : _b.lanResTag)
            dechartTitle.subTitle = ibiz.i18n.t(dechartTitle.subTitleLanguageRes.lanResTag, dechartTitle.subTitle);
        // 序列多语言
        dechartSerieses === null || dechartSerieses === void 0 ? void 0 : dechartSerieses.forEach(series => {
            var _a;
            if ((_a = series.capLanguageRes) === null || _a === void 0 ? void 0 : _a.lanResTag)
                series.caption = ibiz.i18n.t(series.capLanguageRes.lanResTag, series.caption);
        });
        // 坐标轴多语言
        chartXAxises === null || chartXAxises === void 0 ? void 0 : chartXAxises.forEach(axis => {
            var _a;
            if ((_a = axis.capLanguageRes) === null || _a === void 0 ? void 0 : _a.lanResTag)
                axis.caption = ibiz.i18n.t(axis.capLanguageRes.lanResTag, axis.caption);
        });
        chartYAxises === null || chartYAxises === void 0 ? void 0 : chartYAxises.forEach(axis => {
            var _a;
            if ((_a = axis.capLanguageRes) === null || _a === void 0 ? void 0 : _a.lanResTag)
                axis.caption = ibiz.i18n.t(axis.capLanguageRes.lanResTag, axis.caption);
        });
    }
    /**
     * @description 生命周期-销毁完成
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof ChartController
     */
    async onDestroyed() {
        var _a;
        window.removeEventListener('resize', this.resizeChart);
        await super.onDestroyed();
        (_a = this.chart) === null || _a === void 0 ? void 0 : _a.dispose();
    }
}
