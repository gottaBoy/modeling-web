import { ReportPanelBaseGenerator } from './base-generator';
import { ConverterFactory } from './bi-converter/converter-factory';
/**
 * @description BI报表生成器
 * @export
 * @class BIReportPanelGenerator
 * @extends {ReportPanelBaseGenerator}
 */
export class BIReportPanelGenerator extends ReportPanelBaseGenerator {
    /**
     * @description 初始化配置
     * @returns {*}  {Promise<void>}
     * @memberof BIReportPanelGenerator
     */
    async initConfig() {
        const { appDEReport } = this.model;
        const { appBIReport } = appDEReport;
        const appBISchemeId = appDEReport.appBISchemeId.split('.').pop();
        appBIReport.appBISchemeId = appBISchemeId;
        this.config = appBIReport;
        await this.initConverter();
    }
    /**
     * @description 初始化转换器
     * @private
     * @memberof BIReportPanelGenerator
     */
    async initConverter() {
        var _a;
        const { appDEReport } = this.model;
        if (!appDEReport || !appDEReport.appBIReport)
            return;
        const { reportUIModel } = appDEReport.appBIReport;
        if (reportUIModel) {
            const tempReportUIModel = JSON.parse(reportUIModel);
            // 仅处理建模平台创建出来报表
            if (tempReportUIModel.chart_type) {
                this.reportType = tempReportUIModel.chart_type;
                this.converter = ConverterFactory.createConverter(tempReportUIModel.chart_type, appDEReport.appBIReport, this.reportPanel.context, this.reportPanel.params);
                await ((_a = this.converter) === null || _a === void 0 ? void 0 : _a.init());
            }
        }
    }
    /**
     * @description 生成
     * @param {IData[]} items
     * @returns {*}  {({
     *         model: IModel;
     *         options: IData;
     *         data: IData[];
     *       }
     *     | undefined)}
     * @memberof BIReportPanelGenerator
     */
    generate(items) {
        var _a;
        return (_a = this.converter) === null || _a === void 0 ? void 0 : _a.translateDataToReport(items);
    }
}
