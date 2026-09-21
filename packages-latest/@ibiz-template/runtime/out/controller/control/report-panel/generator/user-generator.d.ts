import { ReportPanelBaseGenerator } from './base-generator';
/**
 * 用户自定义（G6图表）
 *
 * @export
 * @class UserReportPanelGenerator
 * @extends {ReportPanelBaseGenerator}
 */
export declare class UserReportPanelGenerator extends ReportPanelBaseGenerator {
    /**
     * 初始化配置
     *
     * @protected
     * @memberof UserReportPanelGenerator
     */
    initConfig(): Promise<void>;
    /**
     * 加载
     *
     * @param {IData} data
     * @return {*}  {Promise<IData>}
     * @memberof UserReportPanelGenerator
     */
    load(data?: IData): Promise<IData>;
}
//# sourceMappingURL=user-generator.d.ts.map