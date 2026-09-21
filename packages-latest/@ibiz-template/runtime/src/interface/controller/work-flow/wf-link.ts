/**
 * 工作流link数据
 *
 * @author lxm
 * @date 2022-10-08 15:10:28
 * @export
 * @interface WFLink
 */
export interface WFLink {
  /**
   * 流程名称
   *
   * @author lxm
   * @date 2022-10-08 17:10:47
   * @type {string}
   */
  sequenceFlowName: string;
  /**
   * pc端流程操作视图
   * @author lxm
   * @date 2023-06-20 03:30:20
   * @type {string}
   */
  sequenceflowview: string;

  /**
   * pc端流程操作表单
   * @author lxm
   * @date 2023-06-20 03:30:21
   * @type {string}
   */
  sequenceflowform: string;

  /**
   * 移动端流程操作视图
   * @author lxm
   * @date 2023-06-20 03:31:45
   * @type {string}
   */
  sequenceflowmobview: string;

  /**
   * 移动端流程操作表单
   * @author lxm
   * @date 2023-06-20 03:31:43
   * @type {string}
   */
  sequenceflowmobform: string;

  /**
   * 流程ID
   *
   * @author lxm
   * @date 2022-10-08 17:10:16
   * @type {string}
   */
  sequenceFlowId: string;

  /**
   * 流程操作类型
   *
   * @author lxm
   * @date 2022-10-08 17:10:49
   * @type {string}
   */
  type?: 'reassign' | 'addstepbefore' | 'sendback' | 'sendcopy' | string;

  /**
   * link按钮标识
   *
   * @author zk
   * @date 2023-08-17 12:08:32
   * @type {string}
   * @memberof WFLink
   */
  id: string;
}
