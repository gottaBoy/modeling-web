import { ISysLayoutPanel } from './isys-layout-panel';

/**
 *
 * 视图布局面板模型对象接口
 * @export
 * @interface IViewLayoutPanel
 */
export interface IViewLayoutPanel extends ISysLayoutPanel {
  /**
   * 仅布局内容区
   * @type {boolean}
   * 来源  isLayoutBodyOnly
   */
  layoutBodyOnly?: boolean;

  /**
   * 使用默认布局
   * @type {boolean}
   * 来源  isUseDefaultLayout
   */
  useDefaultLayout?: boolean;

  /**
   * 启用视图代理模式
   * @type {boolean}
   * @default false
   * 来源  isViewProxyMode
   */
  viewProxyMode?: boolean;
}
