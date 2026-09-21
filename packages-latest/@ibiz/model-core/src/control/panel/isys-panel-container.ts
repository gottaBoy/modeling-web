import { IPanelContainer } from './ipanel-container';
import { ISysPanelItem } from './isys-panel-item';

/**
 *
 * 系统面板容器项模型对象接口
 * 继承父接口类型值[CONTAINER]
 * @export
 * @interface ISysPanelContainer
 */
export interface ISysPanelContainer extends IPanelContainer, ISysPanelItem {}
