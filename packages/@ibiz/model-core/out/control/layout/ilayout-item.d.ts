import { ILayoutPos } from './ilayout-pos';
import { IModelObject } from '../../imodel-object';
/**
 *
 * @export
 * @interface ILayoutItem
 */
export interface ILayoutItem extends IModelObject {
    /**
     * 布局位置
     *
     * @type {ILayoutPos}
     * 来源  getPSLayoutPos
     */
    layoutPos?: ILayoutPos;
}
