import { IAjaxControl } from '../iajax-control';

/**
 *
 * 数据关系部件模型基础对象接口
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
