import { IAppDEView } from './iapp-deview';

/**
 *
 * @export
 * @interface IAppDEWFView
 */
export interface IAppDEWFView extends IAppDEView {
  /**
   * 应用工作流
   *
   * @type {string}
   * 来源  getPSAppWF
   */
  appWFId?: string;

  /**
   * 应用工作流版本
   *
   * @type {string}
   * 来源  getPSAppWFVer
   */
  appWFVerId?: string;

  /**
   * 流程交互模式
   * @type {boolean}
   * 来源  isWFIAMode
   */
  wfiamode?: boolean;
}
