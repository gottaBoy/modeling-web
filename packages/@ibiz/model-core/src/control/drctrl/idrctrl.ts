import { IAjaxControl } from '../iajax-control';

/**
 *
 * @export
 * @interface IDRCtrl
 */
export interface IDRCtrl extends IAjaxControl {
  /**
   * 应用计数器引用
   *
   * @type {string}
   * 来源  getPSAppCounterRef
   */
  appCounterRefId?: string;
}
