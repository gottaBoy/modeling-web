import { IRawItemBase } from './iraw-item-base';
import { IModelObject } from '../imodel-object';

/**
 *
 * 直接内容项容器模型对象接口
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
