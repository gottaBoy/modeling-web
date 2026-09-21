import { IAppBIReport } from '@ibiz/model-core';
import { IBIReportGridController } from '../interface';
import { BaseConverter } from './base-converter';
/**
 * 饼图转化器
 *
 * @author tony001
 * @date 2024-06-06 15:06:12
 * @export
 * @class TableConverter
 * @implements {IChartConverter}
 */
export declare class TableConverter extends BaseConverter {
    /**
     * 控制器
     *
     * @type {IBIReportGridController}
     * @memberof TableConverter
     */
    controller: IBIReportGridController;
    /**
     * 样式配置
     *
     * @type {IData}
     * @memberof TableConverter
     */
    styleConfig: IData;
    /**
     * 是否存在同环比数据
     *
     * @type {IData}
     * @memberof TableConverter
     */
    hasPeriod: boolean;
    /**
     * @description 表格属性映射表
     * @type {Map<string, string>}
     * @memberof TableConverter
     */
    gridFieldMap: Map<string, string>;
    /**
     * 根据样式计算列模型
     *
     * @return {*}
     * @memberof TableConverter
     */
    calcColumnStyle(enableAgg?: boolean): IData;
    /**
     * 计算表格列模型
     *
     * @param {IData} data
     * @return {*}
     * @memberof TableConverter
     */
    calcGridColumns(data: IAppBIReport): {
        dataItemName: string | undefined;
        appDEFieldId: string | undefined;
        caption: string | undefined;
        codeName: string | undefined;
        width: number;
        widthUnit: string;
        appCodeListId: string | undefined;
        columnType: string;
        id: string | undefined;
        appId: string;
    }[];
    /**
     * 计算表格数据列
     *
     * @param {IData[]} columns
     * @return {*}
     * @memberof TableConverter
     */
    calcGridDataItems(columns: IData[]): IData[];
    /**
     * 计算行合并
     *
     * @param {IAppBIReport} data
     * @return {*}
     * @memberof TableConverter
     */
    calcRowSpan(data: IAppBIReport): any[];
    /**
     * 通过数据翻译模型
     *
     * @param {(IAppBIReport | undefined)} data
     * @param {IModel} model
     * @param {IData} [opts={}]
     * @return {*}  {(Promise<IModel | undefined>)}
     * @memberof TableConverter
     */
    translateDataToModel(data: IAppBIReport | undefined, model: IModel, opts?: IData): Promise<IModel | undefined>;
    /**
     * 获取样式配置
     *
     * @param {IAppBIReport} config
     * @memberof TableConverter
     */
    getStyleConfig(config: IAppBIReport): any;
    /**
     * 转换样式
     *
     * @param {IAppBIReport} data
     * @param {IData} model
     * @memberof TableConverter
     */
    transformStyle(data: IAppBIReport, model: IData, mode?: string): void;
    /**
     * 过滤同环比数据
     *
     * @param {IAppBIReport} data
     * @param {IData} model
     * @memberof TableConverter
     */
    filterPeriod(items: IData[]): IData[];
    /**
     * @description 获取反查值
     * @param {IData} item
     * @param {string} name
     * @return {*}
     * @memberof TableConverter
     */
    getDrillValue(item: IData, name: string): any;
    /**
     * @description 计算表格属性
     * @param {IData} data
     * @param {IData[]} items
     * @memberof TableConverter
     */
    calcGridFieldMap(data: IData, items: IData[]): void;
    /**
     * @description 获取表格属性
     * @param {string} codeName
     * @return {*}  {string}
     * @memberof TableConverter
     */
    getGridField(codeName?: string): string | undefined;
}
