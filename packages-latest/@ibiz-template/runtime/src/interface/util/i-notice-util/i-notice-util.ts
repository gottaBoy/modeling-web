import { IPortalAsyncAction } from '@ibiz-template/core';

/**
 * 系统全局消息通知的呈现工具类
 *
 * @author lxm
 * @date 2024-01-26 05:09:14
 * @export
 * @interface INoticeUtil
 */
export interface INoticeUtil {
  /**
   * 展示异步操作的通知
   * @author lxm
   * @date 2024-01-26 04:40:10
   * @param {IPortalAsyncAction} asyncAction
   */
  showAsyncAction(asyncAction: IPortalAsyncAction): void;

  /**
   * 展示正在执行的相关信息的通知
   * @author lxm
   * @date 2024-01-26 05:11:55
   * @param {{ num: number }} info
   */
  showDoingNotice(info: { num: number }): void;

  /**
   * 展示外挂插件操作的通知
   *
   * @author tony001
   * @date 2025-01-10 11:01:19
   */
  showAddInChangedNotice(msg: IData): void;

  /**
   * 关闭正在执行的相关信息的通知
   * @author lxm
   * @date 2024-01-26 05:13:12
   */
  closeDoingNotice(): void;
}
