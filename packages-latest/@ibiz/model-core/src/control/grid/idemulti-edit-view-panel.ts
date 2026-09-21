import { IDEGrid } from './idegrid';

/**
 *
 * 实体多编辑视图面板部件模型对象接口
 * 继承父接口类型值[MULTIEDITVIEWPANEL]
 * @export
 * @interface IDEMultiEditViewPanel
 */
export interface IDEMultiEditViewPanel extends IDEGrid {
  /**
   * 嵌入应用视图
   *
   * @type {string}
   * 来源  getEmbeddedPSAppView
   */
  embeddedAppViewId?: string;

  /**
   * 面板样式
   * @type {string}
   * 来源  getPanelStyle
   */
  panelStyle?: string;
}
