import { IDEFormDetail } from './ideform-detail';

/**
 *
 * 继承父接口类型值[IFRAME]
 * @export
 * @interface IDEFormIFrame
 */
export interface IDEFormIFrame extends IDEFormDetail {
  /**
   * 嵌入Url路径
   * @type {string}
   * 来源  getIFrameUrl
   */
  iframeUrl?: string;

  /**
   * 链接应用视图
   *
   * @type {string}
   * 来源  getLinkPSAppView
   */
  linkAppViewId?: string;

  /**
   * 界面刷新触发表单项
   * @type {string}
   * 来源  getRefreshItems
   */
  refreshItems?: string;
}
