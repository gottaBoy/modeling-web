import { IUILogicParams } from '../../..';

/**
 * 事件参数
 * @author lxm
 * @date 2023-03-21 05:59:44
 * @export
 * @interface EventBase
 */
export interface EventBase extends IUILogicParams {
  /**
   * 事件名称
   * @author lxm
   * @date 2023-03-23 03:12:27
   * @type {string}
   */
  eventName: string;

  /**
   * 事件额外参数1
   * @author lxm
   * @date 2023-03-23 03:16:36
   * @type {string}
   */
  eventArg?: string;

  /**
   * 事件额外参数2
   * @author lxm
   * @date 2023-03-23 03:16:36
   * @type {string}
   */
  eventArg2?: string;

  /**
   * 触发事件的组件名称
   * @author lxm
   * @date 2023-03-23 03:15:24
   * @type {string}
   */
  targetName: string;

  /**
   * 每个单独事件回调运行后需要事件触发位置处理的返回参数。
   * 如果存在一定是个数组，存储复数的结果
   * @author lxm
   * @date 2023-03-26 11:25:48
   * @type {IData[]}
   */
  result?: IData[];

  /**
   * 数据参数
   *
   * @type {{ total: number; totalx?: number }}
   * @memberof EventBase
   */
  dataArg?: {
    /**
     * 总条数
     *
     * @type {number}
     */
    total: number;
    /**
     * 全部计数条数
     *
     * @type {number}
     */
    totalx?: number;
  };
}
