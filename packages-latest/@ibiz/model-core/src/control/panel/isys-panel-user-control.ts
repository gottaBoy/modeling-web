import { IPanelUserControl } from './ipanel-user-control';
import { ISysPanelItem } from './isys-panel-item';

/**
 *
 * 系统面板自定义部件模型对象接口
 * 继承父接口类型值[USERCONTROL]
 * @export
 * @interface ISysPanelUserControl
 */
export interface ISysPanelUserControl
  extends ISysPanelItem,
    IPanelUserControl {}
