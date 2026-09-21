import { IAppDEReport } from './iapp-dereport';
import { IModelObject } from '../../imodel-object';
/**
 *
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
