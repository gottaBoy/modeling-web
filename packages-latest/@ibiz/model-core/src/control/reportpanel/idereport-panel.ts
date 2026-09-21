import { IAppDEReport } from '../../app/dataentity/iapp-dereport';
import { IControl } from '../icontrol';

/**
 *
 * 实体报表面板模型对象接口
 * 继承父接口类型值[REPORTPANEL]
 * @export
 * @interface IDEReportPanel
 */
export interface IDEReportPanel extends IControl {
  /**
   * 应用实体报表对象
   *
   * @type {IAppDEReport}
   * 来源  getPSAppDEReport
   */
  appDEReport?: IAppDEReport;
}
