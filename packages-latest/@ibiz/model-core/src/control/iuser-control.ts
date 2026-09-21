import { IControl } from './icontrol';
import { IControlContainer } from './icontrol-container';

/**
 *
 * 用户自定义界面部件模型基础对象接口
 * @export
 * @interface IUserControl
 */
export interface IUserControl extends IControlContainer, IControl {}
