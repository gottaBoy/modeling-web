import { IInternalMessage, Namespace } from '@ibiz-template/core';
import { QXEvent } from 'qx-util';
import { IInternalMessageProvider } from '../../../provider';

/**
 * 站内信事件
 * @author lxm
 * @date 2024-01-26 10:47:41
 * @interface InternalMessageEvent
 */
export interface IInternalMessageEvent {
  /**
   * 所有数据的变更，新增，删除，更新都算
   * @author lxm
   * @date 2024-01-26 10:56:50
   */
  dataChange: () => void;

  /**
   * 未读数量变更
   * @author lxm
   * @date 2024-01-30 02:46:55
   */
  unreadCountChange: (num: number) => void;
  /**
   * 是否只显示未读变更
   * @author lxm
   * @date 2024-01-30 02:46:55
   */
  unreadOnlyChange: (val: boolean) => void;
}

/**
 * 站内信逻辑控制器
 * @author lxm
 * @date 2024-01-26 09:57:13
 * @export
 * @interface IInternalMessageController
 */
export interface IInternalMessageController {
  /**
   * 事件
   * @author lxm
   * @date 2024-01-26 10:48:53
   * @type {QXEvent<IInternalMessageEvent>}
   */
  readonly evt: QXEvent<IInternalMessageEvent>;

  /**
   * 总条数
   * @author lxm
   * @date 2024-01-26 10:00:25
   * @type {number}
   */
  readonly total: number;

  /**
   * 每次请求加载的条数
   * @author lxm
   * @date 2024-01-26 10:00:45
   * @type {number}
   */
  readonly size: number;

  /**
   * 当前已加载的所有消息集合
   * @author lxm
   * @date 2024-01-26 10:06:05
   * @type {IInternalMessage[]}
   */
  readonly messages: IInternalMessage[];

  /**
   * 未读消息个数
   * @author lxm
   * @date 2024-01-30 02:39:54
   * @type {number}
   */
  readonly unreadCount: number;

  /**
   * 是否只查询未读的消息
   * @author lxm
   * @date 2024-02-04 10:26:00
   * @type {boolean}
   */
  unreadOnly: boolean;

  /**
   * 样式处理命名空间
   * @return {*}
   * @author: zhujiamin
   * @Date: 2024-03-01 11:25:30
   */
  ns: Namespace | null;

  /**
   * 站内信适配器
   * @return {*}
   * @author: zhujiamin
   * @Date: 2024-03-04 11:19:23
   */
  provider: IInternalMessageProvider | null;

  /**
   * 加载（会重置数据）
   * @author lxm
   * @date 2024-01-26 10:19:31
   * @return {*}  {Promise<void>}
   */
  load(): Promise<void>;

  /**
   * 加载更多
   * @author lxm
   * @date 2024-01-26 10:19:43
   * @return {*}  {Promise<void>}
   */
  loadMore(): Promise<void>;

  /**
   * 刷新未读数据条数
   * @author lxm
   * @date 2024-02-04 09:37:58
   * @return {*}  {Promise<void>}
   */
  refreshUnreadCount(): Promise<void>;

  /**
   * 把某条消息记录标记为已读
   * @author lxm
   * @date 2024-01-30 02:31:17
   * @param {IInternalMessage} message
   * @return {*}  {Promise<void>}
   */
  markRead(message: IInternalMessage): Promise<void>;

  /**
   * 把所有未读消息标记为已读
   * @author lxm
   * @date 2024-01-30 02:31:17
   * @return {*}  {Promise<void>}
   */
  batchMarkRead(): Promise<void>;

  /**
   * 获取完整消息
   * @author lxm
   * @date 2024-01-30 05:03:51
   * @param {string} id
   * @return {*}  {Promise<IInternalMessage>}
   */
  get(id: string): Promise<IInternalMessage>;

  /**
   * 切换是否只读
   * @author lxm
   * @date 2024-02-04 10:21:22
   * @param {val} [boolean] 是否只读
   */
  toggleUnReadOnly(val?: boolean): void;
}
