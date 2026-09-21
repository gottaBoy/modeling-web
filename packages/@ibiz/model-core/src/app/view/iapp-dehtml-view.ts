import { IAppDEView } from './iapp-deview';

/**
 *
 * 继承父接口类型值[DEHTMLVIEW]
 * @export
 * @interface IAppDEHtmlView
 */
export interface IAppDEHtmlView extends IAppDEView {
  /**
   * Html路径
   * @type {string}
   * 来源  getHtmlUrl
   */
  htmlUrl?: string;

  /**
   * 默认加载数据
   * @type {boolean}
   * 来源  isLoadDefault
   */
  loadDefault?: boolean;
}
