import { IAppUtilView } from './iapp-util-view';

/**
 *
 * 继承父接口类型值[APPERRORVIEW]
 * @export
 * @interface IAppErrorView
 */
export interface IAppErrorView extends IAppUtilView {
  /**
   * 获取错误代码
   * @type {string}
   * 来源  getErrorCode
   */
  errorCode?: string;
}
