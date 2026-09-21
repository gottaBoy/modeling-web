/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { clone, plus } from '@ibiz-template/core';
import { GridConverterBase } from './base';
/**
 * @description 交叉表转化器
 * @export
 * @class CrossTableConverter
 * @extends {GridConverterBase}
 */
export class CrossTableConverter extends GridConverterBase {
    constructor() {
        super(...arguments);
        /**
         * @description 仿真模型
         * @type {IModel}
         * @memberof CrossTableConverter
         */
        this.mockModel = {
            fetchControlAction: {
                id: 'fetch',
                appDEMethodId: 'fetchdefault',
                appId: this.appBIReport.appId,
                appDataEntityId: this.appBIReport.appDataEntityId,
            },
            controlParam: { id: this.appBIReport.id, appId: this.appBIReport.appId },
            pagingMode: 1,
            pagingSize: 20,
            autoLoad: true,
            aggMode: 'NONE',
            gridStyle: 'USER',
            groupMode: 'NONE',
            sortMode: 'REMOTE',
            singleSelect: true,
            controlType: 'GRID',
            columnEnableLink: 2,
            modelType: 'PSDEGRID',
            columnEnableFilter: 2,
            enablePagingBar: false,
            id: this.appBIReport.id,
            showBusyIndicator: true,
            enableCustomized: false,
            name: this.appBIReport.id,
            modelId: this.appBIReport.id,
            appId: this.appBIReport.appId,
            codeName: this.appBIReport.id,
            logicName: this.appBIReport.name,
            appDataEntityId: this.appBIReport.appDataEntityId,
        };
        /**
         * @description 百分比数据
         * @type {string[]}
         * @memberof CrossTableConverter
         */
        this.percentKeys = [];
        /**
         * @description 合计列标识
         * @type {string}
         * @memberof CrossTableConverter
         */
        this.totalColTag = 'col_sum';
        /**
         * @description 指标总数
         * @type {IData}
         * @memberof CrossTableConverter
         */
        this.measuresTotalResult = {};
    }
    /**
     * @description 初始化
     * - 处理列顺序
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof CrossTableConverter
     */
    async onInit() {
        var _a;
        const { appBIReportDimensions } = this.appBIReport;
        const { grid_col_sort } = this.reportUIModel;
        this.dimensions = [];
        grid_col_sort.forEach((col) => {
            const dimension = appBIReportDimensions === null || appBIReportDimensions === void 0 ? void 0 : appBIReportDimensions.find(d => { var _a; return ((_a = d.dimensionTag) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === col.codename.toLowerCase(); });
            if (dimension)
                this.dimensions.push(dimension);
        });
        this.dimensionCol = appBIReportDimensions === null || appBIReportDimensions === void 0 ? void 0 : appBIReportDimensions.find(d => d.placement === 'COLHEADER');
        if ((_a = this.dimensionCol) === null || _a === void 0 ? void 0 : _a.appCodeListId) {
            const app = ibiz.hub.getApp(this.appBIReport.appId);
            this.codelistItems = await app.codeList.get(this.dimensionCol.appCodeListId, this.context, this.params);
        }
    }
    /**
     * @description 计算维度（列）
     * @param {IData[]} items
     * @returns {*}  {string[]}
     * @memberof CrossTableConverter
     */
    calcDimensionCols(items) {
        if (!this.dimensionCol)
            return [];
        if (this.codelistItems)
            return this.codelistItems.map(item => item.value);
        const result = new Set();
        const dimensionTag = this.dimensionCol.dimensionTag.toLowerCase();
        let hasBlank = false;
        for (const item of items) {
            const value = item[dimensionTag];
            if (!value) {
                hasBlank = true;
            }
            else {
                result.add(value);
            }
        }
        const resultArray = Array.from(result);
        if (hasBlank)
            resultArray.push('');
        return resultArray;
    }
    /**
     * 通过指标计算表格列
     *
     * @author tony001
     * @date 2024-12-19 17:12:52
     * @param {IData} data
     * @param {string} [type]
     * @return {*}  {IModel[]}
     */
    clacMeasureColumns(parentName) {
        return this.measures.map(item => {
            let codeName = item.measureTag.toLowerCase();
            if (parentName)
                codeName = `${parentName}@${codeName}`;
            const totalCodename = `${this.totalColTag}@${codeName}`;
            this.percentKeys.push(codeName);
            return Object.assign({ codeName, width: 150, id: codeName, totalCodename, widthUnit: 'STAR', valueType: 'SIMPLE', measureTag: codeName, dataItemName: codeName, appDEFieldId: codeName, format: item.jsonFormat, caption: item.measureName, columnType: 'DEFGRIDCOLUMN', appId: this.appBIReport.appId, appCodeListId: item.appCodeListId }, this.calcGridColumnStyle());
        });
    }
    /**
     * @description 计算合计表格列
     * @param {string} position
     * @param {IModel[]} degridColumns
     * @memberof CrossTableConverter
     */
    calcAggGridCol(position, degridColumns) {
        const { grid_show_agg, grid_agg_col_position } = this.reportUIModel;
        if (this.dimensionCol &&
            grid_show_agg == '1' &&
            grid_agg_col_position === position) {
            const children = this.clacMeasureColumns(this.totalColTag);
            const column = {
                caption: '合计',
                id: this.totalColTag,
                degridColumns: children,
                codeName: this.totalColTag,
                measureTag: this.totalColTag,
                appId: this.appBIReport.appId,
                columnType: 'GROUPGRIDCOLUMN',
                dataItemName: this.totalColTag,
            };
            degridColumns.push(column);
        }
    }
    /**
     * @description 计算合计列数据
     * @param {IData[]} items
     * @memberof CrossTableConverter
     */
    calcAggTotalData(items) {
        this.measures.forEach(measure => {
            const codeName = `${this.totalColTag}@${measure.measureTag.toLowerCase()}`;
            this.measuresTotalResult[codeName] = 0;
        });
        items.forEach((item) => {
            this.measures.forEach(measure => {
                const codeName = `${this.totalColTag}@${measure.measureTag.toLowerCase()}`;
                const total = this.percentKeys.reduce((a, b) => {
                    const bvalue = Number(item[b]) || 0;
                    return plus(a, bvalue);
                }, 0);
                this.measuresTotalResult[codeName] += total;
                item[codeName] = total;
            });
        });
    }
    /**
     * @description 计算交叉表
     * @param {string[]} dimensionCols 维度列
     * @returns {*}  {IModel[]}
     * @memberof CrossTableConverter
     */
    calcCrossTableColumns(dimensionCols) {
        const deGridColumns = [];
        if (this.dimensions) {
            deGridColumns.push(...this.dimensions.map(item => {
                const codeName = item.dimensionTag.toLowerCase();
                return Object.assign({ codeName, width: 150, id: codeName, widthUnit: 'STAR', measureTag: codeName, appDEFieldId: codeName, dataItemName: codeName, caption: item.dimensionName, columnType: 'DEFGRIDCOLUMN', appId: this.appBIReport.appId, appCodeListId: item.appCodeListId }, this.calcGridColumnStyle(false));
            }));
        }
        this.calcAggGridCol('left', deGridColumns);
        if (this.dimensionCol) {
            const codeNme = this.dimensionCol.dimensionTag.toLowerCase();
            const groupColumns = dimensionCols.map((key, index) => {
                var _a, _b;
                const children = this.clacMeasureColumns(key);
                return {
                    degridColumns: children,
                    id: `${codeNme}-${index}`,
                    appId: this.appBIReport.appId,
                    columnType: 'GROUPGRIDCOLUMN',
                    codeName: `${codeNme}-${index}`,
                    measureTag: `${codeNme}-${index}`,
                    dataItemName: `${codeNme}-${index}`,
                    appDEFieldId: `${codeNme}-${index}`,
                    appCodeListId: this.dimensionCol.appCodeListId,
                    caption: ((_b = (_a = this.codelistItems) === null || _a === void 0 ? void 0 : _a.find(item => item.value == key)) === null || _b === void 0 ? void 0 : _b.text) || key,
                };
            });
            deGridColumns.push(...groupColumns);
        }
        else {
            const children = this.clacMeasureColumns();
            deGridColumns.push(...children);
        }
        this.calcAggGridCol('right', deGridColumns);
        return deGridColumns;
    }
    /**
     * @description 获取数据项
     * @param {IData[]} items
     * @param {IData} item
     * @returns {*}  {(IData | undefined)}
     * @memberof CrossTableConverter
     */
    getItem(items, item) {
        return items.find(x => {
            return (this.dimensions.findIndex(c => x[c.dimensionTag.toLowerCase()] !==
                item[c.dimensionTag.toLowerCase()]) === -1);
        });
    }
    /**
     * @description 计算交叉表数据
     * @param {IData[]} items
     * @returns {*}  {IData[]}
     * @memberof CrossTableConverter
     */
    calcCrossTableData(items) {
        if (this.dimensionCol) {
            const result = [];
            const codeName = this.dimensionCol.dimensionTag.toLowerCase();
            items.forEach((item) => {
                this.measures.forEach(_item => {
                    const type = _item.measureTag.toLowerCase() || '';
                    const value = item[codeName];
                    let key = type || '';
                    if (value)
                        key = `${value}@${type}`;
                    const oldData = this.getItem(result, item);
                    if (oldData) {
                        oldData[key] = item[type];
                    }
                    else {
                        const newItem = { [key]: item[type] };
                        this.dimensions.forEach(x => {
                            newItem[x.dimensionTag.toLowerCase()] =
                                item[x.dimensionTag.toLowerCase()];
                        });
                        result.push(newItem);
                    }
                });
            });
            return result;
        }
        return items;
    }
    /**
     * @description 计算交叉表数据项
     * @param {IData[]} columns
     * @returns {*}  {IModel[]}
     * @memberof CrossTableConverter
     */
    calcCrossTableDataItems(columns) {
        const degridDataItems = [];
        const { grid_function_setting } = this.reportUIModel;
        columns.forEach((column) => {
            const otherParams = {};
            if (column.totalCodename &&
                this.measuresTotalResult[column.totalCodename]) {
                if (grid_function_setting &&
                    grid_function_setting.indexOf('showPercent') !== -1) {
                    otherParams.customCode = true;
                    otherParams.scriptCode = `
        if (Object.prototype.hasOwnProperty.call(data, '${column.measureTag}')) {
          const value = data['${column.measureTag}'] / ${this.measuresTotalResult[column.totalCodename]};
          let formatValue = data['${column.measureTag}'];
          return formatValue + '(' + ibiz.util.text.format(value, '0.##%') + ')'
        }`;
                }
                else {
                    otherParams.customCode = true;
                    otherParams.scriptCode = `
          if (Object.prototype.hasOwnProperty.call(data, '${column.measureTag}')) {
            let formatValue = data['${column.measureTag}'];
            return formatValue
          }`;
                }
            }
            degridDataItems.push(Object.assign({ dataType: 25, id: column.id, valueType: 'SIMPLE', format: column.format, measureTag: column.measureTag, appId: this.appBIReport.appId }, otherParams));
            if (column.columnType === 'GROUPGRIDCOLUMN')
                degridDataItems.push(...this.calcCrossTableDataItems(column.degridColumns));
        });
        return degridDataItems;
    }
    /**
     * @description 转化数据到报表
     * @param {IData[]} items
     * @returns {*}  {({ model: IModel; options: IData; data: IData[] } | undefined)}
     * @memberof CrossTableConverter
     */
    translateDataToReport(items) {
        if (!this.measures)
            return;
        const tempModel = clone(this.mockModel);
        const dimensionCols = this.calcDimensionCols(items);
        const degridColumns = this.calcCrossTableColumns(dimensionCols);
        const mockDatas = this.calcCrossTableData(items);
        this.calcAggTotalData(mockDatas);
        const degridDataItems = this.calcCrossTableDataItems(degridColumns);
        Object.assign(tempModel, { degridColumns, degridDataItems });
        const { vars, classList, model } = this.getGridStyle();
        Object.assign(tempModel, model);
        const spanMethod = this.calcGridColumnMerge(mockDatas);
        Object.assign(tempModel, spanMethod);
        return { model: tempModel, options: { vars, classList }, data: mockDatas };
    }
}
