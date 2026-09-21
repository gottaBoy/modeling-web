import { IRawItemBase } from './iraw-item-base';
import { IModelObject } from '../imodel-object';
/**
 *
 * 继承父接口类型值[RAWITEM|RAWITEM|RAWITEM]
 * @export
 * @interface IRawItemContainer
 */
export interface IRawItemContainer extends IModelObject {
    /**
     * 直接内容对象
     *
     * @type {IRawItemBase}
     * 来源  getPSRawItem
     */
    rawItem?: IRawItemBase;
}
