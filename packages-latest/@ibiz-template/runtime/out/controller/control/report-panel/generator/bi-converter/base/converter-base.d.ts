import { IAppBIReport, IAppBIReportMeasure, IAppBIReportDimension } from '@ibiz/model-core';
/**
 * @description 转化器基类
 * @export
 * @abstract
 * @class ConverterBase
 */
export declare abstract class ConverterBase {
    protected appBIReport: IAppBIReport;
    protected context: IContext;
    protected params: IParams;
    /**
     * @description 仿真模型
     * @type {IModel}
     * @memberof ConverterBase
     */
    mockModel: IModel;
    /**
     * @description 报表前端模型（原始模型）
     * @type {IData}
     * @memberof ConverterBase
     */
    reportUIModel: IData;
    /**
     * @description 指标模型集合
     * @type {IAppBIReportMeasure[]}
     * @memberof ConverterBase
     */
    measures: IAppBIReportMeasure[];
    /**
     * @description 维度模型集合
     * @type {IAppBIReportDimension[]}
     * @memberof ConverterBase
     */
    dimensions: IAppBIReportDimension[];
    /**
     * @description 维度分组模型
     * @type {IAppBIReportDimension}
     * @memberof ConverterBase
     */
    groupDimension?: IAppBIReportDimension;
    /**
     * Creates an instance of ConverterBase.
     * @param {IAppBIReport} appBIReport 智能报表模型
     * @param {IContext} context 上下文
     * @param {IParams} params 视图参数
     * @memberof ConverterBase
     */
    constructor(appBIReport: IAppBIReport, context: IContext, params: IParams);
    /**
     * @description 初始化
     * @memberof ConverterBase
     */
    init(): Promise<void>;
    /**
     * @description 初始化-子类重写
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof ConverterBase
     */
    protected onInit(): Promise<void>;
    /**
     * @description 转化数据到报表
     * @param {IData[]} _items
     * @returns {*}  {({ model: IModel; options: IData; data: IData[] } | undefined)}
     * @memberof ConverterBase
     */
    translateDataToReport(_items: IData[]): {
        model: IModel;
        options: IData;
        data: IData[];
    } | undefined;
}
//# sourceMappingURL=converter-base.d.ts.map