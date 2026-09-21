import { IPanelRawItem } from './ipanel-raw-item';
import { ISysPanelItem } from './isys-panel-item';

/**
 *
 * 系统面板直接内容项模型对象接口
 * 继承父接口类型值[RAWITEM]
 * @export
 * @interface ISysPanelRawItem
 */
export interface ISysPanelRawItem extends IPanelRawItem, ISysPanelItem {}
