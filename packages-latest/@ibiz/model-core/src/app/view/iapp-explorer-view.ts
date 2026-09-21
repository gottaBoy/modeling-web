import { IAppView } from './iapp-view';

/**
 *
 * 应用导航视图视图模型基础对象接口
 * @export
 * @interface IAppExplorerView
 */
export interface IAppExplorerView extends IAppView {
  /**
   * IFrame模式
   * @type {boolean}
   * 来源  isIFrameMode
   */
  iframeMode?: boolean;
}
