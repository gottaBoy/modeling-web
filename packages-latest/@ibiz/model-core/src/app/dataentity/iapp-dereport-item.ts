import { IAppDEReport } from './iapp-dereport';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 应用实体报表项模型对象接口
 * @export
 * @interface IAppDEReportItem
 */
export interface IAppDEReportItem extends IModelObject {
  /**
   * 关系报表对象
   *
   * @type {IAppDEReport}
   * 来源  getMinorPSAppDEReport
   */
  minorAppDEReport?: IAppDEReport;
}
