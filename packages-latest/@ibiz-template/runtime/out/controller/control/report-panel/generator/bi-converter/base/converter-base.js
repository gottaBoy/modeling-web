/**
 * @description 转化器基类
 * @export
 * @abstract
 * @class ConverterBase
 */
export class ConverterBase {
    /**
     * Creates an instance of ConverterBase.
     * @param {IAppBIReport} appBIReport 智能报表模型
     * @param {IContext} context 上下文
     * @param {IParams} params 视图参数
     * @memberof ConverterBase
     */
    constructor(appBIReport, context, params) {
        this.appBIReport = appBIReport;
        this.context = context;
        this.params = params;
        /**
         * @description 仿真模型
         * @type {IModel}
         * @memberof ConverterBase
         */
        this.mockModel = {};
        /**
         * @description 报表前端模型（原始模型）
         * @type {IData}
         * @memberof ConverterBase
         */
        this.reportUIModel = {};
        /**
         * @description 指标模型集合
         * @type {IAppBIReportMeasure[]}
         * @memberof ConverterBase
         */
        this.measures = [];
        /**
         * @description 维度模型集合
         * @type {IAppBIReportDimension[]}
         * @memberof ConverterBase
         */
        this.dimensions = [];
    }
    /**
     * @description 初始化
     * @memberof ConverterBase
     */
    async init() {
        try {
            const { reportUIModel, appBIReportMeasures, appBIReportDimensions } = this.appBIReport;
            this.reportUIModel = reportUIModel
                ? JSON.parse(reportUIModel)
                : undefined;
            this.measures = appBIReportMeasures || [];
            this.dimensions =
                (appBIReportDimensions === null || appBIReportDimensions === void 0 ? void 0 : appBIReportDimensions.filter(dimension => dimension.dimensionTag !== this.reportUIModel.group_tags)) || [];
            this.groupDimension = appBIReportDimensions === null || appBIReportDimensions === void 0 ? void 0 : appBIReportDimensions.find(dimension => dimension.dimensionTag === this.reportUIModel.group_tags);
            await this.onInit();
        }
        catch (error) {
            ibiz.log.error(error);
        }
    }
    /**
     * @description 初始化-子类重写
     * @protected
     * @returns {*}  {Promise<void>}
     * @memberof ConverterBase
     */
    async onInit() { }
    /**
     * @description 转化数据到报表
     * @param {IData[]} _items
     * @returns {*}  {({ model: IModel; options: IData; data: IData[] } | undefined)}
     * @memberof ConverterBase
     */
    translateDataToReport(_items) {
        return undefined;
    }
}
