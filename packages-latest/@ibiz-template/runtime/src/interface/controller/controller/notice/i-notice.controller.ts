import { QXEvent } from 'qx-util';
import { IAsyncActionController } from './i-async-action.controller';
import { IInternalMessageController } from './i-internal-message.controller';
import { IAddInChangedController } from './i-add-in-changed.controller';

export interface INoticeEvent {
  /**
   * 需要处理的通知总数变更
   * @author lxm
   * @date 2024-01-26 10:56:50
   */
  totalChange: (total: number) => void;
}

export interface INoticeController {
  /**
   * 事件
   * @author lxm
   * @date 2024-01-26 10:48:53
   * @type {QXEvent<InternalMessageEvent>}
   */
  readonly evt: QXEvent<INoticeEvent>;

  /**
   * 需要处理的通知总数
   * @author lxm
   * @date 2024-01-25 04:33:06
   * @type {number}
   */
  total: number;

  /**
   * 站内信控制器
   * @author lxm
   * @date 2024-01-26 09:58:36
   * @type {IInternalMessageController}
   */
  internalMessage: IInternalMessageController;

  /**
   * 异步操作控制器
   * @author lxm
   * @date 2024-01-26 09:58:55
   * @type {IAsyncActionController}
   */
  asyncAction: IAsyncActionController;

  /**
   * 添加变更控制器
   *
   * @type {IAddInChangedController}
   * @memberof INoticeController
   */
  addInChanged: IAddInChangedController;

  /**
   * 初始化
   * @author lxm
   * @date 2024-01-25 06:47:09
   * @return {*}  {Promise<void>}
   */
  init(): Promise<void>;
}
