import { IPanelField } from './ipanel-field';
import { ISysPanelItem } from './isys-panel-item';

/**
 *
 * 系统面板属性项模型对象接口
 * 继承父接口类型值[FIELD]
 * @export
 * @interface ISysPanelField
 */
export interface ISysPanelField extends IPanelField, ISysPanelItem {}
