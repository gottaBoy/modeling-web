import { ILayoutPanel } from './panel/ilayout-panel';
import { IModelObject } from '../imodel-object';

/**
 *
 * 界面部件绘制器模型对象接口
 * @export
 * @interface IControlRender
 */
export interface IControlRender extends IModelObject {
  /**
   * 布局面板模型
   * @type {string}
   * 来源  getLayoutPanelModel
   */
  layoutPanelModel?: string;

  /**
   * 布局面板
   *
   * @type {ILayoutPanel}
   * 来源  getPSLayoutPanel
   */
  layoutPanel?: ILayoutPanel;

  /**
   * 前端插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 绘制器名称
   * @type {string}
   * 来源  getRenderName
   */
  renderName?: string;

  /**
   * 绘制器类型
   * @description 值模式 [部件绘制器类型] {LAYOUTPANEL：布局面板、 LAYOUTPANEL_MODEL：布局面板（模型）、 PFPLUGIN：前端插件 }
   * @type {( string | 'LAYOUTPANEL' | 'LAYOUTPANEL_MODEL' | 'PFPLUGIN')}
   * 来源  getRenderType
   */
  renderType?: string | 'LAYOUTPANEL' | 'LAYOUTPANEL_MODEL' | 'PFPLUGIN';
}
