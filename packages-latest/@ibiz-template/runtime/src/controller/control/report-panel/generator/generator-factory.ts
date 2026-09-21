/* eslint-disable no-duplicate-case */
import { IDEReportPanel } from '@ibiz/model-core';
import { UserReportPanelGenerator } from './user-generator';
import { User2ReportPanelGenerator } from './user2-generator';
import { ReportPanelBaseGenerator } from './base-generator';
import { BIReportPanelGenerator } from './bi-generator';
import { IReportPanelController } from '../../../../interface';
/**
 * 报表面板生成器工厂
 *
 * @export
 * @class ReportPanelGeneratorFactory
 */
export class ReportPanelGeneratorFactory {
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
  public static getInstance(
    model: IDEReportPanel,
    reportPanel: IReportPanelController,
  ): ReportPanelBaseGenerator {
    if (!model || !model.appDEReport || !model.appDEReport.reportType) {
      throw new Error(
        ibiz.i18n.t('runtime.controller.control.reportPanel.reportType'),
      );
    }
    switch (model.appDEReport.reportType) {
      case 'USER':
        return new UserReportPanelGenerator(model, reportPanel);
      case 'USER2':
        return new User2ReportPanelGenerator(model, reportPanel);
      case 'DESYSBIREPORTS':
      case 'SYSBICUBE':
      case 'DESYSBICUBES':
      case 'ALLSYSBICUBES':
      case 'SYSBIREPORT':
      case 'SYSBICUBEREPORTS':
      case 'ALLSYSBIREPORTS':
        return new BIReportPanelGenerator(model, reportPanel);
      default:
        throw new Error(
          ibiz.i18n.t('runtime.controller.control.reportPanel.noImplemented', {
            reportType: model.appDEReport.reportType,
          }),
        );
    }
  }
}
