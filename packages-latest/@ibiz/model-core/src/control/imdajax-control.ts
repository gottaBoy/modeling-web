import { IAjaxControl } from './iajax-control';
import { IMDControl } from './imdcontrol';

/**
 *
 * 异步处理多项数据界面部件模型基础对象接口
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
