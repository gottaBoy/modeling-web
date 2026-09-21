import { IAppBIReport, IAppBIReportDimension, IAppBIReportMeasure } from '@ibiz/model-core';
/**
 * 递归处理对象属性
 *
 * @author tony001
 * @date 2024-06-06 18:06:50
 * @export
 * @param {IData} data 传入数据
 * @param {Function} callback 处理单个属性回调
 */
export declare function deepHandData(data: IData, callback: Function): void;
/**
 * 格式化单个属性
 *
 * @author tony001
 * @date 2024-06-12 18:06:10
 * @export
 * @param {string} str
 * @param {IData} data
 * @return {*}  {string}
 */
export declare function formatField(str: string, data: IData): string;
/**
 * 解析报表UI模型
 *
 * @export
 * @param {string} key
 * @param {string} model
 */
export declare function parseReportUIModel(key: string, report: IAppBIReport): any;
/**
 * 获取指标参数
 *
 * @author tony001
 * @date 2024-07-16 20:07:35
 * @export
 * @param {IAppBIReport} reportModel
 * @param {IAppBIReportMeasure[]} [reportMeasures=[]]
 * @return {*}  {IData[]}
 */
export declare function getReportMeasureParam(reportModel: IAppBIReport, reportMeasures?: IAppBIReportMeasure[]): IData[];
/**
 * 获取维度参数
 *
 * @author tony001
 * @date 2024-07-16 20:07:52
 * @export
 * @param {IAppBIReportDimension[]} [reportDimensions=[]]
 * @param {IAppBIReport} reportModel
 * @return {*}  {IData[]}
 */
export declare function getReportDimensionParam(reportModel: IAppBIReport, reportDimensions?: IAppBIReportDimension[]): IData[];
/**
 * 获取排序参数
 *
 * @author tony001
 * @date 2024-07-28 16:07:53
 * @export
 * @param {IAppBIReport} reportModel
 * @param {IAppBIReportMeasure[]} [reportMeasures=[]]
 * @param {IAppBIReportDimension[]} [reportDimensions=[]]
 * @return {*}  {string | undefined}
 */
export declare function getReportSortParam(reportModel: IAppBIReport, reportMeasures?: IAppBIReportMeasure[], reportDimensions?: IAppBIReportDimension[]): string | undefined;
/**
 * 处理序列代码表
 *
 * @export
 * @param {IData[]} items
 * @param {IData} model
 * @param {IData} opts
 */
export declare function handleSeriesCodeList(items: IAppBIReportMeasure[], model: IData, opts: IData, callback?: Function): IData[];
/**
 * 处理分组转序列
 *
 * @export
 */
export declare function handleGroupToSeries(items: IData[], dimensions: IAppBIReportDimension[]): IAppBIReportMeasure[];
/**
 * 处理序列分组和tip
 *
 * @export
 * @param {Array<IData>} serieGroup
 * @param {IData} series
 * @param {boolean} [isStack=false]
 * @return {*}
 */
export declare function handleSerieGroupTip(serieGroup: Array<IData>, series: IData, isStack?: boolean, isRow?: boolean): {
    'EC.tooltip': string;
} | {
    'EC.name': any;
    'EC.tooltip': string;
};
/**
 * 处理饼图的tooltip
 *
 * @export
 * @param {IData} series
 * @return {*}
 */
export declare function handlePieSerieGroupTip(series: IData, measures: IData[], dimension: IData): {
    'EC.tooltip': string;
};
/**
 * 获取所有不是分组的维度
 *
 * @export
 * @param {IAppBIReport} data
 * @return {*}
 */
export declare function getAllNoGroupDimensions(data: IAppBIReport): {
    codename: any;
    name: any;
    mode: string;
    textAppDEFieldId: any;
    codelistId: any;
}[] | null | undefined;
/**
 * 计算各类型警戒线
 *
 * @export
 * @param {IData} line
 * @param {IData} _serie
 * @param {IData[]} items
 * @param {number} total
 * @param {string[]} categroup
 * @param {boolean} isRow
 * @return {*}
 */
export declare function computeMarkLine(line: IData, _serie: IData, items: IData[], total: number, categroup: string[], isRow: boolean): IData;
