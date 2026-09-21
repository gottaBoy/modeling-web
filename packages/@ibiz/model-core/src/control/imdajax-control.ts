import { IAjaxControl } from './iajax-control';
import { IMDControl } from './imdcontrol';

/**
 *
 * @export
 * @interface IMDAjaxControl
 */
export interface IMDAjaxControl extends IAjaxControl, IMDControl {
  /**
   * 输出预置流程数据项
   * @type {boolean}
   */
  hasWFDataItems?: boolean;
}
