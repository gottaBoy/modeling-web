import { IModelObject } from '../../imodel-object';
/**
 *
 * @export
 * @interface ISysCounterItem
 */
export interface ISysCounterItem extends IModelObject {
    /**
     * 逻辑名称
     * @type {string}
     * 来源  getLogicName
     */
    logicName?: string;
}
