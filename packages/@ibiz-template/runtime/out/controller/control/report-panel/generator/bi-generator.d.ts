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
export declare class BIReportPanelGenerator extends ReportPanelBaseGenerator {
    /**
     * 初始化配置
     *
     * @author tony001
     * @date 2024-06-26 16:06:54
     * @return {*}  {Promise<void>}
     */
    initConfig(): Promise<void>;
    /**
     * 加载数据
     *
     * @author tony001
     * @date 2024-06-20 11:06:52
     * @param {IData} data
     * @return {*}  {Promise<IData>}
     */
    load(data?: IData): Promise<IData>;
}
//# sourceMappingURL=bi-generator.d.ts.map