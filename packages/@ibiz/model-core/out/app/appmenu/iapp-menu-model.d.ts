import { IAppMenuItem } from '../../control/menu/iapp-menu-item';
import { IModelObject } from '../../imodel-object';
/**
 *
 * @export
 * @interface IAppMenuModel
 */
export interface IAppMenuModel extends IModelObject {
    /**
     * 代码标识
     * @type {string}
     * 来源  getCodeName
     */
    codeName?: string;
    /**
     * 菜单项集合
     *
     * @type {IAppMenuItem[]}
     * 来源  getPSAppMenuItems
     */
    appMenuItems?: IAppMenuItem[];
}
