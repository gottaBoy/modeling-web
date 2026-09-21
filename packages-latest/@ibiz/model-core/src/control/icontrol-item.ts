import { IControlAttribute } from './icontrol-attribute';
import { IControlLogic } from './icontrol-logic';
import { IControlRender } from './icontrol-render';
import { IModelObject } from '../imodel-object';

/**
 *
 * @export
 * @interface IControlItem
 */
export interface IControlItem extends IModelObject {
  /**
   * 部件注入属性集合
   *
   * @type {IControlAttribute[]}
   * 来源  getPSControlAttributes
   */
  controlAttributes?: IControlAttribute[];

  /**
   * 部件逻辑集合
   *
   * @type {IControlLogic[]}
   * 来源  getPSControlLogics
   */
  controlLogics?: IControlLogic[];

  /**
   * 部件绘制器集合
   *
   * @type {IControlRender[]}
   * 来源  getPSControlRenders
   */
  controlRenders?: IControlRender[];
}
