import { IPanelUserControl } from './ipanel-user-control';
import { ISysPanelItem } from './isys-panel-item';

/**
 *
 * 继承父接口类型值[USERCONTROL]
 * @export
 * @interface ISysPanelUserControl
 */
export interface ISysPanelUserControl
  extends ISysPanelItem,
    IPanelUserControl {}
