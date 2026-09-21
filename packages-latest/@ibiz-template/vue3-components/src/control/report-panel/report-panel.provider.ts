import { IControlProvider } from '@ibiz-template/runtime';

/**
 * 报表面板适配器
 *
 * @export
 * @class ReportPanelProvider
 * @implements {IControlProvider}
 */
export class ReportPanelProvider implements IControlProvider {
  component: string = 'IBizReportPanelControl';
}
