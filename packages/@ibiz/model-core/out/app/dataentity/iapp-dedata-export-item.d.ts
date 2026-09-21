import { IDEDataExportItem } from '../../dataentity/dataexport/idedata-export-item';
/**
 *
 * @export
 * @interface IAppDEDataExportItem
 */
export interface IAppDEDataExportItem extends IDEDataExportItem {
    /**
     * 应用实体属性
     *
     * @type {string}
     * 来源  getPSAppDEField
     */
    appDEFieldId?: string;
}
