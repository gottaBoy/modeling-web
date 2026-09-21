import { IAppView } from './iapp-view';
import { IAppViewRef } from './iapp-view-ref';

/**
 *
 * @export
 * @interface IAppRedirectView
 */
export interface IAppRedirectView extends IAppView {
  /**
   * 重定向视图引用集合
   *
   * @type {IAppViewRef[]}
   * 来源  getRedirectPSAppViewRefs
   */
  redirectAppViewRefs?: IAppViewRef[];
}
