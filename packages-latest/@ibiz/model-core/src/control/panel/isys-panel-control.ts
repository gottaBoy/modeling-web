import { IPanelControl } from './ipanel-control';
import { ISysPanelItem } from './isys-panel-item';

/**
 *
 * 系统面板部件项模型对象接口
 * 继承父接口类型值[CONTROL]
 * @export
 * @interface ISysPanelControl
 */
export interface ISysPanelControl extends IPanelControl, ISysPanelItem {}
