import { IDEDataImportItem } from '../../dataentity/dataimport/idedata-import-item';
/**
 *
 * @export
 * @interface IAppDEDataImportItem
 */
export interface IAppDEDataImportItem extends IDEDataImportItem {
    /**
     * 应用实体属性
     *
     * @type {string}
     * 来源  getPSAppDEField
     */
    appDEFieldId?: string;
}
