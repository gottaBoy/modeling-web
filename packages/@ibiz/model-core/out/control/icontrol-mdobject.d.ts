import { IModelObject } from '../imodel-object';
/**
 *
 * @export
 * @interface IControlMDObject
 */
export interface IControlMDObject extends IModelObject {
    /**
     * 应用实体对象
     *
     * @type {string}
     * 来源  getPSAppDataEntity
     */
    appDataEntityId?: string;
}
