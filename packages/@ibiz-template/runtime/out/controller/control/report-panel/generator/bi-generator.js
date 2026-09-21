import { ReportPanelBaseGenerator } from './base-generator';
/**
 * BI报表相关
 *
 * @author tony001
 * @date 2024-06-18 13:06:30
 * @export
 * @class BIReportPanelGenerator
 * @extends {ReportPanelBaseGenerator}
 */
export class BIReportPanelGenerator extends ReportPanelBaseGenerator {
    /**
     * 初始化配置
     *
     * @author tony001
     * @date 2024-06-26 16:06:54
     * @return {*}  {Promise<void>}
     */
    async initConfig() {
        const { appDEReport } = this.model;
        const { appBIReport } = appDEReport;
        const appBISchemeId = appDEReport.appBISchemeId.split('.').pop();
        appBIReport.appBISchemeId = appBISchemeId;
        this.config = appBIReport;
    }
    /**
     * 加载数据
     *
     * @author tony001
     * @date 2024-06-20 11:06:52
     * @param {IData} data
     * @return {*}  {Promise<IData>}
     */
    load(data = {}) {
        if (this.protoRef) {
            this.protoRef.refresh('ALL');
        }
        return Promise.resolve(data);
    }
}
