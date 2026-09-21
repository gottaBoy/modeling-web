import { IControlItem } from './icontrol-item';
import { IControlObjectNavigatable } from './icontrol-object-navigatable';

/**
 *
 * 界面部件项支持导航模型基础对象接口
 * @export
 * @interface IControlItemNavigatable
 */
export interface IControlItemNavigatable
  extends IControlItem,
    IControlObjectNavigatable {}
