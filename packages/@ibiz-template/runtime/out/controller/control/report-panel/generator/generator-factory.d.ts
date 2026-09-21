import { IDEReportPanel } from '@ibiz/model-core';
import { ReportPanelBaseGenerator } from './base-generator';
import { IReportPanelController } from '../../../../interface';
/**
 * 报表面板生成器工厂
 *
 * @export
 * @class ReportPanelGeneratorFactory
 */
export declare class ReportPanelGeneratorFactory {
    /**
     * 获取报表面板生成器实例
     *
     * @author tony001
     * @date 2024-06-20 15:06:18
     * @static
     * @param {IDEReportPanel} model
     * @param {IReportPanelController} reportPanel
     * @return {*}  {ReportPanelBaseGenerator}
     */
    static getInstance(model: IDEReportPanel, reportPanel: IReportPanelController): ReportPanelBaseGenerator;
}
//# sourceMappingURL=generator-factory.d.ts.map