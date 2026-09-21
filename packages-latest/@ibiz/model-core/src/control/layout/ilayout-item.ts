import { ILayoutPos } from './ilayout-pos';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 布局项模型基础对象接口
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
