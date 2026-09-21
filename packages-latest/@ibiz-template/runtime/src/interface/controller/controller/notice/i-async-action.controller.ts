import { IPortalAsyncAction } from '@ibiz-template/core';
import { QXEvent } from 'qx-util';

/**
 * 站内信事件
 * @author lxm
 * @date 2024-01-26 10:47:41
 * @interface IAsyncActionEvent
 */
export interface IAsyncActionEvent {
  /**
   * 所有数据的变更，新增，删除，更新都算
   * @author lxm
   * @date 2024-01-26 10:56:50
   */
  dataChange: () => void;
  change: (msg: IPortalAsyncAction) => void;
  add: (msg: IPortalAsyncAction) => void;
}

/**
 * 异步操作逻辑控制器
 * @author lxm
 * @date 2024-01-26 09:57:13
 * @export
 * @interface IAsyncActionController
 */
export interface IAsyncActionController {
  /**
   * 事件
   * @author lxm
   * @date 2024-01-26 10:48:53
   * @type {QXEvent<IAsyncActionEvent>}
   */
  readonly evt: QXEvent<IAsyncActionEvent>;

  /**
   * 总条数
   * @author lxm
   * @date 2024-01-26 10:00:25
   * @type {number}
   */
  readonly total: number;

  /**
   * 当前已加载的所有异步操作集合
   * @author lxm
   * @date 2024-01-26 10:06:05
   * @type {IPortalAsyncAction[]}
   */
  readonly actions: IPortalAsyncAction[];
}
