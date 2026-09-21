import { QXEvent } from 'qx-util';
import { IViewController } from '../../controller';

export interface IViewStackEvent {
  add: (view: IViewController) => void;
  remove: (view: IViewController) => void;
  active: (view: IViewController) => void;
  deactivate: (view: IViewController) => void;
  change: (msg: {
    type: 'add' | 'remove' | 'active' | 'deactivate';
    view: IViewController;
  }) => void;
}

/**
 * 视图堆栈
 *
 * @author chitanda
 * @date 2024-01-18 10:01:16
 * @export
 * @interface IViewStack
 */
export interface IViewStack {
  /**
   * 事件
   *
   * @author chitanda
   * @date 2023-09-05 16:09:58
   * @protected
   * @type {QXEvent<MessageCenterEvent>}
   */
  evt: QXEvent<IViewStackEvent>;

  /**
   * 添加视图堆栈信息
   *
   * @author chitanda
   * @date 2024-01-18 10:01:29
   * @param {string} id
   * @param {IViewController} view
   */
  add(id: string, view: IViewController): void;
  /**
   * 删除视图堆栈信息
   *
   * @author chitanda
   * @date 2024-01-18 10:01:41
   * @param {string} id
   */
  remove(id: string): void;
  /**
   * 视图激活
   *
   * @author chitanda
   * @date 2024-01-18 10:01:11
   * @param {string} id
   */
  active(id: string): void;
  /**
   * 视图休眠
   *
   * @author chitanda
   * @date 2024-01-18 10:01:18
   * @param {string} id
   */
  deactivate(id: string): void;
  /**
   * 当前激活视图清单
   *
   * @author chitanda
   * @date 2024-01-18 14:01:50
   * @return {*}  {IViewController[]}
   */
  getActives(): IViewController[];

  /**
   * 获取视图堆栈里的视图控制器
   * @author lxm
   * @date 2024-04-01 01:16:24
   * @param {string} id
   * @return {*}  {(IViewController | undefined)}
   */
  getView(id: string): IViewController | undefined;
}
