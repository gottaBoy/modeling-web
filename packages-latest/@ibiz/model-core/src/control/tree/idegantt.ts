import { IDETreeGridEx } from './idetree-grid-ex';

/**
 *
 * 实体甘特图部件模型对象接口
 * 继承父接口类型值[GANTT]
 * @export
 * @interface IDEGantt
 */
export interface IDEGantt extends IDETreeGridEx {
  /**
   * 开始时间数据项
   * @type {string}
   * 来源  getBeginDataItemName
   */
  beginDataItemName?: string;

  /**
   * 结束时间数据项
   * @type {string}
   * 来源  getEndDataItemName
   */
  endDataItemName?: string;

  /**
   * 完成量数据项
   * @type {string}
   * 来源  getFinishDataItemName
   */
  finishDataItemName?: string;

  /**
   * 前置数据项
   * @type {string}
   * 来源  getPrevDataItemName
   */
  prevDataItemName?: string;

  /**
   * 编号数据项
   * @type {string}
   * 来源  getSNDataItemName
   */
  sndataItemName?: string;

  /**
   * 总量数据项
   * @type {string}
   * 来源  getTotalDataItemName
   */
  totalDataItemName?: string;
}
