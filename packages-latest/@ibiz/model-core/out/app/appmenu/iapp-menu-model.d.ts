import { IAppDEDataSet } from '../dataentity/iapp-dedata-set';
import { IAppDEField } from '../dataentity/iapp-defield';
import { IAppDataEntity } from '../dataentity/iapp-data-entity';
import { IAppMenuItem } from '../../control/menu/iapp-menu-item';
import { IModelObject } from '../../imodel-object';
/**
 *
 * 应用菜单模型对象接口
 * @export
 * @interface IAppMenuModel
 */
export interface IAppMenuModel extends IModelObject {
    /**
     *
     * @type {IAppDEField}
     * 来源  getAppFuncTagPSAppDEField
     */
    appFuncTagAppDEField?: IAppDEField;
    /**
     *
     * @type {IAppDEField}
     * 来源  getClsPSAppDEField
     */
    clsAppDEField?: IAppDEField;
    /**
     * 代码标识
     * @type {string}
     * 来源  getCodeName
     */
    codeName?: string;
    /**
     * @type {number}
     * 来源  getDynamicMode
     */
    dynamicMode?: number;
    /**
     *
     * @type {IAppDEField}
     * 来源  getEnableScriptPSAppDEField
     */
    enableScriptAppDEField?: IAppDEField;
    /**
     *
     * @type {IAppDEField}
     * 来源  getIconClsPSAppDEField
     */
    iconClsAppDEField?: IAppDEField;
    /**
     *
     * @type {IAppDEDataSet}
     * 来源  getItemPSAppDEDataSet
     */
    itemAppDEDataSet?: IAppDEDataSet;
    /**
     *
     * @type {IAppDataEntity}
     * 来源  getItemPSAppDataEntity
     */
    itemAppDataEntity?: IAppDataEntity;
    /**
     * 菜单项集合
     *
     * @type {IAppMenuItem[]}
     * 来源  getPSAppMenuItems
     */
    appMenuItems?: IAppMenuItem[];
    /**
     *
     * @type {IAppDEField}
     * 来源  getTextPSAppDEField
     */
    textAppDEField?: IAppDEField;
    /**
     *
     * @type {IAppDEField}
     * 来源  getTipsPSAppDEField
     */
    tipsAppDEField?: IAppDEField;
    /**
     *
     * @type {IAppDEField}
     * 来源  getVisibleScriptPSAppDEField
     */
    visibleScriptAppDEField?: IAppDEField;
}
