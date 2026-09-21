import { IViewLayoutPanel } from '../../control/panel/iview-layout-panel';
import { IModelObject } from '../../imodel-object';

/**
 *
 * 应用前端视图子样式引用模型对象接口，定义前端应用对视图子样式的引用，根据使用自动计算
 * @export
 * @interface IAppSubViewTypeRef
 */
export interface IAppSubViewTypeRef extends IModelObject {
  /**
   * 前端模板插件
   *
   * @type {string}
   * 来源  getPSSysPFPlugin
   */
  sysPFPluginId?: string;

  /**
   * 视图布局面板
   *
   * @type {IViewLayoutPanel}
   * 来源  getPSViewLayoutPanel
   */
  viewLayoutPanel?: IViewLayoutPanel;

  /**
   * 插件代码
   * @type {string}
   * 来源  getPluginCode
   */
  pluginCode?: string;

  /**
   * 引用标记
   * @type {string}
   * 来源  getRefTag
   */
  refTag?: string;

  /**
   * 类型代码
   * @type {string}
   * 来源  getTypeCode
   */
  typeCode?: string;

  /**
   * 视图模型
   * @type {IModel}
   * 来源  getViewModel
   */
  viewModel?: IModel;

  /**
   * 标准视图类型
   * @type {string}
   * 来源  getViewType
   */
  viewType?: string;

  /**
   * 仅扩展界面样式
   * @type {boolean}
   * @default false
   * 来源  isExtendStyleOnly
   */
  extendStyleOnly?: boolean;

  /**
   * 全局默认替换
   * @type {boolean}
   * @default false
   * 来源  isReplaceDefault
   */
  replaceDefault?: boolean;
}
